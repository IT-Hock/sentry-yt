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
import axios from 'axios';

export type TokenResponseData = {
    expiresAt: string; // ISO date string at which token must be refreshed
    token: string; // Bearer token authorized to make Sentry API requests
    refreshToken: string; // Refresh token required to get a new Bearer token after expiration
};

export type InstallResponseData = {
    app: {
        uuid: string; // UUID for your application (shared across installations)
        slug: string; // URL slug for your application (shared across installations)
    };
    organization: {
        slug: string; // URL slug for the organization doing the installation
    };
    uuid: string; // UUID for the individual installation
};

router.post('/', async (req, res) => {
    // Destructure the all the body params we receive from the installation prompt
    const {
        code,
        installationId,
        sentryOrgSlug,
        // Our frontend application tells us which organization to associate the install with
        organizationId,
    } = req.body;

    // Construct a payload to ask Sentry for a token on the basis that a user is installing
    const payload = {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.SENTRY_CLIENT_ID,
        client_secret: process.env.SENTRY_CLIENT_SECRET,
    };

    // Send that payload to Sentry and parse its response
    const tokenResponse: {data: TokenResponseData} = await axios.post(
        `${process.env.SENTRY_URL}/api/0/sentry-app-installations/${installationId}/authorizations/`,
        payload
    );

    /*
    // Store the tokenData (i.e. token, refreshToken, expiresAt) for future requests
    //    - Make sure to associate the installationId and the tokenData since it's unique to the organization
    //    - Using the wrong token for the a different installation will result 401 Unauthorized responses
    const {token, refreshToken, expiresAt} = tokenResponse.data;
    const organization = await Organization.findByPk(organizationId);
    await SentryInstallation.create({
        uuid: installationId as string,
        orgSlug: sentryOrgSlug as string,
        expiresAt: new Date(expiresAt),
        token,
        refreshToken,
        organizationId: organization.id,
    });

    // Verify the installation to inform Sentry of the success
    //    - This step is only required if you have enabled 'Verify Installation' on your integration
    const verifyResponse: {data: InstallResponseData} = await axios.put(
        `${process.env.SENTRY_URL}/api/0/sentry-app-installations/${installationId}/`,
        {status: 'installed'},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Update the associated organization to connect it to Sentry's organization
    organization.externalSlug = sentryOrgSlug;
    await organization.save();* /

    const {token, refreshToken, expiresAt} = tokenResponse.data;
    const verifyResponse: {data: InstallResponseData} = await axios.put(
        `${process.env.SENTRY_URL}/api/0/sentry-app-installations/${installationId}/`,
        {status: 'installed'},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Continue the installation process
    // - If your app requires additional configuration, this is where you can do it
    // - The token/refreshToken can be used to make requests to Sentry's API
    // - Once you're done, you can optionally redirect the user back to Sentry as we do below
    console.info(`Installed ${verifyResponse.data.app.slug}`);
    res.status(201).send({
        redirectUrl: `${process.env.SENTRY_URL}/settings/${sentryOrgSlug}/sentry-apps/${verifyResponse.data.app.slug}/`,
    });
});
*/