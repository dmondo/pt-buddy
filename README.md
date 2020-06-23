# pt-buddy

A fullstack app built to explore the twilio API. This is a scheduling helper for physical therapists: users may save common exercise reminders and their patients to a persistent profile, as well as set an SMS schedule on which those reminders are released. Node-scheduler then makes calls to the twilio API on that schedule, reminding patients of their exercises on a set interval.


## Tech Stack

This project uses the MERN (MongoDB, ExpressJS, ReactJS, NodeJS) stack. Modules are written in TypeScript, compiled to JavaScript, transpiled for web compatibility using Babel, and bundled with Webpack. Login/authentication uses bcrpytJS to hash/salt and compare passwords. SMS are sent with node-scheduler and the twilio API.

## Build Process

To build:

1. install dependencies
<pre><code>> npm install </code></pre>

2. compile TypeScript
<pre><code>> tsc </code></pre>

3. bundle client
<pre><code>> npm run client:dev </code></pre>

4. ensure you have a local instance of MongoDB running. Either point your ENV variables to the desired database, or edit the development database url in server/db/index.ts

<pre><code>const cnxs = { dev: 'YOUR URL HERE' };</code></pre>

5. either set your PORT env variable to your desired port, or edit the dev port in server/index.ts

<pre><code>const port = process.env.PORT || 3000;</code></pre>

6. launch server

<pre><code>> npm run server:prod</code></pre>

or, in nodemon for development

<pre><code>> npm run server:dev</code></pre>