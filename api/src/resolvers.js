/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */
module.exports = {
  Query: {
    me(_, args, context) {
      return context.models.User.findOne();
    },

    pets(_, { query }, context) {
      return context.models.Pet.findMany(query);
    },

    pet(_, { query }, context) {
      const result = context.models.Pet.findMany(query);
      return result.length > 0 ? result[0] : null;
    }
  },
  Mutation: {
    addPet(_, { newPet }, context) {
      return context.models.Pet.create({ ...newPet, owner: context.user.id });
    },
    updatePet(_, { petUpdateData }, context) {
      return context.models.Pet.update(petUpdateData)
    },
    deletePet(_, { id }, context) {
      return context.models.Pet.delete(id);
    }
  },
  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    },
    owner(pet, _, context) {
      // get the user whose Id matches pet.id
      return context.models.User.findOne();
    }
  },
  User: {
    pets(user, _, context) {
      // get all pets with a userId of user.id
      return context.models.Pet.findMany({ owner: user.id })
    }
  }
}
