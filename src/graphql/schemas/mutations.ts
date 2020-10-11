import { gql } from "apollo-server-express";

export const mutations = gql`
  type Mutation {
    addLoginInfo(email: String, password: String): CreateLoginResponse

    deleteLoginById(id: ID): DeleteLoginResponse

    deleteByUsername(email: String): DeleteLoginResponse
  }
`;
