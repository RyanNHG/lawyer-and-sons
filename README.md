# Lawyer and Sons
> A full site build using _[KeystoneJS](http://www.keystonejs.com)_, _[MongoDB](http://www.mongodb.com)_, and [Docker](http://www.docker.com)

### Features

1. Get up-and-running with one command (`docker-compose up`)
1. Runs on all platforms (Windows, Mac, Linux)
1. No need to download/restore database
1. Save the file, refresh the page.

---


### Local Development

1. Install [Docker](http://www.docker.com)
1. Run `docker-compose up`
1. Your site is ready on port `3000`!

---


#### Signing in to KeystoneJS
> For local development, an account has been created for you.

__Username__: `admin@keystone.com`

__Password__: `password`

---


### Customizing your Environment
> Just create a `.env` file in the project root.

__Environment Variable__ | __Description__ | __Example__
------------------------ | --------------- | -----------
__`MONGO_URI`__ |  MongoDB connection string | `mongodb://localhost/db`
__`NODE_ENV`__ | Specifies whether we're running in production or development mode. | `production`
__`CLOUDINARY_URL`__ | Points to the Cloudinary Image service. | `cloudinary://api_key:api_secret@cloud_name`
__`PORT`__ | Which port to host the server on | `3000`
__`COOKIE_SECRET`__ | Used for encryption | `23r2fm24f4fp23f23f`

__Example `.env` file:__

```
MONGO_URI=mongodb://192.168.99.100/some-database
PORT=1234
```
---


### Project Structure

__Item__ | __Description__
---------- | ---------------
__`app.js`__ | Entry point to the app (start here)
__`routes.js`__ | Defines routes for the website
__`routes/`__ | Functions that handle requests, middleware, and responses
__`models/`__ | Stores all the KeystoneJS models
__`views/`__ | Stores layouts, pages, and components used on the site
__`public/`__ | Assets (`sass`, images, etc) for our site
__`logic/`__ | Reusable functionality that is used by multiple routes
__`updates/`__ | Initializes empty databases (no more downloading backups)

---

### Project Overview

After you install Docker and pull this code, you will have everything you need to get started.

Opening up a terminal and typing `docker-compose up` will automatically set up an isolated development environment. This command does a few simple things:

- Creates a local MongoDB container (stores data).
- Creates a local NodeJS container (runs server).
- Connects them together so they can communicate.
- Runs your NodeJS website at http://localhost:3000
  - For Windows 8 users: http://192.168.99.100:3000

When you first run this project, KeystoneJS will automatically create MongoDB collections from the JSON found in the `updates/data` folder. This means there is __no need to download or restore your databases__.

After that, you can login at http://localhost:3000/keystone to manage content, or open up your favorite text editor to start changing code.

When you change a `model` or a `route`, the server will __automatically__ refresh for you.

The server will also refresh if you modify any `logic`, `updates`, or either the `app.js` or `routes.js` files.

For frontend development, we are using Pug templates in place of HTML, and SASS in place of CSS.

Once again, changes to these files will __automatically__ and __immediately__ reflect on page refresh.

Instead of bundling all of our Javascript into one big, minified blob, we are using pug to only include the JS we need for the page.

The JS framework used for this project is VueJS. It is as simple as jQuery with the scalability of React and Angular. Just like our Pug and SASS, any client-side JS changes will automatically appear on the frontend.

Docker made it easy to guarantee a consistent, automated environment. Now you can focus on the human part: __Actually writing code, fixing bugs, and adding features__.

---


### New to NodeJS?

What's great about NodeJS is that you can follow everything by starting in the __`app.js`__.

There are no hidden configuration files to worry about.

Keep an eye out for the __`require`__ method, which will lead you right to the file with the code.

__What does `require()` do?__

Here's a simple example:

__`app.js`__

```js
var someString = require('./exportsSomeString.js');

console.log(someString);
```

__`exportsSomeString.js`__
```js
var hiddenString = "I'm a secret!";
var otherString = "Hello!"

module.exports = otherString;
```

This would output:
```
> Hello!
```

The __`module.exports`__ decides what will be returned when __`require`__ is called.

---

More documentation to come!
