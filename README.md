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
DELETE /api/profile/experience/60721acddc3f813bb0bd9dc2 HTTP/1.1
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
DELETE /api/profile/education/60721b92dc3f813bb0bd9dc3 HTTP/1.1
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
GET /api/profile/user/607215d5dc3f813bb0bd9dc0 HTTP/1.1
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
GET /api/profile/github/foo HTTP/1.1
Host: localhost:5000
```

### Successful Response

```bash
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 23351

[
    {
        "id": 304905844,
        "node_id": "MDEwOlJlcG9zaXRvcnkzMDQ5MDU4NDQ=",
        "name": "icalp-presentation",
        "full_name": "foo/icalp-presentation",
        "private": false,
        "owner": {
            "login": "foo",
            "id": 33384,
            "node_id": "MDQ6VXNlcjMzMzg0",
            "avatar_url": "https://avatars.githubusercontent.com/u/33384?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/foo",
            "html_url": "https://github.com/foo",
            "followers_url": "https://api.github.com/users/foo/followers",
            "following_url": "https://api.github.com/users/foo/following{/other_user}",
            "gists_url": "https://api.github.com/users/foo/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/foo/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/foo/subscriptions",
            "organizations_url": "https://api.github.com/users/foo/orgs",
            "repos_url": "https://api.github.com/users/foo/repos",
            "events_url": "https://api.github.com/users/foo/events{/privacy}",
            "received_events_url": "https://api.github.com/users/foo/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/foo/icalp-presentation",
        "description": null,
        "fork": false,
        "url": "https://api.github.com/repos/foo/icalp-presentation",
        "forks_url": "https://api.github.com/repos/foo/icalp-presentation/forks",
        "keys_url": "https://api.github.com/repos/foo/icalp-presentation/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/foo/icalp-presentation/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/foo/icalp-presentation/teams",
        "hooks_url": "https://api.github.com/repos/foo/icalp-presentation/hooks",
        "issue_events_url": "https://api.github.com/repos/foo/icalp-presentation/issues/events{/number}",
        "events_url": "https://api.github.com/repos/foo/icalp-presentation/events",
        "assignees_url": "https://api.github.com/repos/foo/icalp-presentation/assignees{/user}",
        "branches_url": "https://api.github.com/repos/foo/icalp-presentation/branches{/branch}",
        "tags_url": "https://api.github.com/repos/foo/icalp-presentation/tags",
        "blobs_url": "https://api.github.com/repos/foo/icalp-presentation/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/foo/icalp-presentation/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/foo/icalp-presentation/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/foo/icalp-presentation/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/foo/icalp-presentation/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/foo/icalp-presentation/languages",
        "stargazers_url": "https://api.github.com/repos/foo/icalp-presentation/stargazers",
        "contributors_url": "https://api.github.com/repos/foo/icalp-presentation/contributors",
        "subscribers_url": "https://api.github.com/repos/foo/icalp-presentation/subscribers",
        "subscription_url": "https://api.github.com/repos/foo/icalp-presentation/subscription",
        "commits_url": "https://api.github.com/repos/foo/icalp-presentation/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/foo/icalp-presentation/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/foo/icalp-presentation/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/foo/icalp-presentation/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/foo/icalp-presentation/contents/{+path}",
        "compare_url": "https://api.github.com/repos/foo/icalp-presentation/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/foo/icalp-presentation/merges",
        "archive_url": "https://api.github.com/repos/foo/icalp-presentation/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/foo/icalp-presentation/downloads",
        "issues_url": "https://api.github.com/repos/foo/icalp-presentation/issues{/number}",
        "pulls_url": "https://api.github.com/repos/foo/icalp-presentation/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/foo/icalp-presentation/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/foo/icalp-presentation/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/foo/icalp-presentation/labels{/name}",
        "releases_url": "https://api.github.com/repos/foo/icalp-presentation/releases{/id}",
        "deployments_url": "https://api.github.com/repos/foo/icalp-presentation/deployments",
        "created_at": "2020-10-17T15:15:36Z",
        "updated_at": "2020-10-17T15:17:16Z",
        "pushed_at": "2020-10-17T15:17:13Z",
        "git_url": "git://github.com/foo/icalp-presentation.git",
        "ssh_url": "git@github.com:foo/icalp-presentation.git",
        "clone_url": "https://github.com/foo/icalp-presentation.git",
        "svn_url": "https://github.com/foo/icalp-presentation",
        "homepage": null,
        "size": 1455,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "TeX",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
    },
    {
        "id": 296569400,
        "node_id": "MDEwOlJlcG9zaXRvcnkyOTY1Njk0MDA=",
        "name": "typing",
        "full_name": "foo/typing",
        "private": false,
        "owner": {
            "login": "foo",
            "id": 33384,
            "node_id": "MDQ6VXNlcjMzMzg0",
            "avatar_url": "https://avatars.githubusercontent.com/u/33384?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/foo",
            "html_url": "https://github.com/foo",
            "followers_url": "https://api.github.com/users/foo/followers",
            "following_url": "https://api.github.com/users/foo/following{/other_user}",
            "gists_url": "https://api.github.com/users/foo/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/foo/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/foo/subscriptions",
            "organizations_url": "https://api.github.com/users/foo/orgs",
            "repos_url": "https://api.github.com/users/foo/repos",
            "events_url": "https://api.github.com/users/foo/events{/privacy}",
            "received_events_url": "https://api.github.com/users/foo/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/foo/typing",
        "description": "A collection of texts for touchtyping practice",
        "fork": false,
        "url": "https://api.github.com/repos/foo/typing",
        "forks_url": "https://api.github.com/repos/foo/typing/forks",
        "keys_url": "https://api.github.com/repos/foo/typing/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/foo/typing/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/foo/typing/teams",
        "hooks_url": "https://api.github.com/repos/foo/typing/hooks",
        "issue_events_url": "https://api.github.com/repos/foo/typing/issues/events{/number}",
        "events_url": "https://api.github.com/repos/foo/typing/events",
        "assignees_url": "https://api.github.com/repos/foo/typing/assignees{/user}",
        "branches_url": "https://api.github.com/repos/foo/typing/branches{/branch}",
        "tags_url": "https://api.github.com/repos/foo/typing/tags",
        "blobs_url": "https://api.github.com/repos/foo/typing/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/foo/typing/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/foo/typing/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/foo/typing/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/foo/typing/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/foo/typing/languages",
        "stargazers_url": "https://api.github.com/repos/foo/typing/stargazers",
        "contributors_url": "https://api.github.com/repos/foo/typing/contributors",
        "subscribers_url": "https://api.github.com/repos/foo/typing/subscribers",
        "subscription_url": "https://api.github.com/repos/foo/typing/subscription",
        "commits_url": "https://api.github.com/repos/foo/typing/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/foo/typing/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/foo/typing/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/foo/typing/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/foo/typing/contents/{+path}",
        "compare_url": "https://api.github.com/repos/foo/typing/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/foo/typing/merges",
        "archive_url": "https://api.github.com/repos/foo/typing/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/foo/typing/downloads",
        "issues_url": "https://api.github.com/repos/foo/typing/issues{/number}",
        "pulls_url": "https://api.github.com/repos/foo/typing/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/foo/typing/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/foo/typing/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/foo/typing/labels{/name}",
        "releases_url": "https://api.github.com/repos/foo/typing/releases{/id}",
        "deployments_url": "https://api.github.com/repos/foo/typing/deployments",
        "created_at": "2020-09-18T09:01:17Z",
        "updated_at": "2021-01-10T10:59:10Z",
        "pushed_at": "2021-01-10T10:59:08Z",
        "git_url": "git://github.com/foo/typing.git",
        "ssh_url": "git@github.com:foo/typing.git",
        "clone_url": "https://github.com/foo/typing.git",
        "svn_url": "https://github.com/foo/typing",
        "homepage": null,
        "size": 11,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
    },
    {
        "id": 268566777,
        "node_id": "MDEwOlJlcG9zaXRvcnkyNjg1NjY3Nzc=",
        "name": "cascade",
        "full_name": "foo/cascade",
        "private": false,
        "owner": {
            "login": "foo",
            "id": 33384,
            "node_id": "MDQ6VXNlcjMzMzg0",
            "avatar_url": "https://avatars.githubusercontent.com/u/33384?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/foo",
            "html_url": "https://github.com/foo",
            "followers_url": "https://api.github.com/users/foo/followers",
            "following_url": "https://api.github.com/users/foo/following{/other_user}",
            "gists_url": "https://api.github.com/users/foo/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/foo/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/foo/subscriptions",
            "organizations_url": "https://api.github.com/users/foo/orgs",
            "repos_url": "https://api.github.com/users/foo/repos",
            "events_url": "https://api.github.com/users/foo/events{/privacy}",
            "received_events_url": "https://api.github.com/users/foo/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/foo/cascade",
        "description": "An Integer Program to verify a hypothesis in dynamic graph partitioning problem.",
        "fork": false,
        "url": "https://api.github.com/repos/foo/cascade",
        "forks_url": "https://api.github.com/repos/foo/cascade/forks",
        "keys_url": "https://api.github.com/repos/foo/cascade/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/foo/cascade/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/foo/cascade/teams",
        "hooks_url": "https://api.github.com/repos/foo/cascade/hooks",
        "issue_events_url": "https://api.github.com/repos/foo/cascade/issues/events{/number}",
        "events_url": "https://api.github.com/repos/foo/cascade/events",
        "assignees_url": "https://api.github.com/repos/foo/cascade/assignees{/user}",
        "branches_url": "https://api.github.com/repos/foo/cascade/branches{/branch}",
        "tags_url": "https://api.github.com/repos/foo/cascade/tags",
        "blobs_url": "https://api.github.com/repos/foo/cascade/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/foo/cascade/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/foo/cascade/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/foo/cascade/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/foo/cascade/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/foo/cascade/languages",
        "stargazers_url": "https://api.github.com/repos/foo/cascade/stargazers",
        "contributors_url": "https://api.github.com/repos/foo/cascade/contributors",
        "subscribers_url": "https://api.github.com/repos/foo/cascade/subscribers",
        "subscription_url": "https://api.github.com/repos/foo/cascade/subscription",
        "commits_url": "https://api.github.com/repos/foo/cascade/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/foo/cascade/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/foo/cascade/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/foo/cascade/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/foo/cascade/contents/{+path}",
        "compare_url": "https://api.github.com/repos/foo/cascade/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/foo/cascade/merges",
        "archive_url": "https://api.github.com/repos/foo/cascade/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/foo/cascade/downloads",
        "issues_url": "https://api.github.com/repos/foo/cascade/issues{/number}",
        "pulls_url": "https://api.github.com/repos/foo/cascade/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/foo/cascade/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/foo/cascade/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/foo/cascade/labels{/name}",
        "releases_url": "https://api.github.com/repos/foo/cascade/releases{/id}",
        "deployments_url": "https://api.github.com/repos/foo/cascade/deployments",
        "created_at": "2020-06-01T15:55:47Z",
        "updated_at": "2020-09-15T15:02:19Z",
        "pushed_at": "2020-09-15T15:02:17Z",
        "git_url": "git://github.com/foo/cascade.git",
        "ssh_url": "git@github.com:foo/cascade.git",
        "clone_url": "https://github.com/foo/cascade.git",
        "svn_url": "https://github.com/foo/cascade",
        "homepage": "",
        "size": 22724,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "Python",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
    },
    {
        "id": 265947118,
        "node_id": "MDEwOlJlcG9zaXRvcnkyNjU5NDcxMTg=",
        "name": "virtual-cluster",
        "full_name": "foo/virtual-cluster",
        "private": false,
        "owner": {
            "login": "foo",
            "id": 33384,
            "node_id": "MDQ6VXNlcjMzMzg0",
            "avatar_url": "https://avatars.githubusercontent.com/u/33384?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/foo",
            "html_url": "https://github.com/foo",
            "followers_url": "https://api.github.com/users/foo/followers",
            "following_url": "https://api.github.com/users/foo/following{/other_user}",
            "gists_url": "https://api.github.com/users/foo/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/foo/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/foo/subscriptions",
            "organizations_url": "https://api.github.com/users/foo/orgs",
            "repos_url": "https://api.github.com/users/foo/repos",
            "events_url": "https://api.github.com/users/foo/events{/privacy}",
            "received_events_url": "https://api.github.com/users/foo/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/foo/virtual-cluster",
        "description": "Virtual cluster embeddings",
        "fork": false,
        "url": "https://api.github.com/repos/foo/virtual-cluster",
        "forks_url": "https://api.github.com/repos/foo/virtual-cluster/forks",
        "keys_url": "https://api.github.com/repos/foo/virtual-cluster/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/foo/virtual-cluster/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/foo/virtual-cluster/teams",
        "hooks_url": "https://api.github.com/repos/foo/virtual-cluster/hooks",
        "issue_events_url": "https://api.github.com/repos/foo/virtual-cluster/issues/events{/number}",
        "events_url": "https://api.github.com/repos/foo/virtual-cluster/events",
        "assignees_url": "https://api.github.com/repos/foo/virtual-cluster/assignees{/user}",
        "branches_url": "https://api.github.com/repos/foo/virtual-cluster/branches{/branch}",
        "tags_url": "https://api.github.com/repos/foo/virtual-cluster/tags",
        "blobs_url": "https://api.github.com/repos/foo/virtual-cluster/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/foo/virtual-cluster/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/foo/virtual-cluster/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/foo/virtual-cluster/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/foo/virtual-cluster/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/foo/virtual-cluster/languages",
        "stargazers_url": "https://api.github.com/repos/foo/virtual-cluster/stargazers",
        "contributors_url": "https://api.github.com/repos/foo/virtual-cluster/contributors",
        "subscribers_url": "https://api.github.com/repos/foo/virtual-cluster/subscribers",
        "subscription_url": "https://api.github.com/repos/foo/virtual-cluster/subscription",
        "commits_url": "https://api.github.com/repos/foo/virtual-cluster/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/foo/virtual-cluster/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/foo/virtual-cluster/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/foo/virtual-cluster/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/foo/virtual-cluster/contents/{+path}",
        "compare_url": "https://api.github.com/repos/foo/virtual-cluster/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/foo/virtual-cluster/merges",
        "archive_url": "https://api.github.com/repos/foo/virtual-cluster/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/foo/virtual-cluster/downloads",
        "issues_url": "https://api.github.com/repos/foo/virtual-cluster/issues{/number}",
        "pulls_url": "https://api.github.com/repos/foo/virtual-cluster/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/foo/virtual-cluster/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/foo/virtual-cluster/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/foo/virtual-cluster/labels{/name}",
        "releases_url": "https://api.github.com/repos/foo/virtual-cluster/releases{/id}",
        "deployments_url": "https://api.github.com/repos/foo/virtual-cluster/deployments",
        "created_at": "2020-05-21T20:40:02Z",
        "updated_at": "2020-05-21T20:45:00Z",
        "pushed_at": "2020-05-21T20:44:10Z",
        "git_url": "git://github.com/foo/virtual-cluster.git",
        "ssh_url": "git@github.com:foo/virtual-cluster.git",
        "clone_url": "https://github.com/foo/virtual-cluster.git",
        "svn_url": "https://github.com/foo/virtual-cluster",
        "homepage": null,
        "size": 13755,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "TeX",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master"
    },
    {
        "id": 265944273,
        "node_id": "MDEwOlJlcG9zaXRvcnkyNjU5NDQyNzM=",
        "name": "graph-partitioning",
        "full_name": "foo/graph-partitioning",
        "private": false,
        "owner": {
            "login": "foo",
            "id": 33384,
            "node_id": "MDQ6VXNlcjMzMzg0",
            "avatar_url": "https://avatars.githubusercontent.com/u/33384?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/foo",
            "html_url": "https://github.com/foo",
            "followers_url": "https://api.github.com/users/foo/followers",
            "following_url": "https://api.github.com/users/foo/following{/other_user}",
            "gists_url": "https://api.github.com/users/foo/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/foo/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/foo/subscriptions",
            "organizations_url": "https://api.github.com/users/foo/orgs",
            "repos_url": "https://api.github.com/users/foo/repos",
            "events_url": "https://api.github.com/users/foo/events{/privacy}",
            "received_events_url": "https://api.github.com/users/foo/received_events",
            "type": "User",
            "site_admin": false
        },
        "html_url": "https://github.com/foo/graph-partitioning",
        "description": "Optimal algorithm for Dynamic Balanced Graph Partitioning",
        "fork": false,
        "url": "https://api.github.com/repos/foo/graph-partitioning",
        "forks_url": "https://api.github.com/repos/foo/graph-partitioning/forks",
        "keys_url": "https://api.github.com/repos/foo/graph-partitioning/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/foo/graph-partitioning/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/foo/graph-partitioning/teams",
        "hooks_url": "https://api.github.com/repos/foo/graph-partitioning/hooks",
        "issue_events_url": "https://api.github.com/repos/foo/graph-partitioning/issues/events{/number}",
        "events_url": "https://api.github.com/repos/foo/graph-partitioning/events",
        "assignees_url": "https://api.github.com/repos/foo/graph-partitioning/assignees{/user}",
        "branches_url": "https://api.github.com/repos/foo/graph-partitioning/branches{/branch}",
        "tags_url": "https://api.github.com/repos/foo/graph-partitioning/tags",
        "blobs_url": "https://api.github.com/repos/foo/graph-partitioning/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/foo/graph-partitioning/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/foo/graph-partitioning/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/foo/graph-partitioning/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/foo/graph-partitioning/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/foo/graph-partitioning/languages",
        "stargazers_url": "https://api.github.com/repos/foo/graph-partitioning/stargazers",
        "contributors_url": "https://api.github.com/repos/foo/graph-partitioning/contributors",
        "subscribers_url": "https://api.github.com/repos/foo/graph-partitioning/subscribers",
        "subscription_url": "https://api.github.com/repos/foo/graph-partitioning/subscription",
        "commits_url": "https://api.github.com/repos/foo/graph-partitioning/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/foo/graph-partitioning/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/foo/graph-partitioning/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/foo/graph-partitioning/issues/comments{/number}",
        "contents_url": "https://api.github.com/repos/foo/graph-partitioning/contents/{+path}",
        "compare_url": "https://api.github.com/repos/foo/graph-partitioning/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/foo/graph-partitioning/merges",
        "archive_url": "https://api.github.com/repos/foo/graph-partitioning/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/foo/graph-partitioning/downloads",
        "issues_url": "https://api.github.com/repos/foo/graph-partitioning/issues{/number}",
        "pulls_url": "https://api.github.com/repos/foo/graph-partitioning/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/foo/graph-partitioning/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/foo/graph-partitioning/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/foo/graph-partitioning/labels{/name}",
        "releases_url": "https://api.github.com/repos/foo/graph-partitioning/releases{/id}",
        "deployments_url": "https://api.github.com/repos/foo/graph-partitioning/deployments",
        "created_at": "2020-05-21T20:23:30Z",
        "updated_at": "2020-05-21T21:22:17Z",
        "pushed_at": "2020-05-21T20:24:30Z",
        "git_url": "git://github.com/foo/graph-partitioning.git",
        "ssh_url": "git@github.com:foo/graph-partitioning.git",
        "clone_url": "https://github.com/foo/graph-partitioning.git",
        "svn_url": "https://github.com/foo/graph-partitioning",
        "homepage": "",
        "size": 8531,
        "stargazers_count": 1,
        "watchers_count": 1,
        "language": "TeX",
        "has_issues": true,
        "has_projects": true,
        "has_downloads": true,
        "has_wiki": true,
        "has_pages": false,
        "forks_count": 0,
        "mirror_url": null,
        "archived": false,
        "disabled": false,
        "open_issues_count": 0,
        "license": null,
        "forks": 0,
        "open_issues": 0,
        "watchers": 1,
        "default_branch": "master"
    }
]
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
