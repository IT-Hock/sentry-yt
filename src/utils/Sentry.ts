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
import {Logging} from './logging';
import {IncomingHttpHeaders} from 'node:http';

export function getSignatureFromHeader(headers: IncomingHttpHeaders): string {
    const signatureHeader = headers['sentry-hook-signature'] || headers['sentry-app-signature'];
    if (typeof signatureHeader !== 'string') {
        Logging.Instance.logError('Signature header not found');
        return '';
    }
    return signatureHeader;
}

export default function checkSignature(secret: string, data: string, signature: string):boolean {
    const hmac = createHmac('sha256', secret);
    hmac.update(data, 'utf8');
    const digest = hmac.digest('hex');
    if (digest === signature) {
        Logging.Instance.logDebug('Signature verified successfully', 'SNY-YT');
        return true;
    }

    Logging.Instance.logError('Unauthorized: Could not verify request came from Sentry');
    return false;
}