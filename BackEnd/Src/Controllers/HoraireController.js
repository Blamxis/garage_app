const { Horaire } = require("../Models/index");

class HoraireController {
  static async createHoraire(req, res) {
    try {
      const { Horaire_ouverture, Horaire_fermeture, Id_jours } = req.body;

      // Validation des données
      if (!Horaire_ouverture || !Horaire_fermeture || !Id_jours) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      // Création de l'horaire
      const newHoraire = await Horaire.create({
        Horaire_ouverture,
        Horaire_fermeture,
        Id_jours,
      });

      res.status(201).json(newHoraire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAllHoraires(req, res) {
    try {
      const horaires = await Horaire.findAll();
      res.status(200).json(horaires);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getHoraireById(req, res) {
    const { id } = req.params;
    try {
      const horaire = await Horaire.findByPk(id);
      if (!horaire) {
        return res.status(404).json({ message: "Horaire non trouvé" });
      }
      res.status(200).json(horaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async updateHoraire(req, res) {
    const { id } = req.params;
    try {
      const { Horaire_ouverture, Horaire_fermeture, Id_jours } = req.body;

      // Validation des données
      if (!Horaire_ouverture || !Horaire_fermeture || !Id_jours) {
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      // Mise à jour de l'horaire
      const [updated] = await Horaire.update(
        { Horaire_ouverture, Horaire_fermeture, Id_jours },
        { where: { Id_horaire: id } }
      );

      if (updated) {
        const updatedHoraire = await Horaire.findByPk(id);
        res.status(200).json(updatedHoraire);
      } else {
        res.status(404).json({ message: "Horaire non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async deleteHoraire(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Horaire.destroy({ where: { Id_horaire: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Horaire non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

module.exports = HoraireController;
