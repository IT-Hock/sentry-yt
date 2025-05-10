#  GET sentry/members

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/sentry/members"/>

## Description

This endpoint retrieves a list of members from Sentry. It provides information about users who have access to the Sentry organization and their roles.

## Request

### HTTP Request

```http
GET /sentry/members
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| installationId | string | No     | Filter members by a specific Sentry installation           |

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
[
  {
    "id": "1",
    "email": "user1@example.com",
    "name": "User One",
    "role": "admin",
    "isActive": true
  },
  {
    "id": "2",
    "email": "user2@example.com",
    "name": "User Two",
    "role": "member",
    "isActive": true
  }
]
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "Error fetching members from Sentry"
}
```

**Code**: 403 Forbidden

**Condition**: If the Sentry installation is not found or the user doesn't have permission.

**Content Example**:

```json
{
  "error": "Sentry installation not found or permission denied"
}
```

## Notes

- This endpoint is useful for retrieving information about Sentry organization members.
- The response includes details such as member IDs, email addresses, names, roles, and active status.
- Authentication is required to access this endpoint, and the user must have appropriate permissions.
