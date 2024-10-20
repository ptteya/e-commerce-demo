# Table of Contents

 1. [Authentication Routes](#authentication-routes)
    - [Register](#register)
    - [Login](#login)
    - [Logout](#logout)
    - [Get User Data](#get-user-data)
    - [Authorized Requests](#authorized-requests)
2. [User Collection Routes](#user-collection-routes)
    - [Add Furniture](#add-furniture)
    - [Update Furniture Quantity](#update-furniture-quantity)
    - [Delete Furniture](#delete-furniture)
    - [Empty Collection](#empty-collection)
3. [Admin Routes](#admin-routes)
    - [Retrieve All Users](#retrieve-all-users)
    - [Toggle User Role](#toggle-user-role)
4. [Furniture Routes](#furniture-routes)
    - [Create](#create)
    - [Read](#read)
    - [Update](#update)
    - [Delete](#delete)
    - [Get Furniture Details](#get-furniture-details)

  
## Authentication Routes

### Register

To create a new user account, make a `POST` request to `/users/register`.

**Request Body Example**:

```json
{
  "email": "user@example.com",
  "username": "your_username",
  "password": "your_password",
  "repeatPass": "your_password"
}
```

**Response Example**:  On success, the service will respond with a JSON object containing a `data` key, which includes the user data and an access token.
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "your_username",
      "role": "user",
      "cart": [],
      "favorites": [],
      "token": "jwt_token"
    }
}
```
### Login
To log in an existing user account, make a `POST` request to `/users/login`

**Request Body Example**:

  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
```

**Response Example**:  Upon successful authentication, the service will respond with a JSON object containing a `data`  key, which includes the user data and an access token.
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "your_username",
      "role": "user",
      "cart": [],
      "favorites": [],
      "token": "jwt_token"
    }
}
```

### Logout
To log out an authenticated user, send an authorized  `GET` request to `/users/logout`. On success, the service will respond with a 204 No Content status.

### Get User Data
To retrieve the current user's information, send an authorized  `GET` request to `/users/me`. The service will respond with a JSON object containing a `data` key, which includes the user data.

### Authorized Requests
To make an authorized request to the API, include the following header in your request, where `{token}` is the JWT access token returned by the server after a successful login or registration:
```
Authorization: {token}
```

## User Collection Routes

### Add Furniture
To add an furniture to a user's collection (favorites or cart) send an authorized  `POST` request to `/users/:collection`.

**Request Body Example**:
```json
{
  "userId": "user123",
  "furnitureId": "furniture123",
  "quantity": 1 
}
```

> **Note:** The quantity is optional and relevant only for cart-related requests.


**Response Example** 
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  data: [{
      furnitureId: "670800e19923b3bbe5c8fa23",
      quantity: 1,
       _id: "670ce53a73ed71bfe1286fd2"
  }]
}
```
### Update Furniture Quantity
Send an authorized `PATCH` request to `/users/:collection/:furnitureId`. This is applicable only for updating the quantity in the cart collection.

**Request Body Example**:
```json
{
  "userId": "user123",
  "quantity": 2
}
```

**Response Example**
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  data: [{
    furnitureId: "670800e19923b3bbe5c8fa1e",
    quantity: 2,
    _id: "670ce3fd73ed71bfe1286fbf"
  }]
}
```

### Delete Furniture
To delete furniture from a user's collection, send an authorized `DELETE` request to `/users/:collection/:furnitureId`.

**Request Body Example**:

```json
{
  "userId": "user_id"
}
```

**Response**: The response contains a `data` key, which includes the updated collection.

### Empty Collection
To empty a specific collection (favorites or cart), send an authorized `DELETE` request to `/users/:collectionName`

**Request Body Example**:

```json
{
  "userId": "user_id"
}
```
**Response**: The service will respond with a 204 No Content status.

## Admin Routes

### Retrieve All Users
To get a list with all users, send a `GET` request to `/admin/users`. 

> **Note:**  This request requires admin authentication.

**Response Example**: The response contains a `data` key, which holds an array of user objects. 
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": [{
      "_id": "6712198f84b90321bb2d81e2",
      "email": "peter@abv.bg",
      "username": "peter",
      "role": "user",
      "cart": [],
      "favorites": []
    }]
}
```

### Toggle user role
To promote or demote a user between admin and user roles, send a `PATCH` request to `/admin/users/role` The response contains a `data` key, which includes the updated user.

> **Note:**  This request requires admin authentication.

## Furniture Routes

### Create 

To create a new furniture item send a `POST` request to `/furniture`. 

> **Note:**  This request requires admin authentication.

**Request Body**
```json
{
    "name": "Sofa",
    "price": 299.99,
    "description": "A comfortable red sofa for your living room.",
    "category": "Living Room",
    "material": "Fabric",
    "color": "Red",
    "size": {
        "width": 200,
        "height": 90,
        "length": 300
    },
    "images": {
        "mainImage": "http://example.com/sofa-main.jpg",
        "extraImage1": "http://example.com/sofa-side.jpg",
        "extraImage2": "http://example.com/sofa-back.jpg",
        "extraImage3": "http://example.com/sofa-detail.jpg"
    }
}
```
**Response**: The response is a JSON object containing a `data` key, which includes the created furniture data.

### Read 
To get a list of all furniture items, send a `GET` request to `/furniture`. It supports optional query parameters for filtering:

| Parameter     | Type    | Description                                              |
|---------------|---------|------------------------------------------------------|
| `category`    | String  | Filter furniture by category (e.g., "lamps").      |
| `searchQuery` | String  | Full-text search for furniture items (e.g., "Lamp Lucina"). |
| `minPrice`    | Number  | Minimum price filter for furniture items.            |
| `maxPrice`    | Number  | Maximum price filter for furniture items.            |
| `color`       | String  | Filter furniture by color (e.g., "beige").             |

**Example Request**: 
```http
GET /furniture?category=lamps&minPrice=50&maxPrice=100&color=beige
```

**Response Example**: The service will respond with a JSON object containing a `data` key, which is an array of  furniture items.
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "data": [
      {
        "_id": "lamp12345",
        "name": "Beige Lamp",
        "price": 75,
        "description": "A stylish beige lamp that adds warmth and elegance to any room.",
        "category": "lamps",
        "material": "Linen, Metal",
        "color": "beige",
        "size": {
          "width": 30,
          "height": 50,
          "length": 30
        },
        "images": {
          "mainImage": "/images/lamps/beige-lamp-main.png",
          "extraImage1": "/images/lamps/beige-lamp-side.png",
          "extraImage2": "/images/lamps/beige-lamp-top.png"
        },
        "rating": 4.3
      }
    ]
}
```

### Update 

To update the details of an existing furniture item, send a `PUT` request to `/furniture/:furnitureId` with the new furniture data. The response is a JSON object containing a `data` key, which includes the updated data.

> **Note:**  This request requires admin authentication.

### Delete

To delete a specific furniture item, send a `DELETE` request to `/furniture/:furnitureId`. The service will respond with a 204 No Content status. 

> **Note:**  This request requires admin authentication.

### Get Furniture Details
To retrieve a detailed information about a specific furniture item, send a `GET` request to `/furniture/:furnitureId`.
