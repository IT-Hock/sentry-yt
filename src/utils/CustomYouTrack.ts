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

import {PaginationOptions} from 'youtrack-rest-client/dist/options/pagination_options';
import {YoutrackClient} from 'youtrack-rest-client/dist/youtrack_client';
import {Issue, YouTrackIssueExtended} from '../models/Issue.model';
import axios from 'axios';
import YouTrackConfig from '../config/YouTrackConfig';
import {Logging} from './logging';

export function constructSearchQuery(
    projectId: string,
    issueId?: string
): string {
    const queryParts = [];
    if (projectId) {
        queryParts.push(`project:${projectId}`);
    }
    if (issueId) {
        queryParts.push(`id:${issueId}`);
    }
    return queryParts.join(' AND ');
}


export async function getIssues(
    youtrack: YoutrackClient,
    query: string | null = null,
    projectId: string | null = null,
    paginationOptions: PaginationOptions | null = null
): Promise<Issue[]> {
    return (await youtrack.get('/issues', {
        params: {
            query: (projectId && projectId !== '') ? constructSearchQuery(projectId) : query,
            ...paginationOptions,
            fields: 'id,idReadable,summary'
        }
    })).map((issue: YouTrackIssueExtended) => {
        return Issue.fromYoutrackIssue(issue);
    });
}

export async function getYouTrackTelemetry(): Promise<boolean> {
    const result = await axios.get(`${YouTrackConfig.Instance.baseUrl}/api/admin/telemetry`,
        {
            headers: {
                'Authorization': `Bearer ${YouTrackConfig.Instance.token}`,
            }
        }
    );
    if (result.status !== 200) {
        Logging.Instance.logError(`Failed to get telemetry data from YouTrack: ${result.status} ${result.statusText}`);
        Logging.Instance.logDebug(`Response: ${JSON.stringify(result.data)}`);
        return false;
    }
    if (result.data === null) {
        Logging.Instance.logError(`Failed to get telemetry data from YouTrack: ${result.status} ${result.statusText}`);
        Logging.Instance.logDebug(`Response: ${JSON.stringify(result.data)}`);
        return false;
    }

    Logging.Instance.logDebug(`YouTrack telemetry data: ${JSON.stringify(result.data)}`);
    return true;
}