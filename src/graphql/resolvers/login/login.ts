// import { Queries } from "../../../endpoints/queries";
import { Queries } from "../../../endPoints/queries";
import { LoginInterface } from "../../../interfaces/queryInterfaces";

export const logins = async () => {
  const AllLogins = await Queries.LoginQueries.getAllUserLogins();
  return AllLogins;
};
export const login = async (root: any, args: { id: number }) => {
  const singleLoginById = await Queries.LoginQueries.getLoginById(args.id);
  return singleLoginById;
};
export const getLoginByUsername = async (
  root: any,
  args: { username: string }
) => {
  const singleLoginByUsername = await Queries.LoginQueries.singleLoginByUsername(
    args.username
  );
  return singleLoginByUsername;
};

export const authorizeUser = async (
  root: any,
  args: { username: string; password: string }
) => {
  const authorize = await Queries.LoginQueries.confirmUserCredentials(
    args.username,
    args.password
  );
  return authorize;
};
export const getLoginByEmail = async (root: any, args: { email: string }) => {
  const singleLoginByEmail = await Queries.LoginQueries.getLoginByEmail(
    args.email
  );
  return singleLoginByEmail;
};

export const addLoginInfo = async (root: any, payload: LoginInterface) => {
  const findProfile = await Queries.LoginQueries.getLoginByEmail(payload.email);
  if (!findProfile) {
    await Queries.LoginQueries.addUserLogin([
      {
        ...payload,
      },
    ]);

    const newLogin = {
      ...payload,
    };

    const message = `User, ${payload.email} created successfully`;
    return { message, newLogin };
  } else {
    const message = `Email already exists`;
    return { message };
  }
};
export const deleteByUsername = async (
  root: any,
  args: { username: string }
) => {
  const findProfile = await Queries.LoginQueries.singleLoginByUsername(
    args.username
  );
  if (!findProfile) {
    const message = `User not found`;
    return { message };
  } else {
    const del = await Queries.LoginQueries.deleteLoginByEmail(args.username);
    const message = `User, ${del[0]["email"]} deleted successfully`;
    return { message };
  }
};
export const deleteLoginById = async (root: any, args: { id: number }) => {
  const findProfile = await Queries.LoginQueries.getLoginById(args.id);
  if (!findProfile) {
    const message = `User not found`;
    return { message };
  } else {
    const del = await Queries.LoginQueries.deleteLoginById(args.id);
    const message = `User, ${del[0]["email"]} deleted successfully`;
    return { message };
  }
};
