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

import express, {Request, Response} from 'express';

import Server from '../../server';
import {Logging} from '../../utils/logging';

const router = express.Router();

router.get('/', async (request: Request, response: Response): Promise<void> => {
    Logging.Instance.logDebug('Fetching users from Youtrack', 'SNY-YT');
    try {
        // TODO: Verify project <> sentry installation mapping
        const youtrackUsers = await Server.Youtrack.users.all();
        if (youtrackUsers === undefined) {
            Logging.Instance.logError('YouTrack users not found', 'SNY-YT');
            response.status(500).json({
                error: 'YouTrack users not found'
            });
            return;
        }
        const sentryUsers = youtrackUsers.map((user) => {
            return {
                id: user.id,
                label: user.fullName,
                value: user.id
            };
        });
        Logging.Instance.logDebug('Fetched users from Youtrack', 'SNY-YT');
        Logging.Instance.logDebug(`Youtrack users: ${JSON.stringify(youtrackUsers)}`, 'SNY-YT');
        response.status(200).json(sentryUsers);
    } catch (error) {
        Logging.Instance.logError('Error fetching users from Youtrack: ' + error, 'SNY-YT');
        response.status(500).json({
            error: 'Error fetching users from YouTrack.'
        });
    }
});

export default router;