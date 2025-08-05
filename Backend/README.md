# User Registration Endpoint Documentation

## Endpoint

`POST /users/register`

## Description
Registers a new user in the system. Validates user input and creates a user account if the data is valid.

## Request Body
The endpoint expects a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 2 chars)",
    "lastname": "string (min 2 chars)"
  },
  "email": "string (valid email, min 5 chars)",
  "password": "string (min 6 chars)"
}
```

### Example
```
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Validation
- `email`: Must be a valid email address.
- `fullname.firstname`: Minimum 2 characters.
- `fullname.lastname`: Minimum 2 characters.
- `password`: Minimum 6 characters.

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "user": {
      "_id": "<user id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field name",
        "location": "body"
      }
      // ...more errors
    ]
  }
  ```

### Missing Fields
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "All fields are required"
      }
    ]
  }
  ```

## Notes
- Passwords are securely hashed before storing.
- The response includes a JWT token for authentication.
