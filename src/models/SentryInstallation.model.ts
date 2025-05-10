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

export default class SentryInstallation {
    uuid: string;
    orgSlug: string;
    token: string;
    refreshToken: string;
    expiresAt: Date;
    organizationId: number;

    constructor(
        uuid: string,
        orgSlug: string,
        token: string,
        refreshToken: string,
        expiresAt: Date,
        organizationId: number
    ) {
        this.uuid = uuid;
        this.orgSlug = orgSlug;
        this.token = token;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
        this.organizationId = organizationId;
    }
}