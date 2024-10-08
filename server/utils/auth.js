const { GraphQLError } = require("graphql");
const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  GraphQLError: GraphQLError,
  AuthenticationError: AuthenticationError,
  authMiddleware: function ({ req }) {
    // console.log("authMiddleware");
    // console.log("req.body.token", req.body.token);
    // console.log("req.query.token", req.query.token);
    // console.log("req.headers.token", req.headers.authorization);
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // console.log("token", token);

    if (!token) {
      // console.log("No token in auth.js");
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
