// ============================================================
// CHECKPOINT MONGOOSE — CRUD complet
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/Person');

// ============================================================
// 1. CONNEXION À MONGODB ATLAS AVEC MONGOOSE
// L'URI est stockée dans le fichier .env (jamais committé sur GitHub)
// ============================================================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connecté à MongoDB Atlas'))
  .catch(err => console.error('❌ Erreur de connexion :', err));


// ============================================================
// 2. CRÉER ET SAUVEGARDER UNE PERSONNE (document.save())
// ============================================================
const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Mouhamed',
    age: 25,
    favoriteFoods: ['Thiéboudienne', 'Yassa']
  });

  // .save() avec callback (convention Node : (err, data))
  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};


// ============================================================
// 3. CRÉER PLUSIEURS PERSONNES AVEC Model.create()
// ============================================================
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return done(err);
    done(null, people);
  });
};


// ============================================================
// 4. UTILISER Model.find() — trouver toutes les personnes
// ayant un nom donné
// ============================================================
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, people) {
    if (err) return done(err);
    done(null, people);
  });
};


// ============================================================
// 5. UTILISER Model.findOne() — trouver UNE personne ayant
// un aliment donné dans favoriteFoods
// ============================================================
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};


// ============================================================
// 6. UTILISER Model.findById() — trouver une personne par _id
// ============================================================
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};


// ============================================================
// 7. MISE À JOUR CLASSIQUE : Find → Edit → Save
// Trouver une personne par _id, ajouter "hamburger" à
// favoriteFoods, puis sauvegarder
// ============================================================
const findEditThenSave = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    // Ajout de "hamburger" à la liste des aliments préférés
    person.favoriteFoods.push('hamburger');

    // Note : pas nécessaire ici car favoriteFoods est typé [String]
    // (sinon il faudrait : person.markModified('favoriteFoods');)

    person.save(function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};


// ============================================================
// 8. NOUVELLE MISE À JOUR avec Model.findOneAndUpdate()
// Trouver une personne par nom et fixer son âge à 20
// { new: true } renvoie le document MIS À JOUR
// ============================================================
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },               // renvoie le document mis à jour
    function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};


// ============================================================
// 9. SUPPRIMER UN DOCUMENT avec Model.findByIdAndRemove()
// ============================================================
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return done(err);
    done(null, removedPerson);
  });
};


// ============================================================
// 10. SUPPRIMER PLUSIEURS DOCUMENTS avec Model.remove()
// Supprimer toutes les personnes nommées "Mary"
// ============================================================
const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  Person.remove({ name: nameToRemove }, function (err, result) {
    if (err) return done(err);
    done(null, result);
  });
};


// ============================================================
// 11. CHAÎNER DES QUERY HELPERS pour affiner les résultats
// Trouver les personnes aimant les "burritos",
// trier par nom, limiter à 2 résultats, masquer l'âge
// ============================================================
const queryChain = (done) => {
  const foodToSearch = 'burritos';

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })       // tri croissant par nom
    .limit(2)                // limite à 2 résultats
    .select('-age')          // masque le champ "age"
    .exec(function (err, data) {
      if (err) return done(err);
      done(null, data);
    });
};


// ============================================================
// EXPORTS — pour les tests / utilisation externe
// ============================================================
module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
};
