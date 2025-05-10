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

const router = express.Router();

type SentrySelectOption = {
    label: string;
    value: string;
    default?: boolean;
};

// These endpoints are used to populate the options for 'Select' FormFields in Sentry.

router.get('/items', async (request, response): Promise<void> => {
    const {installationId: uuid} = request.query;
    /*const sentryInstallation = await SentryInstallation.findOne({
        where: {uuid},
    });
    if (!sentryInstallation) {
        return response.sendStatus(404);
    }
    // We can use the installation data to filter the items we return to Sentry.
    const items = await Item.findAll({
        where: {organizationId: sentryInstallation.organizationId},
    });
    // Sentry requires the results in this exact format.
    const result: SentrySelectOption[] = items.map(item => ({
        label: item.title,
        value: item.id,
    }));
    console.info('Populating item options in Sentry');*/
    const result: SentrySelectOption[] = [];
    response.send(result);
});

router.get('/users', async (request, response): Promise<void> => {
    const {installationId: uuid} = request.query;
    /*const sentryInstallation = await SentryInstallation.findOne({
        where: {uuid},
    });
    if (!sentryInstallation) {
        return response.sendStatus(404);
    }
    // We can use the installation data to filter the users we return to Sentry.
    const users = await User.findAll({
        where: {organizationId: sentryInstallation.organizationId},
    });
    // Sentry requires the results in this exact format.
    const result: SentrySelectOption[] = users.map(user => ({
        label: user.name,
        value: user.id,
    }));
    console.info('Populating user options in Sentry');*/
    const result: SentrySelectOption[] = [];
    response.send(result);
});

export default router;