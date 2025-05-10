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
import {Issue as YouTrackIssue, UpdateIssue} from 'youtrack-rest-client';
import {IssueCustomField, IssueCustomFieldValue} from 'youtrack-rest-client/dist/entities/issueCustomField';

export type SentryField = {
    id: string;
    label: string;
    value: string;
}

export type YouTrackIssueExtended = YouTrackIssue & {
    idReadable: string;
}

export type YouTrackCustomFieldExtended = IssueCustomField & {
    value: IssueCustomFieldValue | null | string;
}

export type YouTrackUpdateIssueExtended = UpdateIssue & {
    fields: YouTrackCustomFieldExtended[];
}

export class Issue {
    id: string;
    idReadable: string;
    summary: string;
    sentryId: string | null;

    constructor(id: string, idReadable: string, summary: string) {
        this.id = id;
        this.idReadable = idReadable;
        this.summary = summary;

        this.sentryId = null;
    }

    static fromYoutrackIssue(issue: YouTrackIssueExtended): Issue {

        if (!issue?.id || !issue?.summary) {
            throw new Error('YouTrack Issue is invalid');
        }

        return new Issue(issue.id, issue.idReadable, issue.summary);
    }

    get label():string {
        return `[${this.idReadable}] ${this.summary}`;
    }

    get selectField(): SentryField {
        return {
            id: this.id,
            label: this.label,
            value: this.id
        };
    }
}