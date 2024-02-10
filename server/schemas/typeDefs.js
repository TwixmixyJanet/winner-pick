const typeDefs = `
  type Group {
    _id: ID
    name: String!
  }

  type Game {
    _id: ID!
    name: String!
    photo: String!
    description: String!
    castMembersGame: [CastMember]
    numMembers: Int!
    createdAt: String!
    groups: Group
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    groups: [Group]
    games: [Game]
    joinedGames: [Game]
  }

  type CastMember {
    _id: ID
    name: String!
    groups: [Group]
    users: [User]
    games: [Game]
    episodes: [Episode]
  }
  
  type Episode {
    _id: ID
    name: String!
    games: [Game]
    castMembers: [CastMember]
    eliminated: [CastMember]
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
    groupGame(groupId: ID!): [Game]
    user(username: String!): User
    groupMembers(groupId: ID!): [User]
    groupGamePhotos(username: String!): [Photos]
    castMembersGame: [CastMember]
    castMembers: [CastMember]
    episodes: [Episode]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addGroup(name: String!): Group
    joinGroup(groupId: ID!): User
    leaveGroup(groupId: ID!): User
    addGame(name: String!, photo: String!, description: String!, castMembers: [ID!]!, numMembers: Int!, groupId: ID): Game
    updateGame(_id: ID!, name: String, photo: String, description: String, castMembers: [ID], numMembers: Int, groupId: ID): Game
    deleteGame(_id: ID!): Game
    joinGame(_id: ID!): User
    leaveGame(_id: ID!): User
    addCastMember(name: String!): CastMember
    updateCastMember(_id: ID!, name: String): CastMember
    deleteCastMember(_id: ID!): CastMember
    addEpisode(name: String!): Episode
    updateEpisode(_id: ID!, name: String): Episode
    deleteEpisode(_id: ID!): Episode
  }
`;

module.exports = typeDefs;
