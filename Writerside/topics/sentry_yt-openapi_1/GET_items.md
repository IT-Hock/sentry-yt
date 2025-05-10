#  GET items

<api-endpoint openapi-path="../../../openapi.yaml" method="GET" endpoint="/items"/>

## Description

This endpoint retrieves a list of items from the system. These items can represent various entities depending on the context, such as configuration items, integration items, or other resources.

## Request

### HTTP Request

```http
GET /items
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| type         | string | No       | Filter items by type                                       |
| query        | string | No       | A search query to filter items                             |

## Response

### Success Response

**Code**: 200 OK

**Content Example**:

```json
[
  {
    "id": "1",
    "name": "Item 1",
    "type": "configuration",
    "description": "A configuration item",
    "createdAt": "2023-01-01T00:00:00Z",
    "updatedAt": "2023-01-02T00:00:00Z"
  },
  {
    "id": "2",
    "name": "Item 2",
    "type": "integration",
    "description": "An integration item",
    "createdAt": "2023-01-03T00:00:00Z",
    "updatedAt": "2023-01-04T00:00:00Z"
  }
]
```

### Error Responses

**Code**: 500 Internal Server Error

**Content Example**:

```json
{
  "error": "Error fetching items"
}
```

## Notes

- This endpoint is useful for retrieving information about various items in the system.
- The response includes details such as item IDs, names, types, descriptions, and timestamps.
- Authentication may be required to access this endpoint, depending on the configuration.
