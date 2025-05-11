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
import sentryRoutes from './sentry';
import healthRoutes from './health';
import docRoutes from './docs';
import {verifyInstallationMiddleware, verifySentrySignatureMiddleware} from './middleware';

const router = express.Router();

router.use('/sentry', verifyInstallationMiddleware, verifySentrySignatureMiddleware, sentryRoutes);
router.use('/health', healthRoutes);
router.use('/docs', docRoutes);

export default router;