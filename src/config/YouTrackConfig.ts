import {Logging} from '../utils/logging';

export default class YouTrackConfig {
    private readonly _youtrackBaseUrl: string;
    private readonly _youtrackToken: string;

    private static _instance: YouTrackConfig;
    public static get Instance(): YouTrackConfig {
        if (!this._instance) {
            this._instance = new YouTrackConfig();
        }
        return this._instance;
    }

    private constructor(
        token: string | null = null,
        baseUrl: string | null = null
    ) {
        Logging.Instance.logDebug('Loading config...', 'YOUTRACK');
        this._youtrackBaseUrl = (baseUrl ?? process.env.YOUTRACK_BASE_URL) ?? '';
        if (this._youtrackBaseUrl === '') {
            Logging.Instance.logError('Base URL is not set', 'YOUTRACK');
            throw new Error('Base URL is not set');
        }

        this._youtrackToken = (token ?? process.env.YOUTRACK_TOKEN) ?? '';
        if (this._youtrackToken === '') {
            Logging.Instance.logError('Token is not set', 'YOUTRACK');
            throw new Error('Token is not set');
        }
        Logging.Instance.logDebug('Config loaded', 'YOUTRACK');
    }

    public get baseUrl(): string {
        return this._youtrackBaseUrl;
    }

    public get token(): string {
        return this._youtrackToken;
    }
}
