# Messages App

This is a demo app for learning and practice purposes using the MEAN Stack (Mongo, Express, Angular, Node) framework. This project is based on the course taught by Maximilian Schwarzmüller.

The project consist on build a full-stack web application that can manage user sessions and post messages (like a blog) with a title, message and images. This repository contains two apps: the frontend and the backend instances. The frontent covers all the user interface and calls to the server, and is built in typescript using the Angular Framwork. The backend serves and stores all posts through API calls, and is built in javascript using Node-js, Express-js and MongoDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [MongoDB](https://www.mongodb.com/download-center?utm_source=manual&utm_campaign=download-mongodb-navbar-cta&utm_medium=docs#community), [Node.js and NPM](https://nodejs.org/es/download/) and [Angular CLI](https://cli.angular.io/) on your local machine.

Then clone this repository by running the following command

'''bash
> git clone https://github.com/luisbastir/mean-stack-messages.git
> cd mean-stack-messages
'''

### Installing

First you need to get all dependencies by running the follow command

'''bash
> npm install
'''

Before running the servers, run mongoDB on your machine.
To start the frontend server use

'''bash
> ng serve
'''

And to run the backend server use
'''bash
> npm run dev:server
'''

On a web browser, go to [http://localhost:4200/](http://localhost:4200/) and start enjoying the app.

## Built With

* [Angular](https://angular.io/) - Fronend framework
* [Node.js](https://nodejs.org/es/) - Backend server
* [NPM](https://nodejs.org/es/) - Node Package Manager
* [Express.js](https://expressjs.com/es/) - Web Application Framework
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [Mongoose](https://mongoosejs.com/) - MongoDB object modeling and connector for Node.js

## Author

Luis Bastidas
[Github's Profile](https://github.com/luisbastir)

## License

MIT License

Copyright (c) 2018 luisbastir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
