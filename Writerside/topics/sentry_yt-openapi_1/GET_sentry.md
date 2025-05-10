#  GET sentry

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/sentry"/>

## Description

This endpoint retrieves general information about the Sentry integration. It provides details about the configuration and status of the Sentry <> YouTrack integration.

## Request

### HTTP Request

```http
GET /sentry
```

### Query Parameters

No query parameters are required for this endpoint.

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
{
  "status": "active",
  "version": "1.0.0",
  "integrations": [
    {
      "id": "14ee411f-4127-439d-a7ec-559ef41ea817",
      "name": "Internal Project",
      "project": "INTERNAL",
      "status": "active"
    }
  ],
  "config": {
    "baseUrl": "https://youtrack.example.com",
    "skipSigVerify": false,
    "skipInstallVerify": false
  }
}
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "Internal server error"
}
```

## Notes

- This endpoint is useful for checking the status and configuration of the Sentry <> YouTrack integration.
- It provides information about all configured Sentry integrations and their associated YouTrack projects.
- The response includes the current version of the integration and its configuration settings.
