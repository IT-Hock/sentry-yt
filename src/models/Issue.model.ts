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

    static fromYoutrackIssue(issue: any): Issue {

        if (!issue?.id || !issue?.summary) {
            throw new Error('YouTrack Issue is invalid');
        }

        return new Issue(issue.id, issue.idReadable, issue.summary);
    }

    get label() {
        return `[${this.idReadable}] ${this.summary}`;
    }

    get selectField() {
        return {
            id: this.id,
            label: this.label,
            value: this.id
        };
    }
}