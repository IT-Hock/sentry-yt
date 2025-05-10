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
import Server from '../../../server';
import {LinkRequestBody, LinkResponseBody} from '../../../utils/types';
import SentryInstallationConfig from '../../../config/SentryInstallationConfig';
import YouTrackConfig from '../../../config/YouTrackConfig';
import {Logging} from '../../../utils/logging';
import {YouTrackUpdateIssueExtended} from '../../../models/Issue.model';

const router = express.Router();
router.post('/', async (request, response):Promise<void> => {
    const linkRequest = request.body as LinkRequestBody;
    if (!linkRequest.fields.issue_id) {
        response.status(403).json({});
        return;
    }

    const sentryInstallation = SentryInstallationConfig.Instance.getFromRequest(request);
    if (!sentryInstallation) {
        Logging.Instance.logDebug('Sentry installation not found', 'SNY-YT');
        response.status(403).json({});
        return;
    }

    const issue = await Server.Youtrack.issues.byId(linkRequest.fields.issue_id);
    if (!issue) {
        Logging.Instance.logDebug(`Issue ${linkRequest.fields.issue_id} not found`, 'SNY-YT');
        response.status(404).json({});
        return;
    }

    if (issue.fields)
    {
        const hasCustomField = issue.fields.some((field) => {
            return field.id === sentryInstallation.youtrackCustomFieldId &&
                field.value === linkRequest.issueId.toString();
        });
        // TODO:
        //  This check actually does nothing. The idea was to check if the field.value has already a value.
        //  The issue is that the value can be non-empty even without a link to Sentry...
        if (hasCustomField) {
            Logging.Instance.logDebug(`Issue ${linkRequest.fields.issue_id} already has a link to Sentry issue ${linkRequest.issueId}`, 'SNY-YT');
            response.status(409).json({});
            return;
        }
    }

    try {
        Logging.Instance.logDebug(`Adding link to issue ${linkRequest.fields.issue_id}, sentry issue ${linkRequest.issueId}`, 'SNY-YT');
        const res = await Server.Youtrack.issues.update({
                id: linkRequest.fields.issue_id,
                fields: [
                    {
                        value: linkRequest.issueId.toString(),
                        id: '523-11',
                        name: 'Sentry Issue ID',
                        $type: 'SimpleIssueCustomField'
                    }
                ]
            } as YouTrackUpdateIssueExtended);
        Logging.Instance.logDebug('Issue updated successfully', 'SNY-YT');
        Logging.Instance.logDebug('Response: ' + JSON.stringify(res), 'SNY-YT');

        // Respond to Sentry with the exact fields it requires to complete the link.
        const responseBody:LinkResponseBody = {
            webUrl: YouTrackConfig.Instance.baseUrl + '/issue/' + linkRequest.fields.issue_id,
            project: linkRequest.project.id.toString(),
            identifier: `${res.id}`,
        };
        response.status(201).json(responseBody);
    } catch (error) {
        console.error('Error processing request:', error);
        response.status(500).json({error: 'Internal server error'});
    }
});

export default router;