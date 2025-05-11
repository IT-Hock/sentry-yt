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

import {getYouTrackTelemetry} from '../utils/CustomYouTrack';
import express from 'express';
import {version} from '../../package.json';

const router = express.Router();

router.get('/', (request, response) => {
    response.status(200).json({
        message: 'Sentry YouTrack Integration API',
        version: version,
    });
});

router.get('/youtrack', async (request, response) => {
    // Use axios to check if the YouTrack server is reachable
    const result = await getYouTrackTelemetry();
    if (result) {
        response.status(200).json({
            message: 'YouTrack server is reachable',
        });
    } else {
        response.status(503).json({
            message: 'YouTrack server is not reachable',
        });
    }
});

export default router;