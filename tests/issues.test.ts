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

import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import Server from '../src/server';
import issueResolvedPayload from './fixtures/issues/resolved.json';
import issueAssignedPayload from './fixtures/issues/assigned.json';
import issueCreatedPayload from './fixtures/issues/created.json';
import issueUnresolvedPayload from './fixtures/issues/unresolved.json';
import issueArchivedPayload from './fixtures/issues/archived.json';


// Mock the verifySentrySignature middleware to always pass
jest.mock('../src/api/middleware', () => ({
  verifySentrySignature: (req: Request, res: Response, next: NextFunction):void => next(),
}));

describe('Issues Webhooks', () => {
  let app: Server;

  beforeEach(() => {
    app = Server.Instance;
  });

  describe('POST /sentry/webhook', () => {
    it('should handle issue created webhook', async () => {
      // Send the request
      const response = await request(app.app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'issue')
        .send(issueCreatedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle issue assigned webhook', async () => {
      // Send the request
      const response = await request(app.app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'issue')
        .send(issueAssignedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle issue resolved webhook', async () => {
      // Send the request
      const response = await request(app.app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'issue')
        .send(issueResolvedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle issue unresolved webhook', async () => {
      // Send the request
      const response = await request(app.app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'issue')
        .send(issueUnresolvedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });

    it('should handle issue archived webhook', async () => {
      // Send the request
      const response = await request(app.app)
        .post('/sentry/webhook')
        .set('sentry-hook-resource', 'issue')
        .send(issueArchivedPayload);

      // Assert the response
      expect(response.status).toBe(200);
    });
  });
});
