// Important for useQuery: We bring in gql from the @apollo/client library to allow us to parse queries (and mutations) as template literals
import { gql } from "@apollo/client";

// Important for useQuery: Each query we'd like to be able to perform gets exported out of our queries.js utility

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      firstName
      lastName
      username
      email
      groups {
        _id
        name
      }
      games {
        _id
        name
        photo
        description
        # castMembers {
        #   _id
        #   name
        # }
        coinBuyIn
        createdAt
      }
      joinedGames {
        _id
      }
    }
  }
`;

export const QUERY_ALL_GAMES = gql`
  query getGames {
    games {
      _id
      name
      photo
      description
      # castMembers {
      #   _id
      #   name
      # } need to add this back in once I figure out why it's having a null name issue
      coinBuyIn
      createdAt
      groups {
        _id
        name
      }
    }
  }
`;

export const QUERY_GAME = gql`
  query getSingleGame($id: ID!) {
    game(_id: $id) {
      _id
      name
      photo
      description
      castMembers {
        _id
        name
      }
      coinBuyIn
      createdAt
      groups {
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_GROUPS = gql`
  query getGroups {
    groups {
      _id
      name
    }
  }
`;

export const QUERY_GROUP = gql`
  query getSingleGroup($id: ID!) {
    group(_id: $id) {
      _id
      name
    }
  }
`;

export const QUERY_GROUP_GAME = gql`
  query getGroupGames($groupId: ID!) {
    groupGame(groupId: $groupId) {
      _id
      name
      photo
      description
      # castMembers {
      #  _id
      #  name
      # }
      coinBuyIn
      createdAt
      groups {
        _id
        name
      }
    }
  }
`;

export const QUERY_GROUP_MEMBER = gql`
  query groupMembers($groupId: ID!) {
    groupMembers(groupId: $groupId) {
      _id
      username
      firstName
      lastName
    }
  }
`;

export const QUERY_GROUP_GAME_PHOTOS = gql`
  query groupGamePhotos($username: String!) {
    groupGamePhotos(username: $username) {
      groupId
      name
      photos
    }
  }
`;

export const QUERY_ALL_CAST_MEMBERS = gql`
  query getAllCastMembers {
    castMembers {
      _id
      name
    }
  }
`;

export const QUERY_ALL_ELIMINATIONS = gql`
  query getAllEliminations {
    eliminations {
      _id
      order
    }
  }
`;

export const GET_DRAFTED_CAST_MEMBERS = gql`
  query GetDraftedCastMembers($userId: ID!, $gameId: ID!) {
    draftedCastMembersForUserInGame(userId: $userId, gameId: $gameId) {
      _id
      name
    }
  }
`;
