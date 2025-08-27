# User Endpoints Documentation

## Endpoint


### Register
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


---

### Login
`POST /users/login`

## Description
Authenticates a user and returns a JWT token if credentials are valid.

## Request Body
The endpoint expects a JSON object with the following structure:

```
{
  "email": "string (valid email)",
  "password": "string"
}
```

### Example
```
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

## Validation
- `email`: Must be a valid email address.
- `password`: Required.

## Responses

### Success
- **Status Code:** `200 OK`
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

### User Not Found
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "User not found"
  }
  ```

### Invalid Password
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid Password"
  }
  ```

## Notes
- The response includes a JWT token for authentication.

---

### Profile
`GET /users/profile`

## Description
Returns the authenticated user's profile information.

## Authentication
Requires a valid JWT token (sent via Authorization header or cookie).

## Request
No request body required. Token must be provided.

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### Logout
`GET /users/logout`

## Description
Logs out the authenticated user by clearing the JWT token and blacklisting it.

## Authentication
Requires a valid JWT token (sent via Authorization header or cookie).

## Request
No request body required. Token must be provided.

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

### Captain Register
`POST /captains/register`

## Description
Registers a new captain (driver) in the system. Validates input and creates a captain account if the data is valid.

## Request Body
The endpoint expects a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "string (min 2 chars)",
    "lastname": "string (min 2 chars)"
  },
  "email": "string (valid email, min 5 chars)",
  "password": "string (min 6 chars)",
  "vechicle": {
    "color": "string (min 2 chars)",
    "plate": "string (min 3 chars)",
    "capacity": "integer (min 1)",
    "type": "string (car, motorcycle, auto)"
  }
}
```

### Example
```
{
  "fullname": {
    "firstname": "Alice",
    "lastname": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "strongPassword123",
  "vechicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "type": "car"
  }
}
```

## Validation
- `email`: Must be a valid email address.
- `fullname.firstname`: Minimum 2 characters.
- `fullname.lastname`: Minimum 2 characters.
- `password`: Minimum 6 characters.
- `vechicle.color`: Minimum 2 characters.
- `vechicle.plate`: Minimum 3 characters.
- `vechicle.capacity`: Integer, minimum 1.
- `vechicle.type`: Must be one of `car`, `motorcycle`, or `auto`.

## Responses

### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vechicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
      }
      // other captain fields
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

### Captain Already Exists
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

## Notes
- Passwords are securely hashed before storing.
- The response includes a JWT token for authentication.

---

### Captain Login
`POST /captains/login`

## Description
Authenticates a captain and returns a JWT token if credentials are valid.

## Request Body
The endpoint expects a JSON object with the following structure:

```
{
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

### Example
```
{
  "email": "alice.smith@example.com",
  "password": "strongPassword123"
}
```

## Validation
- `email`: Must be a valid email address.
- `password`: Minimum 6 characters.

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<JWT token>",
    "captain": {
      "_id": "<captain id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vechicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "type": "car"
      }
      // other captain fields
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

### Invalid Email
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Invalid email"
  }
  ```

### Invalid Password
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Invalid password"
  }
  ```

## Notes
- The response includes a JWT token for authentication.

---

### Captain Profile
`GET /captains/profile`

## Description
Returns the authenticated captain's profile information.

## Authentication
Requires a valid JWT token (sent via Authorization header or cookie).

## Request
No request body required. Token must be provided.

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<captain id>",
    "fullname": {
      "firstname": "Alice",
      "lastname": "Smith"
    },
    "email": "alice.smith@example.com",
    "vechicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "type": "car"
    }
    // other captain fields
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorizied access"
  }
  ```

---

### Captain Logout
`GET /captains/logout`

## Description
Logs out the authenticated captain by clearing the JWT token and blacklisting it.

## Authentication
Requires a valid JWT token (sent via Authorization header or cookie).

## Request
No request body required. Token must be provided.

## Responses

### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logout successfully"
  }
  ```

### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorizied access"
  }
  ```

---

### Map Endpoints

#### Get Coordinates
`GET /maps/get-coordinate`

**Description:** Returns the geographic coordinates (latitude and longitude) for a given address using the Google Maps API.

**Query Parameters:**
- `address` (string): The address to be geocoded. Must be at least 3 characters long.

**Responses:**

- **Success**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "lat": <latitude>,
      "lng": <longitude>
    }
    ```

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [
        { "msg": "Error message", "param": "address", "location": "query" }
      ]
    }
    ```

- **Not Found/Error**
  - **Status Code:** `404 Not Found`
  - **Body:**
    ```json
    { "message": "Coordinates not found" }
    ```

---

#### Get Distance & Time
`GET /maps/get-distance-time`

**Description:** Returns the travel distance and estimated time between two locations.

**Query Parameters:**
- `origin` (string): The starting location. Must be at least 3 characters long.
- `destination` (string): The destination location. Must be at least 3 characters long.

**Responses:**

- **Success**
  - **Status Code:** `200 OK`
  - **Body:** Example response:
    ```json
    {
      "distance": "10 km",
      "duration": "15 mins"
    }
    ```

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    { "errors": [ { "msg": "Error message", "param": "origin/destination", "location": "query" } ] }
    ```

- **Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Body:**
    ```json
    { "message": "Internal server error" }
    ```

---

#### Get Suggestions
`GET /maps/get-suggestion`

**Description:** Returns location suggestions based on a partial input.

**Query Parameters:**
- `input` (string): The text input to search for suggestions. Must be at least 1 character long.

**Responses:**

- **Success**
  - **Status Code:** `200 OK`
  - **Body:** Example response:
    ```json
    {
      "suggestions": [
        "Location 1",
        "Location 2",
        "Location 3"
      ]
    }
    ```

- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    { "errors": [ { "msg": "Error message", "param": "input", "location": "query" } ] }
    ```

- **Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Body:**
    ```json
    { "message": "Internal server error" }
    ```

---

### Ride Endpoints

#### Create Ride
`POST /rides/create`

**Description:** Creates a new ride for the authenticated user.

**Authentication:** Requires a valid JWT token (sent via Authorization header or cookie).

**Request Body:**
```
{
  "pickup": "string (min 3 chars)",
  "destination": "string (min 3 chars)",
  "vehicleType": "string (car, motorcycle, auto)"
}
```

**Example:**
```
{
  "pickup": "Sector 18, Noida",
  "destination": "Connaught Place, Delhi",
  "vehicleType": "car"
}
```

**Validation:**
- `pickup`: Must be a string, minimum 3 characters.
- `destination`: Must be a string, minimum 3 characters.
- `vehicleType`: Must be one of `car`, `motorcycle`, or `auto`.

**Responses:**
- **Success**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "_id": "<ride id>",
      "user": "<user id>",
      "pickup": "Sector 18, Noida",
      "destination": "Connaught Place, Delhi",
      "vehicleType": "car"
      // other ride fields
    }
    ```
- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [ { "msg": "Error message", "param": "field name", "location": "body" } ]
    }
    ```
- **Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Body:**
    ```json
    { "message": "Internal server error" }
    ```

---

#### Get Fare
`GET /rides/get-fare`

**Description:** Returns the estimated fare for a ride between two locations for the authenticated user.

**Authentication:** Requires a valid JWT token (sent via Authorization header or cookie).

**Query Parameters:**
- `pickup` (string): The pickup location. Must be at least 3 characters long.
- `destination` (string): The destination location. Must be at least 3 characters long.

**Responses:**
- **Success**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "fare": 250,
      "currency": "INR"
    }
    ```
- **Validation Error**
  - **Status Code:** `400 Bad Request`
  - **Body:**
    ```json
    {
      "errors": [ { "msg": "Error message", "param": "pickup/destination", "location": "query" } ]
    }
    ```
- **Server Error**
  - **Status Code:** `500 Internal Server Error`
  - **Body:**
    ```json
    { "message": "Internal server error" }
    ```