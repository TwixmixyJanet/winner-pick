// Important for useMutation: We bring in gql from the @apollo/client library to allow us to parse mutations (and queries) as template literals
import { gql } from '@apollo/client';

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
    mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password) {
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


export const ADD_FAMILY = gql`
    mutation addFamily($name: String!) {
        addFamily(name: $name) {
            _id
            name   
        }
    }
`;

export const JOIN_FAMILY = gql`
    mutation joinFamily($familyId: ID!) {
        joinFamily(familyId: $familyId) {
            _id
            firstName
            lastName
            username
            email
            families {
                _id
                name
            }
        }
    }
`;

export const LEAVE_FAMILY = gql`
    mutation leaveFamily($familyId: ID!) {
        leaveFamily(familyId: $familyId) {
            _id
            firstName
            lastName
            username
            email
            families {
                _id
                name
            }
        }
    }
`

export const ADD_RECIPE = gql`
    mutation addRecipe($name: String!, $photo: String!, $cookingTime: String!, $instructions: String!, $ingredients: String!, $servingSize: String!, $author: String!, $familyId: ID) {
        addRecipe(name: $name, photo: $photo, cookingTime: $cookingTime, instructions: $instructions, ingredients: $ingredients, servingSize: $servingSize, author: $author, familyId: $familyId) {
            _id
            name
            photo
            cookingTime
            instructions
            ingredients
            servingSize
            author
            createdAt
            families {
                _id
            }
        }
    }
`

export const UPDATE_RECIPE = gql`
    mutation updateRecipe($id: ID!, $cookingTime: String!, $servingSize: String!, $name: String, $photo: String, $instructions: String, $ingredients: String, $author: String, $familyId: ID) {
        updateRecipe(_id: $id, cookingTime: $cookingTime, servingSize: $servingSize, name: $name, photo: $photo, instructions: $instructions, ingredients: $ingredients, author: $author, familyId: $familyId) {
          _id
          name
          photo
          cookingTime
          instructions
          ingredients
          servingSize
          author
          createdAt
          families {
            _id
            name
          }
        }
    }
`

export const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: ID!) {
        deleteRecipe(_id: $id) {
            _id
            name
            photo
            cookingTime
            instructions
            ingredients
            servingSize
            author
            createdAt
            families {
                _id
                name
            }
        }
    }
`

export const PIN_RECIPE = gql`
    mutation pinRecipe($id: ID!) {
        pinRecipe(_id: $id) {
            _id
            username
            pinnedRecipes {
                _id
            }
        }
    }
`

export const UNPIN_RECIPE = gql`
    mutation unpinRecipe($id: ID!) {
        unpinRecipe(_id: $id) {
            _id
            username
            pinnedRecipes {
                _id
            }
        }
    }
`;