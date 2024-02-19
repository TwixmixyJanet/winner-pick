// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from "@apollo/client";

// Important for useMutation: Each mutation we'd like to be able to perform gets exported out of our mutations.js utility

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        email
        password
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
        firstName
        lastName
        username
      }
    }
  }
`;

export const ADD_GROUP = gql`
  mutation addGroup($name: String!) {
    addGroup(name: $name) {
      _id
      name
    }
  }
`;

export const JOIN_GROUP = gql`
  mutation joinGroup($groupId: ID!) {
    joinGroup(groupId: $groupId) {
      _id
      firstName
      lastName
      username
      email
      groups {
        _id
        name
      }
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation leaveGroup($groupId: ID!) {
    leaveGroup(groupId: $groupId) {
      _id
      firstName
      lastName
      username
      email
      groups {
        _id
        name
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame(
    $name: String!
    $photo: String!
    $description: String!
    $castMembers: [ID!]!
    $numMembers: Int!
    $groupId: ID
  ) {
    addGame(
      name: $name
      photo: $photo
      description: $description
      castMembers: $castMembers
      numMembers: $numMembers
      groupId: $groupId
    ) {
      _id
      name
      photo
      description
      castMembers {
        _id # Include subfields for each CastMember
        name # Include any other desired fields
      }
      numMembers
      createdAt
      groups {
        _id
      }
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation updateGame(
    $id: ID!
    $name: String!
    $photo: String!
    $description: String!
    $castMembers: [ID!]! # Updated to accept an array of ID values
    $numMembers: Int!
    $groupId: ID
  ) {
    updateGame(
      _id: $id
      name: $name
      photo: $photo
      description: $description
      castMembers: $castMembers
      numMembers: $numMembers
      groupId: $groupId
    ) {
      _id
      name
      photo
      description
      castMembers {
        _id
        name
      }
      numMembers
      createdAt
      groups {
        _id
        name
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation deleteGame($id: ID!) {
    deleteGame(_id: $id) {
      _id
      name
      photo
      description
      castMembers {
        _id
        name
      }
      numMembers
      createdAt
      groups {
        _id
        name
      }
    }
  }
`;

export const JOIN_GAME = gql`
  mutation joinGame($id: ID!) {
    joinGame(_id: $id) {
      _id
      username
      joinedGames {
        _id
      }
    }
  }
`;

export const LEAVE_GAME = gql`
  mutation leaveGame($id: ID!) {
    leaveGame(_id: $id) {
      _id
      username
      joinedGames {
        _id
      }
    }
  }
`;

export const ADD_CAST_MEMBER = gql`
  mutation addCastMember($name: String!) {
    addCastMember(name: $name) {
      _id
      name
    }
  }
`;

export const UPDATE_CAST_MEMBER = gql`
  mutation updateCastMember($id: ID!, $name: String!) {
    updateCastMember(_id: $id, name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_CAST_MEMBER = gql`
  mutation deleteCastMember($id: ID!) {
    deleteCastMember(_id: $id) {
      _id
    }
  }
`;

export const ELIMINATED = gql`
  mutation eliminated($order: Int!) {
    eliminated(order: $order) {
      _id
      order
    }
  }
`;

export const DRAFT_CAST_MEMBER = gql`
  mutation DraftCastMember($castMemberId: ID!) {
    draftCastMember(castMemberId: $castMemberId) {
      _id
      name
      # Include any other fields you may need after drafting a cast member
    }
  }
`;

export const UNDRAFT_CAST_MEMBER = gql`
  mutation undraftCastMember($castMemberId: ID!) {
    undraftCastMember(castMemberId: $castMemberId) {
      _id
      name
      # Include any other fields you may need after undrafting a cast member
    }
  }
`;
