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

export default router;

/*
// The shape of your settings will depend on how you configure your form fields
// This example coordinates with integration-schema.json for 'alert-rule-settings'
export type AlertRuleSettings = {
    title?: string;
    description?: string;
    userId?: string;
};

export type SentryField = {
    name: string;
    value: any;
};

export const convertSentryFieldsToDict = (fields: SentryField[]): AlertRuleSettings =>
    fields.reduce((acc: Record<string, any>, {name, value}) => {
        acc[name] = value;
        return acc;
    }, {});

// This endpoint will only be called if the 'alert-rule-action' is present in the schema.
router.post('/', async (request, response) => {
    const {installationId: uuid} = request.body;
    /*const sentryInstallation = uuid
        ? await SentryInstallation.findOne({
            where: {uuid},
        })
        : null;
    if (!sentryInstallation) {
        return response.status(400).send({message: 'Invalid installation was provided'});
    }

    // Now we can validate the data the user provided to our alert rule action
    // Sending a payload with the 'message' key will be surfaced to the user in Sentry
    // This stops the user from creating the alert, so it's a good way to bubble up relevant info.
    const alertRuleActionSettings = convertSentryFieldsToDict(request.body.fields);
    if (!alertRuleActionSettings.title || !alertRuleActionSettings.description) {
        return response.status(400).send({message: 'Title and description are required'});
    }
    if (alertRuleActionSettings.userId) {
        const user = await User.findOne({
            where: {
                id: alertRuleActionSettings.userId,
                organizationId: sentryInstallation.organizationId,
            },
        });
        if (!user) {
            return response.status(400).send({message: 'Selected user was not found'});
        }
    }* /

    console.info('Successfully validated Sentry alert rule');

    // By sending a successful response code, we are approving that alert to notify our application.
    response.sendStatus(200);
});
*/