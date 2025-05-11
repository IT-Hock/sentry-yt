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
import {Logging} from '../../utils/logging';

export default function logRequestsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction): void {
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