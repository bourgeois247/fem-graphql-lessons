const nanoid = require('nanoid')

const createPetModel = db => {
  return {
    findMany(filter) {
      return db.get('pets')
        .filter(filter)
        .value()
    },

    findOne(filter) {
      return db.get('pets')
        .find(filter)
        .value()
    },

    create(pet) {
      const newPet = { id: nanoid(), createdAt: Date.now(), ...pet }
      
      db.get('pets')
        .push(newPet)
        .write()

      return newPet
    },

    update(data) {
      db.update('pets', pets => pets.map((pet) => {
        if (pet.id === data.id) {
          return { ...pet, ...data };
        }

        return pet;
      }))
      .write();
      
      return data;
    },

    delete(id) {
      db.update('pets', pets => pets.filter(pet => pet.id !== id)).write();
      return id;
    }
  }
}

module.exports = createPetModel
