const typeDefs = `
  type Group {
    _id: ID
    name: String!
  }

  type Game {
    _id: ID
    name: String!
    photo: String!
    description: String!
    castMembers: [String!]
    numMembers: Int!
    author: String!
    createdAt: String!
    groups: Group
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    groups: [Group]
    games: [Game]
    joinedGames: [Game]
  }

  type Auth {
    token: ID
    user: User
  }

  type Photos {
    groupId: ID!
    name: String!
    photos: [String]
  }

  type Query {
    games: [Game]
    game(_id: ID!): Game
    groups: [Group]
    group(_id: ID!): Group
    groupGame( groupId : ID!): [Game]
    user(username: String!): User
    groupMembers( groupId : ID!): [User]
    groupGamePhotos(username: String!): [Photos]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addGroup(name: String!): Group
    joinGroup(groupId: ID!): User
    leaveGroup(groupId: ID!): User
    addGame(name: String!, photo: String!, description: String!, castMembers: [String!], numMembers: Int!, author: String!, groupId: ID): Game
    updateGame(_id: ID!, name: String, photo: String, description: String!, castMembers: [String], numMembers: Int, author: String, groupId: ID): Game
    deleteGame(_id: ID!): Game
    joinGame(_id: ID!): User
    leaveGame(_id: ID!): User
  }
`;

module.exports = typeDefs;
