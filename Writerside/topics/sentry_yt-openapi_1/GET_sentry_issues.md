#  GET sentry/issues

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/sentry/issues"/>

## Description

This endpoint retrieves Sentry issues based on the provided query parameters. It allows you to search for issues in Sentry that are linked to YouTrack issues.

## Request

### HTTP Request

```http
GET /sentry/issues
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| query        | string | No       | A search query to filter issues                            |
| projectSlug  | string | No       | The slug of the Sentry project                             |

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
[
  {
    "id": "1",
    "title": "Error: Cannot read property 'length' of undefined",
    "culprit": "app.js",
    "status": "unresolved",
    "project": {
      "slug": "internal",
      "id": 1
    },
    "youtrackIssue": "YT-123"
  },
  {
    "id": "2",
    "title": "TypeError: Cannot read property 'map' of null",
    "culprit": "main.js",
    "status": "unresolved",
    "project": {
      "slug": "internal",
      "id": 1
    },
    "youtrackIssue": "YT-124"
  }
]
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "Error fetching issues from Youtrack"
}
```

## Notes

- The endpoint uses the Sentry installation configuration from the request to determine the YouTrack project ID.
- The response contains Sentry issues with their associated YouTrack issue IDs.
- Error handling includes logging of errors for debugging purposes.
