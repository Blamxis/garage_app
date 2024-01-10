const { Voiture, Modele } = require("../Models/index");

class VoitureController {
  static async createVoiture(req, res) {
    try {
      let { Kilometrage, Annee, Prix, Nom } = req.body;
      
      Kilometrage = parseInt(Kilometrage, 10);
      Annee = parseInt(Annee, 10);
      Prix = parseInt(Prix);

      // Id du modèle basé sur le nom

      const modele = await Modele.findOne({ where: { Nom: Nom } });
      if (!modele) {
        return res.status(404).json({ error: 'Modèle non trouvé' });
      }

      if (
        !isValideKilometrage(Kilometrage) ||
        !isValideAnnee(Annee) ||
        !isValidePrix(Prix)
      ) {
        return res.status(400).json({ error: "Données invalides" });
      }
      const newVoiture = await Voiture.create({
        Kilometrage,
        Annee,
        Prix,
        Id_modeles : modele.Id_modeles
      });
      res.status(201).json(newVoiture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAllVoitures(_, res) {
    try {
      const voitures = await Voiture.findAll();
      res.status(200).json(voitures);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getVoitureById(req, res) {
    const { id } = req.params;
    try {
      const voiture = await Voiture.findByPk(id);
      if (!voiture) {
        return res.status(404).json({ message: "Voiture non trouvée" });
      }
      res.status(200).json(voiture);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async updateVoiture(req, res) {
    const { id } = req.params;
    let { Kilometrage, Annee, Prix, Nom } = req.body;

    try {
      
      Kilometrage = parseInt(Kilometrage, 10);
      Annee = parseInt(Annee, 10);
      Prix = parseFloat(Prix);

      let Id_modeles = null;
      if (Nom) {
        const modele = await Modele.findOne({ where: { Nom: Nom } });
        if (!modele) {
          return res.status(404).json({ error: "Modèle non trouvé" });
        }
        Id_modeles = modele.ID_modele;
      }

      // Valider les données
      if (
        !isValideKilometrage(Kilometrage) ||
        !isValideAnnee(Annee) ||
        !isValidePrix(Prix)
      ) {
        return res.status(400).json({ error: "Données invalides" });
      }

      // Mettre à jour la voiture
      const [updated] = await Voiture.update(
        { Kilometrage, Annee, Prix, Id_modeles },
        { where: { ID_voiture: id } }
      );

      if (updated) {
        const updatedVoiture = await Voiture.findByPk(id);
        res.status(200).json(updatedVoiture);
      } else {
        res.status(404).json({ message: "Voiture non trouvée" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async deleteVoiture(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Voiture.destroy({ where: { Id_voiture: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Voiture non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

function isValideKilometrage(km) {
  return typeof km === "number" && km >= 0;
}

function isValideAnnee(annee) {
  const currentYear = new Date().getFullYear();
  return typeof annee === "number" && annee > 1900 && annee <= currentYear;
}

function isValidePrix(prix) {
  return typeof prix === "number" && prix > 0;
}

module.exports = VoitureController;
