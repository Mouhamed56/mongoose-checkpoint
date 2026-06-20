// ============================================================
// MODÈLE PERSON
// Prototype demandé :
// - name : string [required]
// - age : number
// - favoriteFoods : array of strings
// ============================================================

const mongoose = require('mongoose');

// ===== DÉFINITION DU SCHÉMA =====
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true   // validateur : le nom est obligatoire
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]   // tableau de strings (et non Mixed)
  }
});

// ===== CRÉATION DU MODÈLE à partir du schéma =====
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
