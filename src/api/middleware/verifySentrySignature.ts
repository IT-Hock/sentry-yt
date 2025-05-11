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
import checkSignature, {getSignatureFromHeader} from "../../utils/Sentry";

function getSignatureBody(req: Request): string {
    // Special case if the body is empty
    if (req.body === undefined || req.body === null) {
        return '';
    }

    const jsonStringBody = JSON.stringify(req.body);
    if (jsonStringBody === null || jsonStringBody === undefined) {
        return '';
    }
    return jsonStringBody === '{}' ? '' : jsonStringBody;
}

/**
 * This function will authenticate that the requests are coming from Sentry.
 * It allows us to be confident that all the code run after this middleware are
 * using verified data sent directly from Sentry.
 */
export default function verifySentrySignatureMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
):void {
    // Skip signature verification in test environment, except if SKIP_SIG_VERIFY is explicitly set to false
    if (process.env.NODE_ENV == 'test' && process.env.SKIP_SIG_VERIFY !== 'false') {
        Logging.Instance.logDebug('Skipping signature verification in test environment', 'SNY-YT');
        next();
        return;
    }
    if (process.env.SENTRY_CLIENT_SECRET == null) {
        Logging.Instance.logError('SENTRY_CLIENT_SECRET is not set. Skipping signature verification.');
        next();
        return;
    }

    const signatureBody = getSignatureBody(request);
    const signatureHeader:string = getSignatureFromHeader(request.headers);
    if(!checkSignature(process.env.SENTRY_CLIENT_SECRET, signatureBody, signatureHeader)) {
        Logging.Instance.logError('Signature verification failed. Skipping signature verification.');
        response.sendStatus(401);
        return;
    }

    next();
}