# DevConnector

Blog app for developers where users are able to create a profile, create posts and interact with
other developers.

Check the demo hosted on https://filipe-dev-connector.herokuapp.com/

---

## Instructions

First clone this repository.

```bash
$ git clone https://github.com/filipeqs/dev-connector.git
```

Install dependencies on both Server and Client. Make sure you already have
[`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) installed in your system.

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

-   Register & Login.
-   Create & Edit Profile with Experiences and Educations.
-   Create Posts.
-   Comment on others Posts.
-   See list of Developers registered on the App.

## Screenshot

![GitHub Logo](/devconnector.png)
