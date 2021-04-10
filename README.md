# DevConnector

Blog app for developers where users are able to create a profile, create posts and interect with other developers.

Check the demo hosted on https://filipe-dev-connector.herokuapp.com/.

---

## Instructions

First clone this repository.

```bash
$ git clone https://github.com/filipeqs/dev-connector.git
```

Install dependencies on both Server and Client. Make sure you already have [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

```bash
$ npm install 
$ cd client
$ npm install
```

Run it from maind folder

```bash
$ npm run dev
```

## Features

- Register & Login.
- Create & Edit Profile with Experiences and Educations.
- Create Posts.
- Comment on others Posts.
- See list of Developers registered on the App. 


# REST API

The REST API to the example app is described below.

## Register User

### Request

```bash
POST /api/users HTTP/1.1
Content-Type: application/json
Content-Length: 77

{
	"name": "Foo",
	"email": "foo@gmail.com",
	"password": "123456"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 195

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA4OTQyOSwiZXhwIjoxNjE4MTI1NDI5fQ.uD-Uu-kqhed0NQORKJ8ANjjPuAfOJcYHH4WXDttwRXE"
}
```

### Failed Response

```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 43

{
    "errors": [
        {
            "msg": "User already exists!"
        }
    ]
}
```
