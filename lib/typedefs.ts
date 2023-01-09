const typeDefs = /* GraphQL */ `
type Query {
  login(name: String!, pwd:String!): ID
  logs(user:ID): [Log]
  exercises: [Exercise]
  as: String
}
type AddUserResult {
  code: Int!
  userId: ID
}
type Mutation {
  addUser(name: String!, pwd: String!): AddUserResult!
  updateLog(user:ID!, exercise: ID!, weight: Float, set: Int, rep: Int, rpe: Float): Boolean!
}
type User {
  _id: String!
  name: String!
  pwd: String!
}
type Log {
  user: User!
  exercise: Exercise!
  weight: Int
  set: Int
  rep: Int
  rpe: Float
}
type Exercise {
  _id: ID!
  name: String!
}
`
export default typeDefs;