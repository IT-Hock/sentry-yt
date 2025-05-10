#  GET issues

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/issues"/>

## Description

This endpoint retrieves YouTrack issues based on the provided query parameters. It allows you to search for issues in YouTrack and returns them in a format suitable for integration with Sentry.

## Request

### HTTP Request

```http
GET /issues
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| query        | string | No       | A search query to filter issues in YouTrack                |
| projectSlug  | string | No       | The slug of the Sentry project                             |

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
[
  {
    "id": "YT-123",
    "summary": "Issue title",
    "description": "Issue description",
    "status": "Open",
    "priority": "Normal"
  },
  {
    "id": "YT-124",
    "summary": "Another issue",
    "description": "Another issue description",
    "status": "In Progress",
    "priority": "High"
  }
]
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "YouTrack issues not found"
}
```

## Notes

- The endpoint uses the Sentry installation configuration to determine the YouTrack project ID.
- The response contains only the relevant fields from YouTrack issues that are needed for Sentry integration.
- Error handling includes logging of errors for debugging purposes.
