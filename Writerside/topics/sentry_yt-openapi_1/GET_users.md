#  GET users

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/users"/>

## Description

This endpoint retrieves a list of users from YouTrack. It provides information about users who have access to the YouTrack instance and their roles.

## Request

### HTTP Request

```http
GET /users
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| query        | string | No       | A search query to filter users                             |

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
[
  {
    "id": "1-1",
    "login": "admin",
    "fullName": "Administrator",
    "email": "admin@example.com",
    "banned": false,
    "online": true,
    "groups": [
      {
        "id": "1-0",
        "name": "All Users"
      },
      {
        "id": "1-1",
        "name": "Administrators"
      }
    ]
  },
  {
    "id": "1-2",
    "login": "user",
    "fullName": "Regular User",
    "email": "user@example.com",
    "banned": false,
    "online": false,
    "groups": [
      {
        "id": "1-0",
        "name": "All Users"
      }
    ]
  }
]
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "Error fetching users from YouTrack"
}
```

## Notes

- This endpoint is useful for retrieving information about YouTrack users.
- The response includes details such as user IDs, login names, full names, email addresses, banned status, online status, and group memberships.
- Authentication is required to access this endpoint, and the user must have appropriate permissions to view user information in YouTrack.
