# Schemas

This page documents the data structures used in the Sentry <> YouTrack Integration API.

## Issue

Represents an issue in YouTrack or Sentry.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| id          | string | The unique identifier of the issue                    |
| summary     | string | The title or summary of the issue                     |
| description | string | The detailed description of the issue                 |
| status      | string | The current status of the issue (e.g., Open, Resolved)|
| priority    | string | The priority level of the issue                       |
| assignee    | object | The user assigned to the issue                        |
| reporter    | object | The user who reported the issue                       |
| created     | string | The creation timestamp (ISO 8601 format)              |
| updated     | string | The last update timestamp (ISO 8601 format)           |
| customFields| array  | Custom fields associated with the issue               |

## User

Represents a user in YouTrack or Sentry.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| id          | string | The unique identifier of the user                     |
| login       | string | The login name of the user                            |
| fullName    | string | The full name of the user                             |
| email       | string | The email address of the user                         |
| banned      | boolean| Whether the user is banned                            |
| online      | boolean| Whether the user is currently online                  |
| groups      | array  | The groups the user belongs to                        |

## Group

Represents a user group in YouTrack.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| id          | string | The unique identifier of the group                    |
| name        | string | The name of the group                                 |
| description | string | The description of the group                          |

## Project

Represents a project in YouTrack or Sentry.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| id          | string | The unique identifier of the project                  |
| name        | string | The name of the project                               |
| shortName   | string | The short name or key of the project                  |
| description | string | The description of the project                        |
| archived    | boolean| Whether the project is archived                       |

## CustomField

Represents a custom field in YouTrack.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| id          | string | The unique identifier of the custom field             |
| name        | string | The name of the custom field                          |
| type        | string | The type of the custom field                          |
| value       | any    | The value of the custom field                         |

## LinkRequestBody

Represents the request body for linking a Sentry issue to a YouTrack issue.

| Field          | Type   | Description                                           |
|----------------|--------|-------------------------------------------------------|
| fields         | object | Contains the YouTrack issue ID                        |
| fields.issue_id| string | The ID of the YouTrack issue to link                  |
| issueId        | number | The ID of the Sentry issue                            |
| installationId | string | The ID of the Sentry installation                     |
| webUrl         | string | The URL to the Sentry issue                           |
| project        | object | Information about the Sentry project                  |
| project.slug   | string | The slug of the Sentry project                        |
| project.id     | number | The ID of the Sentry project                          |
| actor          | object | Information about the user performing the action      |

## LinkResponseBody

Represents the response body for linking a Sentry issue to a YouTrack issue.

| Field       | Type   | Description                                           |
|-------------|--------|-------------------------------------------------------|
| webUrl      | string | The URL to the YouTrack issue                         |
| project     | string | The Sentry project ID                                 |
| identifier  | string | The YouTrack issue ID                                 |
