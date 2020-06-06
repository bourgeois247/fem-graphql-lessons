const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: String!
    username: String!
  }
  
  type Pet {
    id: String!
    createdAt: String!
    name: String!
    type: String!
    img: String
  }

  input PetInput {
    id: String
    name: String
    type: String
  }

  type Query {
    me: User!
    pets(query: PetInput): [Pet]!
    pet(query: PetInput): Pet
  }

  input NewPetInput {
    name: String!
    type: String!
  }

  input UpdatePet {
    id: ID!
    name: String
    type: String
  }

  type Mutation {
    addPet(newPet: NewPetInput): Pet!,
    updatePet(petUpdateData: UpdatePet): Pet!
    deletePet(id: ID!): ID!
  }
`;

module.exports = typeDefs
