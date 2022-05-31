import {buildSchema} from "graphql";
import UserModel, {UserBaseType} from "../Models/User";
import {graphqlHTTP} from "express-graphql";

const schema = buildSchema(`
  type User{
    firstName:String!
    lastName:String
    email:String!
    password:String!
  }
  type Query {
    users: [User]
    user(email: String!): User
  }
  type Mutation {
    addUser(email:String!, password:String!, firstName:String!, lastName:String): User
  }
`);
const rootValue = {
    users: async () => UserModel.find({}),
    user: async ({email}: { email: string }) => UserModel.findOne({email}),
    addUser: async (userDetails: UserBaseType) => {
        const newUserModel = new UserModel(userDetails);
        try {
            return await newUserModel.save();
        } catch (e) {
            return null;
        }
    }
}
export const GraphqlHTTP=graphqlHTTP({
    schema, rootValue, graphiql: true
})