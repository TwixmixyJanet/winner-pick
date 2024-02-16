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
    addCastMemberToUserRoster: async (_, { userId, castMember }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Add the cast member to the user's roster
        user.roster.push(castMember);
        await user.save();

        return user;
      } catch (error) {
        throw new Error("Failed to add cast member to user's roster");
      }
    },

    removeCastMemberFromUserRoster: async (_, { userId, castMemberId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Remove the cast member from the user's roster
        user.roster = user.roster.filter((item) => item !== castMemberId);
        await user.save();

        return user;
      } catch (error) {
        throw new Error("Failed to remove cast member from user's roster");
      }
    },
  },
};

module.exports = resolvers;
