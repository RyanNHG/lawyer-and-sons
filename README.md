# Lawyer and Sons
> An attempt to make web development amazing, because love.

### Overview

This is a website powered by _[KeystoneJS](http://www.keystonejs.com)_, _[MongoDB](http://www.mongodb.com)_, all contained in an isolated [Docker](http://www.docker.com) environment.

One of the benefits of using __Docker__ for local development, is that it takes care of creating the NodeJS and MongoDB services for you. No more worrying about following a complicated setup steps just to get up and running.

One command (`docker-compose up`) will create your own local KeystoneJS server, MongoDB database, and __automatically__ updates the site whenever you save a file.

#### No need to worry about:
- Installing MongoDB or NodeJS (and worrying about the right versions)

- Manually restarting your server after updating `models` or `routes`. 

- Compiling `SASS` files (happens automatically)

- Worrying about environment variables (project works right out of the box)

- Commiting generated files to the repo

- Running `gulp`, `browserify`, `nodemon`, or `browsersync`!

- Getting database backups (local db is automatically filled with sample data)


All that stuff is repetitive and tedious computer work.

Just focus on the _human_ part: __Actually writing code.__

### Get Started
1. Install [Docker](http://www.docker.com)
1. Run `docker-compose up`
1. Your site is ready on port `3000`!

#### Signing in to KeystoneJS
> For local development, an account has been created for you.

__Username__: `admin@keystone.com`

__Password__: `password`

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


### Navigating around

What's great about NodeJS is that you can follow everything by starting in the __`app.js`__. 

There are no hidden configuration files to worry about.

Keep an eye out for the __`require`__ method, which will lead you right to the file with the code.

__What does `require()` do?__

Here's a simple example:

__`app.js`__

```js
var someString = require('./exportsSomeString.js');

console.log(string);
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
