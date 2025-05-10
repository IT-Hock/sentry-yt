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

import express, { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import sentryRoutes from '../src/api/sentry';
import commentCreatedPayload from './fixtures/comments/created.json';
import commentUpdatedPayload from './fixtures/comments/updated.json';
import commentDeletedPayload from './fixtures/comments/deleted.json';

// Mock the verifySentrySignature middleware to always pass
jest.mock('../src/api/middleware', () => ({
  verifySentrySignature: (req: Request, res: Response, next: NextFunction):void => next(),
}));

describe('Comments Webhooks', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/sentry', sentryRoutes);
  });

  describe('POST /sentry/webhook', () => {
    it('should handle comment created webhook', async () => {
      // Send the request
      const response = await request(app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'comment')
        .send(commentCreatedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle comment updated webhook', async () => {
      // Send the request
      const response = await request(app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'comment')
        .send(commentUpdatedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle comment deleted webhook', async () => {
      // Send the request
      const response = await request(app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'comment')
        .send(commentDeletedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });
  });
});
