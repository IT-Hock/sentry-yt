#  POST 

<api-endpoint openapi-path="../../../openapi.yaml" method="POST" endpoint="/"/>

## Description

This is the root endpoint for webhook processing. It receives webhook events from Sentry and processes them accordingly. This endpoint is the primary entry point for the Sentry <> YouTrack integration.

## Request

### HTTP Request

```http
POST /
```

### Headers

| Header           | Type   | Required | Description                                                |
|------------------|--------|----------|------------------------------------------------------------|
| X-Sentry-Hook-ID | string | Yes      | The ID of the Sentry webhook                               |
| X-Sentry-Token   | string | Yes      | The security token for verifying the webhook               |

### Request Body

The request body contains the webhook payload from Sentry. The structure varies depending on the type of event, but generally includes information about the issue, project, and organization.

**Example (Issue Created)**:

```json
{
  "action": "created",
  "data": {
    "issue": {
      "id": "1",
      "title": "Error: Cannot read property 'length' of undefined",
      "culprit": "app.js",
      "level": "error",
      "status": "unresolved",
      "project": {
        "slug": "internal",
        "id": 1
      }
    },
    "event": {
      "id": "12345",
      "message": "Error: Cannot read property 'length' of undefined",
      "timestamp": "2023-01-01T00:00:00Z"
    }
  },
  "installation": {
    "uuid": "14ee411f-4127-439d-a7ec-559ef41ea817"
  }
}
```

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
{
  "status": "success",
  "message": "Webhook processed successfully"
}
```

### Error Responses

**Code**: 400 Bad Request

**Condition**: If the webhook payload is invalid or missing required fields.

**Content Example**:

```json
{
  "error": "Invalid webhook payload"
}
```

**Code**: 401 Unauthorized

**Condition**: If the webhook signature verification fails.

**Content Example**:

```json
{
  "error": "Invalid webhook signature"
}
```

**Code**: 500 Internal Server Error

**Condition**: If there is an error processing the webhook.

**Content Example**:

```json
{
  "error": "Error processing webhook"
}
```

## Notes

- This endpoint handles various types of Sentry webhook events, including issue creation, updates, and alerts.
- The webhook signature is verified using the X-Sentry-Token header to ensure the request is legitimate.
- Based on the event type and data, the integration may create or update issues in YouTrack.
- Webhook processing is asynchronous, so the response indicates only that the webhook was received and initial validation passed.
