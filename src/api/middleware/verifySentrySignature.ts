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

import {createHmac} from 'crypto';
import {NextFunction, Request, Response} from 'express';
import {Logging} from '../../utils/logging';

function getSignatureBody(req: Request): string {
    const stringifiedBody = JSON.stringify(req.body);
    if(req.body === undefined || req.body === null || stringifiedBody === undefined || stringifiedBody === null) {
        return '';
    }
    // HACK: This is necessary since express.json() converts the empty request body to {}
    return stringifiedBody === '{}' ? '' : stringifiedBody;
}

export default function verifySentrySignature(
    request: Request,
    response: Response,
    next: NextFunction
) {
    /**
     * This function will authenticate that the requests are coming from Sentry.
     * It allows us to be confident that all the code run after this middleware are
     * using verified data sent directly from Sentry.
     */
    if (process.env.NODE_ENV == 'test' && process.env.SKIP_SIG_VERIFY !== 'false') {
        Logging.Instance.logDebug('Skipping signature verification in test environment', 'SNY-YT');
        return next();
    }
    if(process.env.SENTRY_CLIENT_SECRET == null) {
        Logging.Instance.logError('SENTRY_CLIENT_SECRET is not set. Skipping signature verification.');
        return next();
    }
    const hmac = createHmac('sha256', process.env.SENTRY_CLIENT_SECRET);
    const signatureBody = getSignatureBody(request);
    hmac.update(signatureBody, 'utf8');
    const digest = hmac.digest('hex');
    if (
        // HACK: The signature header may be one of these two values
        digest === request.headers['sentry-hook-signature'] ||
        digest === request.headers['sentry-app-signature']
    ) {
        return next();
    }
    console.info('Unauthorized: Could not verify request came from Sentry');
    response.sendStatus(401);
}