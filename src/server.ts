/**
 * sentry-yt - Sentry integration for YouTube
 * Copyright (C) 2025 IT-Hock <support@it-hock.de>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import express from 'express';
import {Youtrack} from 'youtrack-rest-client';
import {Logging} from './utils/logging';
import YouTrackConfig from './config/YouTrackConfig';
import ServerConfig from './config/ServerConfig';
import dotenv from 'dotenv';
import verifySentrySignature from './api/middleware/verifySentrySignature';

import apiRoutes from './api';
import cors from 'cors';
import {verifyInstallation} from './api/middleware';
import helmet from 'helmet';

export default class Server {
    private static _youtrack: Youtrack;
    public static get Youtrack(): Youtrack {
        return this._youtrack;
    }

    private static _instance: Server;
    public static get Instance(): Server {
        if (!this._instance) {
            this._instance = new Server();
        }
        return this._instance;
    }

    private readonly _app: express.Application;

    private constructor() {
        dotenv.config();

        Logging.Instance.logInfo('Initializing server...', 'SNY-YT');
        if (process.env.NODE_ENV !== 'production') {
            Logging.Instance.logWarn('Running in development mode', 'SNY-YT');
        }
        const serverConfig = ServerConfig.Instance;
        if(serverConfig === undefined) {
            Logging.Instance.logError('ServerConfig is undefined', 'SNY-YT');
            throw new Error('ServerConfig is undefined');
        }
        if (YouTrackConfig.Instance === undefined) {
            Logging.Instance.logError('YouTrackConfig is undefined', 'SNY-YT');
            throw new Error('YouTrackConfig is undefined');
        }

        this._app = express();
        if (serverConfig.useCors) {
            this._app.use(cors());
        }
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.use(express.text({ type: '*/*' }));
        if (process.env.NODE_ENV !== 'production') {
            this._app.use(this.LogRequest.bind(this));
        }else{
            this._app.use(helmet());
            this._app.use(verifySentrySignature);
        }

        this._app.use('/', apiRoutes);
        this._app.use(function (req, res/*, next*/):void {
            Logging.Instance.logDebug('URL not found: ' + req.url, 'SNY-YT');
            res.status(404).json({'error': 'Not found'});
        });
        if (process.env.IGNORE_SSL === 'true') {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }

        this.setupYoutrackClient();
    }

    public start():void {
        Logging.Instance.logInfo('Starting server...', 'SNY-YT');
        this._app.listen(ServerConfig.Instance.port, ServerConfig.Instance.host, (error) => {
            if (error) {
                this.onServerError(error);
                return;
            }
            Logging.Instance.logInfo(`Server started on ${ServerConfig.Instance.host}:${ServerConfig.Instance.port}`, 'SNY-YT');
        });
        Logging.Instance.logInfo('Server started', 'SNY-YT');
    }

    private onServerError(error: Error):void {
        Logging.Instance.logError(`Server error: ${error.message}`, 'SNY-YT');
    }

    private LogRequest(req: express.Request, res: express.Response, next: express.NextFunction):void {
        // Output [GET] /api/v1/...
        Logging.Instance.logInfo(`[${req.ip}] [${req.method}] ${req.url}\n` + ('-'.repeat(50)), 'SNY-YT');

        if (req.headers !== undefined) {
            Logging.Instance.logInfo(`Headers: ${JSON.stringify(req.headers)}\n` + ('-'.repeat(50)), 'SNY-YT');
        }
        if (req.query !== undefined && Object.keys(req.query).length > 0) {
            Logging.Instance.logInfo(`Query: ${JSON.stringify(req.query)}\n` + ('-'.repeat(50)), 'SNY-YT');
        }
        if (req.params !== undefined && Object.keys(req.params).length > 0) {
            Logging.Instance.logInfo(`Params: ${JSON.stringify(req.params)}\n` + ('-'.repeat(50)), 'SNY-YT');
        }
        if (req.body !== undefined && Object.keys(req.body).length > 0) {
            Logging.Instance.logInfo(`Body: ${JSON.stringify(req.body)}\n` + ('-'.repeat(50)), 'SNY-YT');
        }
        next();
    }

    private setupYoutrackClient():void {
        if (Server._youtrack) {
            return;
        }

        Server._youtrack = new Youtrack({
            baseUrl: YouTrackConfig.Instance.baseUrl,
            token: YouTrackConfig.Instance.token,
        });
    }

    public get app(): express.Application {
        return this._app;
    }
}