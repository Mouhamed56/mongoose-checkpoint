// ============================================================
// FICHIER DE DÉMONSTRATION
// Exécute toutes les fonctions de myApp.js dans l'ordre logique
// pour vérifier que chaque opération CRUD fonctionne.
//
// Lancer avec : node demo.js
// ============================================================

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/Person');

const {
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
} = require('./myApp');

// ===== CONNEXION =====
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connecté à MongoDB Atlas\n');

  // Nettoyage avant la démo (optionnel, pour repartir propre)
  await Person.deleteMany({});
  console.log('🧹 Collection "people" nettoyée\n');

  // ===== 1. Créer et sauvegarder une personne =====
  createAndSavePerson((err, data) => {
    if (err) return console.error('❌', err);
    console.log('1️⃣ Personne créée :', data.name, '-', data._id, '\n');

    // ===== 2. Créer plusieurs personnes =====
    const arrayOfPeople = [
      { name: 'Aïcha', age: 30, favoriteFoods: ['burritos', 'pizza'] },
      { name: 'Mary', age: 22, favoriteFoods: ['tacos'] },
      { name: 'Mary', age: 45, favoriteFoods: ['burritos'] },
      { name: 'Ibrahima', age: 28, favoriteFoods: ['burritos', 'thieboudienne'] },
    ];

    createManyPeople(arrayOfPeople, (err, people) => {
      if (err) return console.error('❌', err);
      console.log('2️⃣ Personnes créées :', people.map(p => p.name).join(', '), '\n');

      // ===== 3. find() par nom =====
      findPeopleByName('Mary', (err, found) => {
        if (err) return console.error('❌', err);
        console.log('3️⃣ Personnes nommées "Mary" trouvées :', found.length, '\n');

        // ===== 4. findOne() par aliment =====
        findOneByFood('burritos', (err, person) => {
          if (err) return console.error('❌', err);
          console.log('4️⃣ Une personne qui aime les burritos :', person.name, '\n');

          // ===== 5. findById() =====
          findPersonById(data._id, (err, person) => {
            if (err) return console.error('❌', err);
            console.log('5️⃣ Personne trouvée par ID :', person.name, '\n');

            // ===== 6. find → edit → save (ajout hamburger) =====
            findEditThenSave(data._id, (err, updated) => {
              if (err) return console.error('❌', err);
              console.log('6️⃣ Aliments après ajout du hamburger :', updated.favoriteFoods, '\n');

              // ===== 7. findOneAndUpdate (âge = 20) =====
              findAndUpdate('Aïcha', (err, updated) => {
                if (err) return console.error('❌', err);
                console.log('7️⃣ Âge de Aïcha mis à jour :', updated.age, '\n');

                // ===== 8. findByIdAndRemove =====
                removeById(updated._id, (err, removed) => {
                  if (err) return console.error('❌', err);
                  console.log('8️⃣ Personne supprimée :', removed.name, '\n');

                  // ===== 9. remove() — supprime tous les "Mary" =====
                  removeManyPeople((err, result) => {
                    if (err) return console.error('❌', err);
                    console.log('9️⃣ Suppression des "Mary" :', result, '\n');

                    // ===== 10. Chaîne de requêtes =====
                    queryChain((err, data) => {
                      if (err) return console.error('❌', err);
                      console.log('🔟 Personnes aimant les burritos (triées, limitées, sans âge) :');
                      console.log(data, '\n');

                      console.log('✅ Démonstration terminée avec succès !');
                      mongoose.connection.close();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}).catch(err => console.error('❌ Erreur de connexion :', err));
