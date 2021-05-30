# DevConnector

Blog app for developers where users are able to create a profile, create posts and interact with other developers.

Check the demo hosted on https://filipe-dev-connector.herokuapp.com/

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

Create .env file at the root of the project to set the following environment variables

```bash
$ GITHUB_CLIENT_ID=
$ GITHUB_SECRET=
$ JWT_SECRET=
$ MONGO_URI=
```

Run project from main folder

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

The REST API is described below.

## Register User

### Request

```bash
POST /api/users HTTP/1.1
Host: localhost:5000
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

## Login User

### Request

```bash
POST /api/auth HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 52

{
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA4OTY0OCwiZXhwIjoxNjE4MTI1NjQ4fQ.He5BsHgc9O6-zQxuHgi7xm3cBCPJqafQs-2iL--cABo"
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
            "msg": "Invalid credentials!"
        }
    ]
}
```

## Get Auth User

### Request

```bash
GET /api/auth HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA4OTY0OCwiZXhwIjoxNjE4MTI1NjQ4fQ.He5BsHgc9O6-zQxuHgi7xm3cBCPJqafQs-2iL--cABo
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 199

{
    "_id": "607215d5dc3f813bb0bd9dc0",
    "name": "Foo",
    "email": "foo@gmail.com",
    "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm",
    "date": "2021-04-10T21:17:09.135Z",
    "__v": 0
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Create and Update Profile

### Request

```bash
POST /api/profile HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
Content-Type: application/json
Content-Length: 455

{
    "company": "Sel Employed",
    "status": "Developer",
    "website": "foo.com",
    "skills": "Html, CSS, JS, C#, React",
    "location": "Washington, DC",
    "bio": "Self Employed Developer",
    "githubusername": "foo",
    "instagram": "https://www.instagram.com/foo",
    "facebook": "https://www.facebook.com/foo",
    "youtube": "https://www.youtube.com/foo",
    "twitter": "https://www.twitter.com/foo",
    "linkedin": "https://www.linkedin.com/foo"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 544

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": "6071c91910203d9080e04df2",
    "__v": 0,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [],
    "experience": [],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 142

{
    "errors": [
        {
            "msg": "Status is required.",
            "param": "status",
            "location": "body"
        },
        {
            "msg": "Skills is required.",
            "param": "skills",
            "location": "body"
        }
    ]
}
```

## Get Logged in Profile

### Request

```bash
GET /api/profile/me HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 657

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": {
        "_id": "6071c91910203d9080e04df2",
        "name": "Test User",
        "avatar": "//www.gravatar.com/avatar/e1128bc3a06f4735b039c9a60ba7c445?s=200&r=pg&d=mm"
    },
    "__v": 0,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [],
    "experience": [],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Add Experience

### Request

```bash
PUT /api/profile/experience HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
Content-Type: application/json
Content-Length: 127

{
	"title": "Developer",
	"company": "foo",
	"location": "USA",
	"from": "5-10-2020",
	"current": true,
	"description": "foo"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 700

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": "6071c91910203d9080e04df2",
    "__v": 1,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [],
    "experience": [
        {
            "current": true,
            "_id": "60721acddc3f813bb0bd9dc2",
            "title": "Developer",
            "company": "foo",
            "location": "USA",
            "from": "2020-05-10T04:00:00.000Z",
            "description": "foo"
        }
    ],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 208

{
    "errors": [
        {
            "msg": "Title is required.",
            "param": "title",
            "location": "body"
        },
        {
            "msg": "Company is required.",
            "param": "company",
            "location": "body"
        },
        {
            "msg": "From date is required.",
            "param": "from",
            "location": "body"
        }
    ]
}
```

## Delete Experience

### Request

```bash
DELETE /api/profile/experience/:experienceId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 743

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": "6071c91910203d9080e04df2",
    "__v": 3,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [
        {
            "current": false,
            "_id": "60721b92dc3f813bb0bd9dc3",
            "school": "foo",
            "degree": "foo",
            "fieldofstudy": "Web Development",
            "from": "2009-01-01T05:00:00.000Z",
            "to": "2018-12-30T05:00:00.000Z",
            "description": "foo"
        }
    ],
    "experience": [],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Add Education

### Request

```bash
PUT /api/profile/education HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
Content-Type: application/json
Content-Length: 139

{
	"school": "foo",
	"degree": "foo",
	"fieldofstudy": "Web Development",
	"from": "1-1-2009",
	"to": "12-30-2018",
	"description": "foo"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 899

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": "6071c91910203d9080e04df2",
    "__v": 2,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [
        {
            "current": false,
            "_id": "60721b92dc3f813bb0bd9dc3",
            "school": "foo",
            "degree": "foo",
            "fieldofstudy": "Web Development",
            "from": "2009-01-01T05:00:00.000Z",
            "to": "2018-12-30T05:00:00.000Z",
            "description": "foo"
        }
    ],
    "experience": [
        {
            "current": true,
            "_id": "60721acddc3f813bb0bd9dc2",
            "title": "Developer",
            "company": "foo",
            "location": "USA",
            "from": "2020-05-10T04:00:00.000Z",
            "description": "foo"
        }
    ],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 287

{
    "errors": [
        {
            "msg": "School is required.",
            "param": "school",
            "location": "body"
        },
        {
            "msg": "Degree is required.",
            "param": "degree",
            "location": "body"
        },
        {
            "msg": "Field of study is required.",
            "param": "fieldofstudy",
            "location": "body"
        },
        {
            "msg": "From date is required.",
            "param": "from",
            "location": "body"
        }
    ]
}
```

## Delete Education

### Request

```bash
DELETE /api/profile/education/:educationId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 544

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "6071c95410203d9080e04df3",
    "user": "6071c91910203d9080e04df2",
    "__v": 4,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T15:50:44.218Z",
    "education": [],
    "experience": [],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Delete Profile & User

### Request

```bash
DELETE /api/profile HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MWM5MTkxMDIwM2Q5MDgwZTA0ZGYyIn0sImlhdCI6MTYxODA2OTgwMiwiZXhwIjoxNjE4MTA1ODAyfQ.cU3L0gjvwPLs9Av9FPTE7m-7dzrJsohv5-LOBZEY3kQ
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 23

{
    "msg": "User removed."
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Get all Profiles

### Request

```bash
GET /api/profile HTTP/1.1
Host: localhost:5000
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 653

[
    {
        "social": {
            "youtube": "https://youtube.com/foo",
            "twitter": "https://twitter.com/foo",
            "instagram": "https://instagram.com/foo",
            "linkedin": "https://linkedin.com/foo",
            "facebook": "https://facebook.com/foo"
        },
        "skills": [
            " Html",
            " CSS",
            " JS",
            " C#",
            " React"
        ],
        "_id": "607220afdc3f813bb0bd9dc4",
        "user": {
            "_id": "607215d5dc3f813bb0bd9dc0",
            "name": "Foo",
            "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm"
        },
        "__v": 0,
        "bio": "Self Employed Developer",
        "company": "Sel Employed",
        "date": "2021-04-10T22:03:27.568Z",
        "education": [],
        "experience": [],
        "githubusername": "foo",
        "location": "Washington, DC",
        "status": "Developer",
        "website": "https://foo.com"
    }
]
```

## Get Profile by User Id

### Request

```bash
GET /api/profile/user/:userId HTTP/1.1
Host: localhost:5000
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 651

{
    "social": {
        "youtube": "https://youtube.com/foo",
        "twitter": "https://twitter.com/foo",
        "instagram": "https://instagram.com/foo",
        "linkedin": "https://linkedin.com/foo",
        "facebook": "https://facebook.com/foo"
    },
    "skills": [
        " Html",
        " CSS",
        " JS",
        " C#",
        " React"
    ],
    "_id": "607220afdc3f813bb0bd9dc4",
    "user": {
        "_id": "607215d5dc3f813bb0bd9dc0",
        "name": "Foo",
        "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm"
    },
    "__v": 0,
    "bio": "Self Employed Developer",
    "company": "Sel Employed",
    "date": "2021-04-10T22:03:27.568Z",
    "education": [],
    "experience": [],
    "githubusername": "foo",
    "location": "Washington, DC",
    "status": "Developer",
    "website": "https://foo.com"
}
```

### Failed Response

```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 28

{
    "msg": "Profile not found."
}
```

## Get Github Repos

### Request

```bash
GET /api/profile/github/:githubUserName HTTP/1.1
Host: localhost:5000
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 2

[]
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 34

{
    "msg": "No Github profile found."
}
```

## Add Post

### Request

```bash
POST /api/posts HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5MjE1NiwiZXhwIjoxNjE4MTI4MTU2fQ.dAOuZsxV9McpsmcibHXzpV2LDE-iaNs9tgEalby-jI4
Content-Type: application/json
Content-Length: 18

{
	"text": "foo"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 247

{
    "_id": "6072281d233211943495cc55",
    "text": "foo",
    "name": "Foo",
    "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm",
    "user": "607215d5dc3f813bb0bd9dc0",
    "likes": [],
    "comments": [],
    "date": "2021-04-10T22:35:09.354Z",
    "__v": 0
}
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Get all Posts

### Request

```bash
GET /api/posts HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 249

[
    {
        "_id": "6072281d233211943495cc55",
        "text": "foo",
        "name": "Foo",
        "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm",
        "user": "607215d5dc3f813bb0bd9dc0",
        "likes": [],
        "comments": [],
        "date": "2021-04-10T22:35:09.354Z",
        "__v": 0
    }
]
```

### Failed Response

```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: 29

{
    "msg": "Token is not valid!"
}
```

## Get Post by Id

### Request

```bash
GET /api/posts/:postId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 247

{
    "_id": "6072281d233211943495cc55",
    "text": "foo",
    "name": "Foo",
    "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm",
    "user": "607215d5dc3f813bb0bd9dc0",
    "likes": [],
    "comments": [],
    "date": "2021-04-10T22:35:09.354Z",
    "__v": 0
}
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 25

{
    "msg": "Post not found!"
}
```

## Like a Post

### Request

```bash
PUT /api/posts/like/:postId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 70

[
    {
        "_id": "607229ea233211943495cc56",
        "user": "607215d5dc3f813bb0bd9dc0"
    }
]
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 25

{
    "msg": "Post not found!"
}
```

## Unlike a Post

### Request

```bash
PUT /api/posts/unlike/:postId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 2

[]
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 25

{
    "msg": "Post not found!"
}
```

## Add Comment to Post

### Request

```bash
POST /api/posts/comment/:postId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
Content-Type: application/json
Content-Length: 18

{
	"text": "foo"
}
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 216

[
    {
        "_id": "60722aaf233211943495cc57",
        "text": "foo",
        "name": "Foo",
        "avatar": "//www.gravatar.com/avatar/6c0fbec2cc554c35c3d2b8b51840b49d?s=200&r=pg&d=mm",
        "user": "607215d5dc3f813bb0bd9dc0",
        "date": "2021-04-10T22:46:07.800Z"
    }
]
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 25

{
    "msg": "Post not found!"
}
```

## Delete Comment

### Request

```bash
DELETE /api/posts/comment/:postId/:commentId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 2

[]
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 28

{
    "msg": "Comment not found."
}
```

## Remove Post

### Request

```bash
DELETE /api/posts/:postId HTTP/1.1
Host: localhost:5000
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3MjE1ZDVkYzNmODEzYmIwYmQ5ZGMwIn0sImlhdCI6MTYxODA5NDI5NSwiZXhwIjoxNjE4MTMwMjk1fQ.WatLaJ52zp2Z4foXia3I8vWrFKMYAZ368I2BZnIuo44
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 23

{
    "msg": "Post removed."
}
```

### Failed Response

```bash
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 25

{
    "msg": "Post not found!"
}
```
