import knex from "../../config/knex";

export const LoginQueries = {
  getAllUserLogins: async () => {
    const logins = await knex("logins");
    return logins;
  },

  // getUserProfileById: async (id: number) => {
  //   const userProfile = await knex('userProfile').where({ id }).first();
  //   return userProfile;
  // },
  singleLoginByUsername: async (username: string) => {
    const logins = await knex("logins").where({ username }).first();
    return logins;
  },

  getLoginByEmail: async (username: string) => {
    const logins = await knex("logins").where({ username }).first();
    return logins;
  },
  confirmUserCredentials: async (username: string, password) => {
    const logins = await knex("logins").where({ username, password }).first();
    return logins;
  },
  getLoginById: async (id: number) => {
    const logins = await knex("logins").where("id", id).first();
    return logins;
  },
  addUserLogin: async (login) => {
    return await knex("login").insert(login).returning("*");
  },

  deleteLoginById: async (id) => {
    return await knex("login").where({ id }).del().returning("*");
  },

  deleteLoginByEmail: async (email) => {
    return await knex("login").where({ email }).del().returning("*");
  },
};
