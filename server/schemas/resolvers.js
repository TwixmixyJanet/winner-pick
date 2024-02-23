const { User, Game, Group, CastMember, Episode } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    games: async () => {
      return await Game.find().populate(["groups", "castMembers"]);
    },
    game: async (parent, { _id }) => {
      return await Game.findById(_id).populate(["groups", "castMembers"]);
    },

    groups: async () => {
      return await Group.find();
    },
    group: async (parent, { _id }) => {
      return await Group.findById(_id);
    },

    groupGame: async (parent, { groupId }) => {
      return await Game.find({ groups: { _id: groupId } }).populate("groups");
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username: username }).populate([
        "groups",
        "games",
      ]);
    },

    usersByGroup: async (_, { groupId }, context) => {
      // Check authentication or permissions as needed

      // Fetch users based on group ID
      const users = await User.find({ groupId }); // Example assuming Mongoose for MongoDB

      return users;
    },

    groupMembers: async (parent, { groupId }) => {
      return await User.find({ groups: { _id: groupId } }).populate("groups");
    },

    groupGamePhotos: async (parent, { username }) => {
      const user = await User.findOne({ username: username }).populate([
        "groups",
        "games",
      ]);
      let groupgame = [];
      for (i = 0; i < user.groups.length; i++) {
        groupgame.push({
          groupId: user.groups[i]._id,
          name: user.groups[i].name,
          photos: [],
        });
        const groupgamedata = await Game.find({
          groups: { _id: user.groups[i]._id },
        });
        for (j = 0; j < groupgamedata.length; j++) {
          groupgame[i].photos.push(groupgamedata[j].photo);
        }
      }
      return groupgame;
    },
    castMembers: async () => {
      return await CastMember.find().populate("games");
    },
    castMember: async (parent, { _id }) => {
      return await CastMember.findById(_id);
    },
    elimination: async () => {
      return await Elimination.find();
    },
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

    addGroup: async (parent, { name }, context) => {
      const newGroup = await Group.create({ name: name });
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { groups: newGroup._id } },
        { new: true }
      ).populate("groups");
      return newGroup;
    },

    joinGroup: async (parent, { groupId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: groupId } },
          { new: true }
        ).populate("groups");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    leaveGroup: async (parent, { groupId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: groupId } },
          { new: true }
        ).populate("groups");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    addGame: async (parent, args, context) => {
      const newGame = await Game.create({
        // addGame
        name: args.name,
        photo: args.photo,
        description: args.description,
        numMembers: args.numMembers,
        groupId: args.groupId,
        castMembers: [],
      });
      await User.findByIdAndUpdate(
        // addGameToUser
        { _id: context.user._id },
        { $addToSet: { games: newGame._id } },
        { new: true }
      );
      const addCastMemberToGame = await Game.findByIdAndUpdate(
        { _id: newGame._id },
        { $addToSet: { castMembers: { $each: args.castMembers } } },
        { new: true }
      );
      if (args.groupId) {
        const addGameToGroup = await Game.findByIdAndUpdate(
          { _id: newGame._id },
          { $set: { groups: { _id: args.groupId } } },
          { new: true }
        );
        return addGameToGroup;
      }
      return addCastMemberToGame;
    },

    updateGame: async (
      parent,
      { _id, name, photo, description, castMembers, numMembers, groupId }
    ) => {
      const updateGame = await Game.findByIdAndUpdate(
        { _id: _id },
        {
          name: name,
          photo: photo,
          description: description,
          castMembers: castMembers,
          numMembers: numMembers,
          groups: groupId,
        },
        { new: true }
      ).populate("groups");
      console.log(updateGame);
      return updateGame;
    },

    deleteGame: async (parent, { _id }, context) => {
      const game = await Game.findByIdAndDelete(_id).populate("groups");
      const deleteGameFromUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { games: _id } },
        { new: true }
      );
      return game;
    },

    joinGame: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { joinedGames: _id } },
          { new: true }
        ).populate("joinedGames");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    leaveGame: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { joinedGames: _id } },
          { new: true }
        ).populate("joinedGames");

        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    addCastMember: async (parent, { name }) => {
      const newCastMember = await CastMember.create({ name });
      return newCastMember;
    },
    updateCastMember: async (parent, { _id, name }) => {
      const updatedCastMember = await CastMember.findByIdAndUpdate(
        { _id },
        { name },
        { new: true }
      );
      return updatedCastMember;
    },

    deleteCastMember: async (parent, { _id }) => {
      const deletedCastMember = await CastMember.findByIdAndDelete(_id);
      return deletedCastMember;
    },

    eliminated: async (parent, { _id }, context) => {
      if (context.castMember) {
        const eliminateCastMember = await CastMember.findByIdAndUpdate(
          { _id: context.castMember._id },
          { $addToSet: { eliminatedCastMember: _id } },
          { new: true }
        ).populate("eliminatedCastMember");

        return eliminateCastMember;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    draftCastMember: async (_, { castMemberId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new Error("User not authenticated");
      }

      try {
        // Find the cast member by ID
        const castMember = await CastMember.findById(castMemberId);

        // Check if the cast member exists
        if (!castMember) {
          throw new Error("Cast member not found");
        }

        // Check if the cast member is already owned by another user
        if (castMember.user) {
          throw new Error("Cast member is already owned by another user");
        }

        // Update the cast member to associate it with the current user
        castMember.user = context.user._id;
        await castMember.save();

        return castMember;
      } catch (error) {
        throw new Error(`Failed to draft cast member: ${error.message}`);
      }
    },

    undraftCastMember: async (_, { castMemberId }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new Error("User not authenticated");
      }

      try {
        // Find the cast member by ID
        const castMember = await CastMember.findById(castMemberId);

        // Check if the cast member exists
        if (!castMember) {
          throw new Error("Cast member not found");
        }

        // Check if the cast member is owned by the current user
        if (
          !castMember.user ||
          castMember.user.toString() !== context.user._id.toString()
        ) {
          throw new Error("You do not own this cast member");
        }

        // Unassociate the cast member from the user
        castMember.user = null;
        await castMember.save();

        return castMember;
      } catch (error) {
        throw new Error(`Failed to undraft cast member: ${error.message}`);
      }
    },
  },

  User: {
    draftedCastMembers: async (parent, args, context) => {
      try {
        // Extract the game ID from the parent user object
        const gameIdList = parent.games.map((game) => game._id);

        // Fetch all users in the same groups as the game
        const usersInSameGroups = await User.find({
          groups: { $in: parent.groups },
        });

        // Extract drafted cast members from users who have the game in their games list
        const draftedCastMembers = usersInSameGroups.flatMap((user) =>
          user.draftedCastMembers.filter((castMember) =>
            gameIdList.includes(castMember.game)
          )
        );

        return draftedCastMembers;
      } catch (error) {
        throw new Error(`Failed to get drafted cast members: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
