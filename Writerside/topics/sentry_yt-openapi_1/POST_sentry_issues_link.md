#  POST sentry/issues/link

<api-endpoint openapi-path="../../../openapi.yaml" method="POST" endpoint="/sentry/issues/link"/>

## Description

This endpoint links a Sentry issue to a YouTrack issue by updating a custom field in the YouTrack issue. It is typically used when a user wants to associate a Sentry error or exception with a specific YouTrack issue for tracking and resolution.

## Request

### HTTP Request

```http
POST /sentry/issues/link
```

### Request Body

| Field          | Type   | Required | Description                                                |
|----------------|--------|----------|------------------------------------------------------------|
| fields         | object | Yes      | Contains the YouTrack issue ID                             |
| fields.issue_id| string | Yes      | The ID of the YouTrack issue to link                       |
| issueId        | number | Yes      | The ID of the Sentry issue                                 |
| installationId | string | Yes      | The ID of the Sentry installation                          |
| webUrl         | string | Yes      | The URL to the Sentry issue                                |
| project        | object | Yes      | Information about the Sentry project                       |
| project.slug   | string | Yes      | The slug of the Sentry project                             |
| project.id     | number | Yes      | The ID of the Sentry project                               |
| actor          | object | Yes      | Information about the user performing the action           |

**Example**:

```json
{
  "fields": {
    "issue_id": "YT-123"
  },
  "issueId": 1,
  "installationId": "14ee411f-4127-439d-a7ec-559ef41ea817",
  "webUrl": "http://localhost:9000/organizations/it-hock/issues/1/",
  "project": {
    "slug": "internal",
    "id": 1
  },
  "actor": {
    "type": "user",
    "id": 1,
    "name": ""
  }
}
```

## Response

### Success Response

**Code**: 201 Created

**Content Example**:

```json
{
  "webUrl": "https://youtrack.example.com/issue/YT-123",
  "project": "1",
  "identifier": "YT-123"
}
```

### Error Responses

**Code**: 403 Forbidden

**Condition**: If the issue_id is not provided or the Sentry installation is not found.

**Code**: 404 Not Found

**Condition**: If the YouTrack issue with the provided ID is not found.

**Code**: 409 Conflict

**Condition**: If the YouTrack issue already has a link to the Sentry issue.

**Code**: 500 Internal Server Error

**Condition**: If there is an error updating the YouTrack issue.

## Notes

- The endpoint updates a custom field in the YouTrack issue to store the Sentry issue ID.
- The response includes the URL to the YouTrack issue, the Sentry project ID, and the YouTrack issue ID.
- Error handling includes validation of the request body and appropriate status codes for different error conditions.
