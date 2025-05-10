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

import express, {NextFunction, Request, Response} from 'express';

import Server from "../../../server";
import {getIssues} from "../../../utils/CustomYouTrack";
import {Logging} from "../../../utils/logging";
import SentryInstallationConfig from "../../../config/SentryInstallationConfig";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const query = (req.query.query as string) ?? null;
    const projectSlug = (req.query.projectSlug as string) ?? null;
    const sentryInstallation = SentryInstallationConfig.Instance.getFromRequest(req);
    Logging.Instance.logDebug('Fetching issues from Youtrack...', 'SNY-YT');
    Logging.Instance.logDebug('Query: "' + query + '"', 'SNY-YT');
    Logging.Instance.logDebug('Project: "' + projectSlug + '"', 'SNY-YT');
    Logging.Instance.logDebug('Project ID: "' + sentryInstallation?.youtrackProjectId + '"', 'SNY-YT');
    try {
        const issues = await getIssues(Server.Youtrack, query, sentryInstallation?.youtrackProjectId);
        if (issues === undefined) {
            Logging.Instance.logError('YouTrack issues not found', 'SNY-YT');
            res.status(500).json({
                error: 'YouTrack issues not found'
            });
            return;
        }
        const sentryIssues = issues.map((issue) => {
            return issue.selectField
        });
        Logging.Instance.logDebug('Fetched ' + sentryIssues.length + ' issues from Youtrack', 'SNY-YT');
        Logging.Instance.logDebug(`Youtrack issues: ${JSON.stringify(issues)}`, 'SNY-YT');
        res.status(200).json(sentryIssues);
    } catch (error) {
        Logging.Instance.logError('Error fetching issues from Youtrack: ' + error, 'SNY-YT');
        next(error);
    }
});

export default router;