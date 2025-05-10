import {Logging} from '../utils/logging';

export default class ServerConfig {
    private readonly _host: string;
    private readonly _port: number;
    private readonly _useCors: boolean;

    private static _instance: ServerConfig;
    public static get Instance(): ServerConfig {
        if (!this._instance) {
            this._instance = new ServerConfig();
        }
        return this._instance;
    }

    private constructor(host: string | null = null, port: number | null = null, useCors: boolean = false) {
        Logging.Instance.logDebug('Loading Config...', 'SNY-YT');

        this._useCors = useCors;
        this._host = (host ?? process.env.HOST) ?? 'localhost';
        this._port = port ?? parseInt(process.env.PORT ?? '3000', 10);

        Logging.Instance.logDebug('Config loaded', 'SNY-YT');
    }

    public get host(): string {
        return this._host;
    }

    public get port(): number {
        return this._port;
    }

    public get useCors(): boolean {
        return this._useCors;
    }
}
