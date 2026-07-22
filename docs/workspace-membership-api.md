# Workspace membership API

The mobile client now uses these authenticated endpoints after every sign-in,
MPIN creation, and successful session validation.

## Check access

`GET /api/user/check-group`

Return an active membership only when the user belongs to a Bachatgat or a
Gramsangh. A pending invitation must return `membership: null` (or a
membership with `status: "pending"`), so the dashboard stays unavailable.

```json
{
  "success": true,
  "data": {
    "membership": {
      "id": "membership-id",
      "name": "Mahila Pragati Bachat Gat",
      "type": "bachatgat",
      "status": "active"
    }
  }
}
```

## Create a workspace

`POST /api/groups/bachatgat` and `POST /api/groups/gramsangh`

Both endpoints accept `{ "name": "..." }`, create the caller's active
membership, and return that membership in `data`. They must require the same
Bearer token used for `/user/check-group`.
