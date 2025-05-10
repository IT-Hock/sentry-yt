# API Reference

This documentation provides details about the Sentry <> YouTrack Integration API endpoints. The API allows you to interact with both Sentry and YouTrack, enabling seamless integration between the two platforms.

## Overview

The Sentry <> YouTrack Integration is a Node.js application that integrates Sentry with YouTrack, allowing Sentry issues and alerts to be automatically created and updated in YouTrack. This API documentation covers the available endpoints and their functionality.

## Authentication

Most endpoints require authentication. Make sure to include the appropriate authentication headers in your requests.

## Base URL

The base URL for all API endpoints is determined by your deployment configuration. By default, the API is available at:

```
http://localhost:3000
```

## Available Endpoints

The API provides the following endpoints:

- [GET /issues](GET_issues.md) - Retrieve YouTrack issues
- [GET /sentry/issues](GET_sentry_issues.md) - Retrieve Sentry issues
- [POST /sentry/issues/link](POST_sentry_issues_link.md) - Link a Sentry issue to a YouTrack issue
- [GET /sentry](GET_sentry.md) - Retrieve Sentry information
- [GET /sentry/members](GET_sentry_members.md) - Retrieve Sentry members
- [GET /users](GET_users.md) - Retrieve users
- [GET /items](GET_items.md) - Retrieve items
- [POST /](POST_.md) - Root endpoint for webhook processing

## Data Schemas

For information about the data structures used in the API, see the [Schemas](Schemas.md) page.
