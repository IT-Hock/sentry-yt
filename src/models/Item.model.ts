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

export enum ItemColumn {
    Todo = 'TODO',
    Doing = 'DOING',
    Done = 'DONE',
}

export type ItemComment = {
    text: string;
    author: string;
    timestamp: string;
    sentryCommentId: string;
};

export default class Item {
    id: string;
    title: string;
    description: string;
    complexity: number;
    isIgnored: boolean = false;
    sentryId: string;
    sentryAlertId: string;
    comments: ItemComment[] = [];
    column: ItemColumn = ItemColumn.Todo;
    assigneeId: number;
    organizationId: number;

    constructor(
        id: string,
        title: string,
        description: string,
        complexity: number,
        sentryId: string,
        sentryAlertId: string,
        assigneeId: number,
        organizationId: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.complexity = complexity;
        this.sentryId = sentryId;
        this.sentryAlertId = sentryAlertId;
        this.assigneeId = assigneeId;
        this.organizationId = organizationId;
    }
}