const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Tableaux des rendez-vous : --------------------------------------------------
let desRendezVous = [
  {
    id: 0,
    date: "2024-10-31",
    heure: "8:00",
    telephoneClient: "111-111-1111",
    client: "Rayan",
  },
  {
    id: 1,
    date: "2024-11-01",
    heure: "8:00",
    telephoneClient: "222-222-2222",
    client: "Chazyl",
  },
  {
    id: 2,
    date: "2024-11-02",
    heure: "8:00",
    telephoneClient: "333-333-3333",
    client: "Pablo the King",
  },
];

// Tableaux des spécialistes : --------------------------------------------------
let desSpecialistes = [
  { id: 0, nom: "Alexandre", domaine: "coiffeur" },
  { id: 1, nom: "Antoine", domaine: "coiffeur" },
  { id: 3, nom: "Justyn", domaine: "coiffeur" },
];

// Tableaux des clients : --------------------------------------------------
let desClients = [
  { id: 0, nom: "Rayan", telephone: "111-111-1111", email: "rayan@gmail.com" },
  {
    id: 1,
    nom: "Chazyl",
    telephone: "222-222-2222",
    email: "chazyl@gmail.com",
  },
  {
    id: 3,
    nom: "Pablo the King",
    telephone: "333-333-3333",
    email: "pabloTheKing@gmail.com",
  },
];

// Rendez-vous : --------------------------------------------------
// Voir tous les rendez-vous :
app.get("/desRendezVous", (req, res) => {
  const taskReferences = desRendezVous.map(
    (rendezVous) => `/rendezVous/${rendezVous.id}`
  );
  res.json(taskReferences);
});

// Voir un rendez-vous :
app.get("/rendezVous/:id", (req, res) => {
  const rendezVousId = parseInt(req.params.id);
  const rendezVous = desRendezVous.find(
    (rendezVous) => rendezVous.id === rendezVousId
  );
  if (rendezVous) {
    res.json(rendezVous);
  } else {
    res.status(404).json({ error: "Rendez-vous non trouvé" });
  }
});

// Ajouter un rendez-vous :
app.post("/rendezVous", (req, res) => {
  const newRendezVous = {
    id: desRendezVous.length + 1,
    description: req.body.description,
  };
  desRendezVous.push(newRendezVous);
  res.status(201).json({
    message: "Rendez-vous ajouté avec succès",
    rendezVous: newRendezVous,
  });
});

// Modifier un rendez-vous :
app.put("/rendezVous/:id", (req, res) => {
  const rendezVousId = parseInt(req.params.id);
  const rendezVous = desRendezVous.find(
    (rendezVous) => rendezVous.id === rendezVousId
  );

  if (rendezVous) {
    rendezVous.id = req.body.id;
    rendezVous.date = req.body.date;
    rendezVous.heure = req.body.heure;
    rendezVous.telephoneClient = req.body.telephoneClient;
    rendezVous.client = req.body.client;
    res.json({ message: "Rendez-vous mis à jour avec succès", rendezVous });
  } else {
    res.status(404).json({ error: "Rendez-vous non trouvé" });
  }
});

// Supprimer un rendez-vous :
app.delete("/rendezVous/:id", (req, res) => {
  const rendezVousId = parseInt(req.params.id);
  desRendezVous = desRendezVous.filter(
    (rendezVous) => rendezVous.id !== rendezVousId
  );
  res.json({ message: "Rendez-vous supprimé avec succès" });
});

// Spécialistes : --------------------------------------------------
// Voir tous les spécialistes :
app.get("/desSpecialistes", (req, res) => {
  const taskReferences = desSpecialistes.map(
    (specialiste) => `/specialiste/${specialiste.id}`
  );
  res.json(taskReferences);
});

// Voir un spécialiste :
app.get("/specialiste/:id", (req, res) => {
  const specialisteId = parseInt(req.params.id);
  const specialiste = desSpecialistes.find(
    (specialiste) => specialiste.id === specialisteId
  );
  if (specialiste) {
    res.json(specialiste);
  } else {
    res.status(404).json({ error: "Spécialiste non trouvé" });
  }
});

// Clients :
// Voir des clients :
app.get("/desClients", (req, res) => {
  const taskReferences = desClients.map((client) => `/client/${client.id}`);
  res.json(taskReferences);
});

// Voir un client :
app.get("/client/:id", (req, res) => {
  const clientId = parseInt(req.params.id);
  const client = desClients.find((client) => client.id === clientId);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ error: "Client non trouvé" });
  }
});

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
