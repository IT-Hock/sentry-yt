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

import {NextFunction, Request, Response} from 'express';
import {Logging} from '../../utils/logging';
import SentryInstallationConfig from '../../config/SentryInstallationConfig';
import {getInstallation} from "../../utils/SentryYouTrack";

export default function verifyInstallationMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
): void {
    // Skip verification in test environment except when SKIP_SIG_VERIFY is explicitly set to false
    if (process.env.NODE_ENV == 'test' && process.env.SKIP_SIG_VERIFY !== 'false') {
        Logging.Instance.logDebug('Skipping installation verification in test environment', 'SNY-YT');
        return next();
    }

    // The installation id is passed in the query string or the body
    const installationId: string | null = request?.query?.installationId ?? request?.body?.installationId ?? null;
    if (installationId === null || installationId === undefined || installationId === '') {
        Logging.Instance.logError('Missing installation id', 'SNY-YT');
        response.status(403).json({});
        return;
    }

    // Retrieve the installation from the installation id
    const sentryInstallation = getInstallation(installationId);
    if (!sentryInstallation) {
        Logging.Instance.logError('Invalid installation id', 'SNY-YT');
        response.status(403).json({});
        return;
    }

    Logging.Instance.logDebug(`Successfully verified installation id ${installationId} to project id ${sentryInstallation.youtrackProjectId}`, 'SNY-YT');
    return next();
}