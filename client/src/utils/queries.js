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
      families {
        _id
        name
      }
      recipes {
        _id
        name
        photo
        cookingTime
        instructions
        ingredients
        servingSize
        author
        createdAt
      }
      pinnedRecipes {
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
      castMembers
      numMembers
      author
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
      castMembers
      numMembers
      author
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
      castMembers
      numMembers
      author
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
