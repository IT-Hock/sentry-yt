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

//import {injectable} from 'inversify'; // For dependency injection
import winston, {format, Logger} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export type LogContext = object;

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

//@injectable() // Coming from inversify
export class Logging {
    private static _instance: Logging;

    public static get Instance(): Logging {
        if (!this._instance) {
            this._instance = new Logging();
        }
        return this._instance;
    }

    private readonly _logger: winston.Logger;

    private constructor() {
        this._logger = this._initializeWinston();
    }

    public logInfo(msg: string, prefix?: string, context?: LogContext): void {
        this._log(msg, LogLevel.INFO, prefix, context);
    }

    public logWarn(msg: string, prefix?: string, context?: LogContext): void {
        this._log(msg, LogLevel.WARN, prefix, context);
    }

    public logError(msg: string, prefix?: string, context?: LogContext): void {
        this._log(msg, LogLevel.ERROR, prefix, context);
    }

    public logDebug(msg: string, prefix?: string, context?: LogContext): void {
        if (process.env.NODE_ENV === 'production') {
            return;
        }

        this._log(msg, LogLevel.DEBUG, prefix, context);
    }

    private _log(msg: string, level: LogLevel, prefix?: string, context?: LogContext): void {
        this._logger.log(level, msg, {context: context, prefix: prefix});
    }

    private _initializeWinston(): Logger {
        let logLevel = LogLevel.INFO;
        if (process.env.NODE_ENV !== 'production') {
            logLevel = LogLevel.DEBUG;
        } else if (process.env.LOG_LEVEL) {
            logLevel = process.env.LOG_LEVEL as LogLevel;
        }

        return winston.createLogger({
            transports: Logging._getTransports(),
            format: format.combine(
                format.timestamp(),
                format.json(),
                format.errors({stack: true}),
                format.metadata({fillExcept: ['message', 'level', 'timestamp', 'label', 'splatted']})
            ),
            level: logLevel,
        });
    }

    private static _getTransports(): Array<winston.transport> {
        const transports: Array<winston.transport> = [
            new winston.transports.Console({
                format: this._getFormatForConsole(),
            }),
        ];

        if (process.env.NODE_ENV !== 'production') {
            return transports;
        }

        transports.push(this._getFileTransport());
        return transports;
    }

    private static _getFormatForConsole(): winston.Logform.Format {
        return format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD',
                alias: 'date'
            }),
            format.timestamp({
                format: 'HH:mm:ss',
                alias: 'time'
            }),
            format.prettyPrint(),
            format.printf((info: winston.Logform.TransformableInfo) => {
                    const {
                        date,
                        time,
                        level,
                        message,
                        metadata,
                        context,
                    } = info as winston.Logform.TransformableInfo & {
                        date: string,
                        time: string,
                        level: string,
                        message: string,
                        metadata: { prefix?: string },
                        context?: LogContext
                    };

                    // noinspection SuspiciousTypeOfGuard
                    const paddedPrefix = metadata.prefix && (typeof metadata.prefix === 'string') && metadata.prefix.length > 0
                        ? metadata.prefix.padEnd(8) : ' '.repeat(8);
                    const paddedLevel = level.padEnd(5);
                    if (!context) {
                        return `[${date}] [${time}] [${paddedPrefix}] [${paddedLevel.toUpperCase()}]: ${message}`;
                    }

                    return `[${date}] [${time}] [${paddedPrefix}] [${paddedLevel.toUpperCase()}]: ${
                        message
                    } [CONTEXT] -> ${'\n' + JSON.stringify(context, null, 2)}`;
                }
            ),
            format.colorize({all: true})
        );
    }

    private static _getFileTransport(): DailyRotateFile {
        return new DailyRotateFile({
            filename: 'sentry-yt-%DATE%.log',
            zippedArchive: true,
            maxSize: '10m',
            maxFiles: '14d',
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
        });
    }
}