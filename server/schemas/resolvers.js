const { User, Recipe, Family } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


 const resolvers = {
  Query: {
    recipes: async () => {
      return await Recipe.find().populate('families');
    },
    recipe: async (parent, { _id }) => {
      return await Recipe.findById(_id).populate('families');
    },

    families: async () => {
      return await Family.find();
    },
    family: async (parent, { _id }) => {
      return await Family.findById(_id);
    },

    famRecipe: async (parent, { familyId }) => {
      return await Recipe.find({ families: { _id : familyId }}).populate('families');
    },

    user: async (parent, { username }) => {
      return await User.findOne( { username: username } ).populate(['families', 'recipes']);
    },

    familyMembers: async (parent, { familyId }) => {
      return await User.find({ families: { _id : familyId }}).populate('families');
    },

    familyRecipePhotos: async( parent, { username }) => {
      const user = await User.findOne( { username: username } ).populate(['families', 'recipes']);
      let familyrecipe = [];
      for(i = 0; i < user.families.length; i++) {
        familyrecipe.push({ familyId: user.families[i]._id , name: user.families[i].name, photos: []})
        const familyrecipedata = await Recipe.find({ families: { _id : user.families[i]._id }});
        for (j = 0; j < familyrecipedata.length; j++){
          familyrecipe[i].photos.push(familyrecipedata[j].photo);
        }
      }
      return familyrecipe;
    }


  },


  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addFamily: async (parent, { name }, context) => {
      const newFamily = await Family.create({ name : name });
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { families: newFamily._id } },
        { new: true }
      ).populate('families');
      return newFamily;
    },

    joinFamily: async (parent, { familyId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { families: familyId } },
          { new: true }
        ).populate('families');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    leaveFamily: async (parent, { familyId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { families: familyId } },
          { new: true }
        ).populate('families');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addRecipe: async (parent, args, context) => {
      const newRecipe = await Recipe.create(args);
      const addRecipeToUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { recipes: newRecipe._id }  },
        { new: true }
      );
      if (args.familyId) {
        const addRecipeToFamily = await Recipe.findByIdAndUpdate(
          { _id: newRecipe._id },
          { $set: {families: { _id: args.familyId }} },
          {new: true})
        return addRecipeToFamily;
      };
      return newRecipe;
    },

    updateRecipe: async (parent, { _id, name, photo, cookingTime, instructions, ingredients, servingSize, author, familyId }) => {
      const updateRecipe = await Recipe.findByIdAndUpdate(
        { _id: _id },
        { name: name, photo: photo, cookingTime: cookingTime, instructions: instructions, ingredients: ingredients, servingSize: servingSize, author: author, families: familyId},
        { new: true }
      ).populate('families');
      console.log(updateRecipe);
      return updateRecipe;
    },

    deleteRecipe: async (parent, { _id }, context) => {
      const recipe = await Recipe.findByIdAndDelete(_id).populate('families');
      const deleteRecipeFromUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { recipes:_id }  },
        { new: true }
      );
      return recipe;
    },

    pinRecipe: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pinnedRecipes: _id } },
          { new: true }
        ).populate('pinnedRecipes');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    unpinRecipe: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { pinnedRecipes: _id } },
          { new: true }
        ).populate('pinnedRecipes');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;