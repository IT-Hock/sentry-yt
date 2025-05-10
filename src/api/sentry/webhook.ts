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

import {InstallResponseData} from './setup';

const router = express.Router();

router.post('/', async (request: Request, response: Response): Promise<void> => {
    response.status(200);
    // Parse the JSON body fields off of the request
    const {action, data, installation, actor} = request.body;
    const {uuid} = installation ?? {};

    // Identify the resource triggering the webhook in Sentry
    const resource = request.header('sentry-hook-resource');
    if (!action || !data || !uuid || !resource) {
        response.sendStatus(400);
        return;
    }
    console.info(`Received '${resource}.${action}' webhook from Sentry`);

    /*
    // If there is no associated installation, ignore the webhook
    // Note: We can drop webhooks without installations because we specified a
    //       Redirect URL on our Sentry Integration, so setup.ts handles it.
    //       If we didn't set the Redirect URL we'd have to handle it here by
    //       creating an installation for 'installation.created' webhoooks.
    //       e.g. if (resource === 'installation' && action === 'created') { createSentryInstallation(...); }
    const sentryInstallation = await SentryInstallation.findOne({where: {uuid}});
    if (!sentryInstallation) {
        return response.sendStatus(404);
    }

    // Handle webhooks related to issues
    if (resource === 'issue') {
        await issueHandler(response, action, sentryInstallation, data);
    }

    // Handle webhooks related to errors
    if (resource === 'error') {
        // The error.created webhook has an immense volume since it triggers on each event in Sentry.
        // If you're developing a public integration on SaaS, both you (the integration builder) and
        // the user installing your integration will require at least a Business plan to use them.
        // Keep this in mind while building on this webhook.
        response.status(200);
    }

    // Handle webhooks related to comments
    if (resource === 'comment') {
        await commentHandler(response, action, sentryInstallation, data, actor);
    }

    // Handle webhooks related to alerts
    if (resource === 'event_alert' || resource === 'metric_alert') {
        await alertHandler(response, resource, action, sentryInstallation, data);
    }
*/

    // Handle uninstallation webhook
    if (resource === 'installation' && action === 'deleted') {
        await handleUninstall(response, data.installation);
    }
    // We can monitor what status codes we're sending from the integration dashboard
    response.send();
});

async function handleUninstall(
    response: Response,
    installData: InstallResponseData
): Promise<Response> {
    /*const installation = await SentryInstallation.findOne({
        where: {uuid: installData.uuid},
    });
    if (!installation) {
        return response.status(404);
    }
    // This is where you could destroy any associated data you've created alongside the installation
    const organization = await Organization.findByPk(installation.organizationId);
    organization.externalSlug = null;
    await organization.save();
    await installation.destroy();
    console.info(
        `Uninstalled ${installData.app.slug} from '${installData.organization.slug}'`
    );
    return response.status(204);*/
    return response.status(204);
}

export default router;