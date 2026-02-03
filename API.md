# ReelSmith Tasks API Documentation

Complete REST API documentation for the ReelSmith Tasks backend.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://reelsmith-tasks.railway.app` (update with your Railway URL)

## Authentication

Currently, no authentication is required. This is a private tool for ReelSmith team use.

**Note**: In production, consider adding authentication if exposing publicly.

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Endpoints

### Health Check

**GET /**

Check API health and status.

**Response:**
```json
{
  "status": "ok",
  "message": "ReelSmith Tasks API",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

### Tasks

#### Get All Tasks

**GET /api/tasks**

Retrieve all tasks from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Launch marketing campaign",
      "description": "Create social media posts for product launch",
      "status": "in-progress",
      "priority": "high",
      "category": "marketing",
      "assignee": "Arun",
      "dueDate": "2024-02-01T00:00:00.000Z",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T11:30:00.000Z",
      "archived": false
    }
  ],
  "count": 15
}
```

**Status Codes:**
- `200 OK`: Success
- `500 Internal Server Error`: Database error

---

#### Get Single Task

**GET /api/tasks/:id**

Retrieve a specific task by ID.

**Parameters:**
- `id` (path, required): Task UUID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Launch marketing campaign",
    "description": "Create social media posts",
    "status": "in-progress",
    "priority": "high",
    "category": "marketing",
    "assignee": "Arun",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z",
    "archived": false
  }
}
```

**Status Codes:**
- `200 OK`: Success
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Database error

---

#### Create Task

**POST /api/tasks**

Create a new task.

**Request Body:**
```json
{
  "title": "Launch marketing campaign",
  "description": "Create social media posts",
  "status": "backlog",
  "priority": "high",
  "category": "marketing",
  "assignee": "Arun",
  "dueDate": "2024-02-01T00:00:00.000Z"
}
```

**Field Validation:**

| Field | Type | Required | Options | Default |
|-------|------|----------|---------|---------|
| `title` | string | Yes | - | - |
| `description` | string | No | - | "" |
| `status` | string | No | backlog, in-progress, done, blocked | backlog |
| `priority` | string | No | high, medium, low | medium |
| `category` | string | Yes | marketing, product, research, automation | - |
| `assignee` | string | Yes | Arun, Arc | - |
| `dueDate` | string (ISO) | No | - | null |

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Launch marketing campaign",
    "description": "Create social media posts",
    "status": "backlog",
    "priority": "high",
    "category": "marketing",
    "assignee": "Arun",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z",
    "archived": false
  },
  "message": "Task created successfully"
}
```

**Status Codes:**
- `201 Created`: Success
- `400 Bad Request`: Validation error
- `500 Internal Server Error`: Database error

---

#### Update Task

**PUT /api/tasks/:id**

Update an existing task. All fields are optional.

**Parameters:**
- `id` (path, required): Task UUID

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "medium",
  "category": "product",
  "assignee": "Arc",
  "dueDate": "2024-02-15T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated title",
    "description": "Updated description",
    "status": "in-progress",
    "priority": "medium",
    "category": "product",
    "assignee": "Arc",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T13:00:00.000Z",
    "archived": false
  },
  "message": "Task updated successfully"
}
```

**Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Validation error
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Database error

---

#### Move Task

**PATCH /api/tasks/:id/move**

Move a task to a different status column.

**Parameters:**
- `id` (path, required): Task UUID

**Request Body:**
```json
{
  "status": "done"
}
```

**Status Options:**
- `backlog`
- `in-progress`
- `done`
- `blocked`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Launch marketing campaign",
    "status": "done",
    "updatedAt": "2024-01-15T14:00:00.000Z",
    ...
  },
  "message": "Task moved to done"
}
```

**Status Codes:**
- `200 OK`: Success
- `400 Bad Request`: Invalid status
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Database error

---

#### Delete Task

**DELETE /api/tasks/:id**

Delete a task permanently.

**Parameters:**
- `id` (path, required): Task UUID

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Status Codes:**
- `200 OK`: Success
- `404 Not Found`: Task not found
- `500 Internal Server Error`: Database error

---

### Export

#### Export as JSON

**GET /api/export/json**

Export all tasks as JSON file.

**Response:**
- Content-Type: `application/json`
- Content-Disposition: `attachment; filename="reelsmith-tasks-2024-01-15.json"`

```json
{
  "exportedAt": "2024-01-15T15:00:00.000Z",
  "taskCount": 15,
  "tasks": [ ... ]
}
```

**Status Codes:**
- `200 OK`: Success
- `500 Internal Server Error`: Database error

---

#### Export as Markdown

**GET /api/export/markdown**

Export all tasks as formatted Markdown file.

**Response:**
- Content-Type: `text/markdown`
- Content-Disposition: `attachment; filename="reelsmith-tasks-2024-01-15.md"`

```markdown
# ReelSmith Tasks Export

**Exported:** Monday, January 15, 2024 at 3:00:00 PM
**Total Tasks:** 15

---

## 📋 Backlog

### Launch marketing campaign

**Status:** backlog
**Priority:** high
**Category:** marketing
**Assignee:** Arun
**Due Date:** February 1, 2024
**Created:** January 15, 2024

**Description:**
Create social media posts for product launch

---
```

**Status Codes:**
- `200 OK`: Success
- `500 Internal Server Error`: Database error

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message",
  "details": { ... }  // Optional, for validation errors
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input or validation error |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Database or server error |

### Validation Errors

Validation errors include detailed field information:

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "category",
      "message": "Invalid enum value. Expected 'marketing' | 'product' | 'research' | 'automation'"
    }
  ]
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. This may be added in future versions.

---

## CORS Configuration

CORS is configured to allow requests from:
- Development: `http://localhost:5173`
- Production: Value of `FRONTEND_URL` environment variable

Credentials are enabled for cookie-based authentication (future feature).

---

## Examples

### cURL Examples

**Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Research competitors",
    "description": "Analyze top 3 competitors",
    "status": "backlog",
    "priority": "high",
    "category": "research",
    "assignee": "Arc",
    "dueDate": "2024-02-01T00:00:00.000Z"
  }'
```

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Update task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "medium",
    "status": "in-progress"
  }'
```

**Move task:**
```bash
curl -X PATCH http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000/move \
  -H "Content-Type: application/json" \
  -d '{"status": "done"}'
```

**Delete task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/550e8400-e29b-41d4-a716-446655440000
```

**Export as JSON:**
```bash
curl http://localhost:3000/api/export/json -o tasks.json
```

**Export as Markdown:**
```bash
curl http://localhost:3000/api/export/markdown -o tasks.md
```

---

### JavaScript/TypeScript Example

```typescript
const API_BASE = 'http://localhost:3000';

// Create a task
async function createTask() {
  const response = await fetch(`${API_BASE}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'New marketing task',
      category: 'marketing',
      assignee: 'Arun',
      priority: 'high',
      status: 'backlog',
    }),
  });
  
  const data = await response.json();
  return data.data;
}

// Get all tasks
async function getTasks() {
  const response = await fetch(`${API_BASE}/api/tasks`);
  const data = await response.json();
  return data.data;
}

// Update task
async function updateTask(id: string, updates: Partial<Task>) {
  const response = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  const data = await response.json();
  return data.data;
}
```

---

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Full CRUD operations for tasks
- Export functionality (JSON, Markdown)
- Neon PostgreSQL integration
- Drizzle ORM implementation

---

For more information, see the [main README](./README.md) or contact the development team.
