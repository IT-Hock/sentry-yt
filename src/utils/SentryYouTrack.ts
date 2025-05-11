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

import {Logging} from './logging';
import SentryInstallationConfig, {SentryInstallation} from '../config/SentryInstallationConfig';
import {HelmetOptions} from 'helmet';

/**
 * Get the installation from the installation id
 * @param installationId The installation id
 * @return The installation or null if not found
 */
export function getInstallation(installationId: string): SentryInstallation | null {
    if (installationId === null || installationId === undefined || installationId === '') {
        Logging.Instance.logError('Missing installation id', 'SNY-YT');
        return null;
    }
    const sentryInstallation = SentryInstallationConfig.Instance.getFromInstallationId(installationId);
    if (!sentryInstallation) {
        Logging.Instance.logError('Invalid installation id', 'SNY-YT');
        return null;
    }

    Logging.Instance.logDebug(`Got installation for id ${installationId} -> id ${sentryInstallation.youtrackProjectId}`, 'SNY-YT');
    return sentryInstallation;
}

/**
 * Get Helmet configuration from environment variables
 */
export function getHelmetConfig():HelmetOptions{
    let helmetConfig:HelmetOptions = {
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
        crossOriginOpenerPolicy: false,
        crossOriginResourcePolicy: false
    };

    if (process.env.SECURITY_ENABLE_CONTENT_SECURITY_POLICY) {
        helmetConfig.contentSecurityPolicy = {
            directives: {
                defaultSrc: ['\'self\''],
                scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
                styleSrc: ['\'self\'', '\'unsafe-inline\''],
                imgSrc: ['\'self\'', 'data:', 'https://www.gravatar.com'],
                connectSrc: ['\'self\'', 'https://*.sentry.io', 'https://*.youtrack.cloud', 'https://*.youtrack.jetbrains.com'],
                frameAncestors: ['\'self\'']
            }
        };
    }
    if (process.env.SECURITY_ENABLE_CROSS_ORIGIN_EMBEDDER_POLICY) {
        helmetConfig.crossOriginEmbedderPolicy = {
            policy: 'require-corp'
        };
    }
    if (process.env.SECURITY_ENABLE_CROSS_ORIGIN_OPENER_POLICY) {
        helmetConfig.crossOriginOpenerPolicy = {
            policy: 'same-origin'
        };
    }
    if (process.env.SECURITY_ENABLE_CROSS_ORIGIN_RESOURCE_POLICY) {
        helmetConfig.crossOriginResourcePolicy = {
            policy: 'same-origin'
        };
    }
    if (process.env.SECURITY_ENABLE_HSTS) {
        helmetConfig.hsts = {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true
        };
    }

    if (process.env.NODE_ENV !== 'production') {
        // Disable security headers in non-production mode
        helmetConfig = {
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginOpenerPolicy: false,
            crossOriginResourcePolicy: false
        };
    }
    return helmetConfig;
}