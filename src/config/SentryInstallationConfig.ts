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

import * as fs from 'node:fs';
import {Request} from 'express';
import {Logging} from '../utils/logging';

export type SentryInstallation = {
    readonly sentryInstallationId: string;
    readonly youtrackProjectId: string;
    readonly youtrackCustomFieldId: string;
}

export default class SentryInstallationConfig {
    private static _instance: SentryInstallationConfig;
    public static get Instance(): SentryInstallationConfig {
        if (!this._instance) {
            this._instance = new SentryInstallationConfig();
        }
        return this._instance;
    }

    private readonly _config: SentryInstallation[];

    private constructor() {
        this._config = [];
        this.loadConfig();
    }

    private loadConfig():void {
        Logging.Instance.logDebug('Loading Config...', 'SENTRY');

        if (fs.existsSync('config/sentry.json')) {
            this.loadFromFile('config/sentry.json');
        } else if (process.env.SENTRY_INSTALLATION_CONFIG) {
            this.loadFromEnv(process.env.SENTRY_INSTALLATION_CONFIG);
        } else {
            throw new Error(
                'No Sentry installation config found. Please create a config/sentry.json file ' +
                'or set the SENTRY_INSTALLATION_CONFIG environment variable.'
            );
        }

        Logging.Instance.logDebug('Config loaded', 'SENTRY');
    }

    private loadFromFile(filePath: string):void {
        Logging.Instance.logDebug('Loading Config from ' + filePath, 'SENTRY');
        const configFile = fs.readFileSync(filePath, 'utf8');
        const config = JSON.parse(configFile);
        if (!config || !Array.isArray(config)) {
            throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                'Expected an array of objects with installationId, projectId and customFieldId properties.');
        }
        for (const entry of config) {
            if (!entry.sentryInstallationId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing installation id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            } else if (!entry.youtrackProjectId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing project id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            } else if (!entry.youtrackCustomFieldId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing custom field id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            }
            this._config.push(entry);
        }
    }

    private loadFromEnv(configData: string):void {
        Logging.Instance.logDebug(
            'Loading Config from env variable',
            'SENTRY'
        );
        const entries = configData.split(';');
        for (const entry of entries) {
            const [installationId, projectId, customFieldId] = entry.split(':');
            if (!installationId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing installation id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            } else if (!projectId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing project id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            } else if (!customFieldId) {
                throw new Error('Invalid SENTRY_INSTALLATION_CONFIG format. ' +
                    'Missing custom field id. ' +
                    'Expected installationId:projectId:customFieldId;installationId:projectId:customFieldId;...');
            }
            this._config.push({
                sentryInstallationId: installationId,
                youtrackProjectId: projectId,
                youtrackCustomFieldId: customFieldId
            });
        }
    }

    public getFromInstallationId(installationId: string): SentryInstallation | null {
        const installation = this._config.find((entry) => entry.sentryInstallationId === installationId);
        if (!installation) {
            return null;
        }

        return installation;
    }

    public getFromRequest(request: Request): SentryInstallation | null {
        const installationId:string|null = request.query?.installationId ?? request.body?.installationId ?? null;
        if (installationId === null || installationId === undefined || installationId === '') {
            return null;
        }

        return SentryInstallationConfig.Instance.getFromInstallationId(installationId);
    }
}