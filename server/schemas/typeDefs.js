const typeDefs = `
  type Family {
    _id: ID
    name: String!
  }

  type Recipe {
    _id: ID
    name: String!
    photo: String!
    cookingTime: String!
    instructions: String!
    ingredients: String!
    servingSize: String!
    author: String!
    createdAt: String!
    families: Family
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    families: [Family]
    recipes: [Recipe]
    pinnedRecipes: [Recipe]
  }

  type Auth {
    token: ID
    user: User
  }

  type Photos {
    familyId: ID!
    name: String!
    photos: [String]
  }

  type Query {
    recipes: [Recipe]
    recipe(_id: ID!): Recipe
    families: [Family]
    family(_id: ID!): Family
    famRecipe( familyId : ID!): [Recipe]
    user(username: String!): User
    familyMembers( familyId : ID!): [User]
    familyRecipePhotos(username: String!): [Photos]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addFamily(name: String!): Family
    joinFamily(familyId: ID!): User
    leaveFamily(familyId: ID!): User
    addRecipe(name: String!, photo: String!, cookingTime: String!, instructions: String!, ingredients: String!, servingSize: String!, author: String!, familyId: ID): Recipe
    updateRecipe(_id: ID!, name: String, photo: String, cookingTime: String!, instructions: String, ingredients: String, servingSize: String!, author: String, familyId: ID): Recipe
    deleteRecipe(_id: ID!): Recipe
    pinRecipe(_id: ID!): User
    unpinRecipe(_id: ID!): User
  }
`;

module.exports = typeDefs;
