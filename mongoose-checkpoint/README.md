# Mongoose Checkpoint — CRUD complet

Manipulation et gestion d'une base de données MongoDB avec Mongoose.

## 📦 Installation

```bash
npm install
```

## 🔐 Configuration

1. Copiez `.env.example` en `.env`
2. Remplacez `MONGO_URI` par votre vraie URI MongoDB Atlas :

```
MONGO_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority"
```

⚠️ Pas d'espace autour du `=`, et l'URI entre guillemets.
Le fichier `.env` n'est **jamais** poussé sur GitHub (voir `.gitignore`).

## ▶️ Exécution

```bash
node demo.js
```

Ce fichier exécute, dans l'ordre, toutes les fonctions de `myApp.js` :

| # | Fonction | Méthode Mongoose |
|---|---|---|
| 1 | `createAndSavePerson` | `new Person()` + `.save()` |
| 2 | `createManyPeople` | `Model.create()` |
| 3 | `findPeopleByName` | `Model.find()` |
| 4 | `findOneByFood` | `Model.findOne()` |
| 5 | `findPersonById` | `Model.findById()` |
| 6 | `findEditThenSave` | `findById` → édition → `.save()` |
| 7 | `findAndUpdate` | `Model.findOneAndUpdate()` |
| 8 | `removeById` | `Model.findByIdAndRemove()` |
| 9 | `removeManyPeople` | `Model.remove()` |
| 10 | `queryChain` | `.find().sort().limit().select().exec()` |

## 📁 Structure

```
mongoose-checkpoint/
├── models/
│   └── Person.js     ← Schéma Mongoose (name, age, favoriteFoods)
├── myApp.js           ← Toutes les fonctions CRUD (commentées)
├── demo.js            ← Exécution de démonstration dans l'ordre
├── .env.example        ← Modèle de configuration
└── package.json
```
