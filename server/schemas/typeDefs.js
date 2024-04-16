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
    castMembers: [CastMember]
    coinBuyIn: Int!
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
    castMembers: [CastMember]
    joinedGames: [Game]
   }

  type CastMember {
    _id: ID
    name: String
    users: User
    games: Game
    elimination: Elimination
  }
  
  type Elimination {
    _id: ID
    order: Int!
    games: Game
    castMembers: CastMember
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

  type Roster {
    _id: ID
    users: [User]
    castMembers: [CastMember]
  }

  type Query {
    games: [Game]
    game(_id: ID!): Game
    groups: [Group]
    group(_id: ID!): Group
    groupGame(groupId: ID!): [Game]
    user(username: String!): User
    usersByGroup(groupId: ID!): [User!]!
    groupMembers(groupId: ID!): [User]
    groupGamePhotos(username: String!): [Photos]
    castMembers: [CastMember]
    castMember(_id: ID!): CastMember
    rosters: [Roster]
    roster(_id: ID!): Roster
 }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addGroup(name: String!): Group
    joinGroup(groupId: ID!): User
    leaveGroup(groupId: ID!): User
    addGame(name: String!, photo: String!, description: String!, castMembers: [ID!]!, coinBuyIn: Int!, groupId: ID): Game
    updateGame(_id: ID!, name: String, photo: String, description: String, castMembers: [ID], coinBuyIn: Int, groupId: ID): Game
    deleteGame(_id: ID!): Game
    joinGame(_id: ID!): User
    leaveGame(_id: ID!): User
    addCastMember(name: String!): CastMember
    updateCastMember(_id: ID!, name: String): CastMember
    deleteCastMember(_id: ID!): CastMember
    eliminated(_id: ID!): CastMember
    draftCastMemberForGame(gameId: ID!, castMemberId: ID!): Game
    undraftCastMemberForGame(gameId: ID!, castMemberId: ID!): Game
  }
`;

module.exports = typeDefs;
