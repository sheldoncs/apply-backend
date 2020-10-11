import { gql } from "apollo-server-express";

export const LoginProfile = gql`
  scalar Date
  type Login {
    id: ID
    username: String
    password: String
  }
`;

export const CreateLoginResponse = gql`
  type CreateLoginResponse {
    message: String!
    createLogin: Login
  }
`;

export const DeleteLoginResponse = gql`
  type DeleteLoginResponse {
    message: String!
    deletedLogin: Login
  }
`;
