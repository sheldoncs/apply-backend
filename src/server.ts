import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import { tokenGenerator, verifyToken } from "./auth/authHandlers";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
import * as dotenv from "dotenv";
import { Signup, localPassport } from "./auth/localPassport";

localPassport;

dotenv.config();
const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(helmet());
app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.post(
//   "/login",
//   (req, res, next) => {
//     const { username, password } = req.body;
//     console.log(req.body);
//     const accessToken = jwt.sign({ username: username }, process.env.jwtSecret);
//     res.send({ jwt: accessToken });
//     console.log("accessToken", accessToken);
//   },
//   tokenGenerator
// );
app.post(
  "/login",
  passport.authenticate("local", { session: false }),
  tokenGenerator
);

// app.get(
//   "/auth/google/redirect",
//   passport.authenticate("google", {
//     session: false,
//     failureRedirect: "/",
//   }),
//   tokenGenerator
// );

// app.post(
//   "/login",
//   // wrap passport.authenticate call in a middleware function
//   function (req, res, next) {
//     console.log(req.body);
//     // call passport authentication passing the "local" strategy name and a callback function
//     passport.authenticate("local", function (error, user, info) {
//       // this will execute in any case, even if a passport strategy will find an error
//       // log everything to console
//       console.log(error);
//       console.log(user);
//       console.log(info);

//       if (error) {
//         res.status(401).send(error);
//       } else if (!user) {
//         res.status(401).send(info);
//       } else {
//         next();
//       }

//       res.status(401).send(info);
//     })(req, res);
//   },

//   // function to call once successfully authenticated
//   function (req, res) {
//     res.status(200).send("logged in!");
//   }
// );
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: verifyToken,
  debug: false,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(
    `\nGraphQL Server running on ---> http://localhost:${port}/graphql\n`
  )
);
