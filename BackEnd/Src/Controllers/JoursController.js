const { Jours } = require("../Models/index");

class JoursController {

  // Créer un jour
  static async createJour(req, res) {
    try {
      const { Nom, Id_user } = req.body;

      // Création du jour
      const newJour = await Jours.create({
        Nom,
        Id_user,
      });

      res.status(201).json(newJour);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Récupérer tous les jours
  static async getAllJours(_, res) {
    try {
      const jours = await Jours.findAll();
      if (jours.length === 0) {
        return res.status(200).json({ message: 'Aucun jour disponible' });
      }
      res.status(200).json(jours);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Récupérer un jour par son ID
  static async getJourById(req, res) {
    const { id } = req.params;
    try {
      const jour = await Jours.findByPk(id);
      if (!jour) {
        return res.status(404).json({ message: "Jour non trouvé" });
      }
      res.status(200).json(jour);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Mettre à jour un jour
  static async updateJour(req, res) {
    const { id } = req.params;
    try {
      const { Nom, Id_user } = req.body;

      // Mise à jour du jour
      const updateData = {
        Nom,
        Id_user, // L'ID de l'utilisateur associé à ce jour
      };

      const [updated] = await Jours.update(updateData, {
        where: { Id_jours: id },
      });

      if (updated) {
        const updatedJour = await Jours.findByPk(id);
        res.status(200).json(updatedJour);
      } else {
        res.status(404).json({ message: "Jour non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Supprimer un jour
  static async deleteJour(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Jours.destroy({ where: { Id_jours: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Jour non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

module.exports = JoursController;