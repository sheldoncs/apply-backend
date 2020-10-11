import {
  logins,
  getLoginByUsername,
  getLoginByEmail,
  authorizeUser,
  login,
  addLoginInfo,
  deleteByUsername,
  deleteLoginById,
} from "./resolvers/login/login";

export const resolvers = {
  Query: {
    logins,
    getLoginByEmail,
    authorizeUser,
    getLoginByUsername,
    login,
  },

  Mutation: {
    addLoginInfo,
    deleteByUsername,
    deleteLoginById,
  },
};
