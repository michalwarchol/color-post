# ColorPost Project
## This project is in development phase.

### Description
ColorPost allows you to create your own color patterns. You can also store them, and explore palettes created by others.

## Getting started

Install the dependencies:

```bash
npm install
```

Add necessary variables to `.env` file:
```
JWT_SECRET=
ATLAS_URI=mongodb+srv://<login>:<password>@<login>.f7he4.mongodb.net/<database>
```
Replace "<login>" with your login. Replace "<password>" with the password for <login> user. Replace "<database>" with the name of the database that connections will use by default.

Run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Tech Stack

[React](https://reactjs.org/)
[Redux](https://redux.js.org/)
[Typescript](https://www.typescriptlang.org/)
[Node](https://nodejs.dev/)
[Express](https://expressjs.com/)
[Mongoose](https://mongoosejs.com/)
[Json Web Token](https://jwt.io/)
[Webpack](https://webpack.js.org/)