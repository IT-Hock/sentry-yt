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

// Middlewares
import helmet from 'helmet';
import {getHelmetConfig} from "./utils/SentryYouTrack";
import {logRequestsMiddleware, verifyInstallationMiddleware, verifySentrySignatureMiddleware, notFoundMiddleware} from "./api/middleware";
// Routes
import apiRoutes from './api';

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

        if (process.env.SECURITY_IGNORE_SSL === 'true') {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }

        Logging.Instance.logInfo('Initializing server...', 'SNY-YT');
        if (process.env.NODE_ENV !== 'production') {
            Logging.Instance.logWarn('Running in development mode', 'SNY-YT');
        }
        const serverConfig = ServerConfig.Instance;
        if (serverConfig === undefined) {
            Logging.Instance.logError('ServerConfig is undefined', 'SNY-YT');
            throw new Error('ServerConfig is undefined');
        }
        if (YouTrackConfig.Instance === undefined) {
            Logging.Instance.logError('YouTrackConfig is undefined', 'SNY-YT');
            throw new Error('YouTrackConfig is undefined');
        }

        this._app = express();
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended: true}));
        this._app.use(express.text({type: '*/*'}));
        // Middleware
        if (process.env.NODE_ENV !== 'production') {
            this._app.use(logRequestsMiddleware);
        } else {
            this._app.use(helmet(getHelmetConfig()));
        }
        // Routes
        this._app.use('/', apiRoutes);
        // Needs to be the last middleware, otherwise all routes will be handled by this middleware
        this._app.use(notFoundMiddleware);

        this.setupYoutrackClient();
    }

    public start(): void {
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

    private onServerError(error: Error): void {
        Logging.Instance.logError(`Server error: ${error.message}`, 'SNY-YT');
    }

    private setupYoutrackClient(): void {
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