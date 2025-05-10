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

import apiRoutes from '../src/api';

describe('API Routes', () => {
  it('should have routes defined', () => {
    // Check if the router has any routes
    expect(apiRoutes.stack.length).toBeGreaterThan(0);
  });

  it('should export a valid Express router', () => {
    // Check if apiRoutes is a valid Express router
    expect(apiRoutes).toBeDefined();
    expect(typeof apiRoutes).toBe('function');
    expect(apiRoutes.stack).toBeDefined();
    expect(Array.isArray(apiRoutes.stack)).toBe(true);
  });
});
