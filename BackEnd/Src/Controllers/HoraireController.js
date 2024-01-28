const { Horaire, Jours } = require("../Models/index");

class HoraireController {

  // Créer un nouvel horaire
  static async createHoraire(req, res) {
    try {
      const { Horaire_ouverture, Horaire_fermeture, Horaire_ouverture_aprem, Horaire_fermeture_aprem, Id_jours } = req.body;

      if (!Horaire_ouverture || !Horaire_fermeture || !Id_jours) {
        console.log(req.body);
        return res.status(400).json({ error: "Tous les champs sont requis" });
      }

      const newHoraire = await Horaire.create({
        Horaire_ouverture,
        Horaire_fermeture,
        Horaire_ouverture_aprem,
        Horaire_fermeture_aprem,
        Id_jours
      });

      res.status(201).json(newHoraire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Récupérer tous les horaires
  static async getAllHoraires(req, res) {
    try {
        const horaires = await Horaire.findAll({
            include: [Jours]
        });

        const dimanchePresent = horaires.some((horaire) => horaire.Id_jours === 'Dimanche');

        if (!dimanchePresent) {
            const dimancheFerme = {
                Id_jours: 'Dimanche',
                Horaire_ouverture: 'Fermé',
                Horaire_fermeture: 'Fermé',
                Horaire_ouverture_aprem: 'Fermé',
                Horaire_fermeture_aprem: 'Fermé',
            };
            horaires.push(dimancheFerme);
        }

        res.status(200).json(horaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

  // Récupérer un horaire par son ID
  static async getHoraireById(req, res) {
    const { id } = req.params;
    try {
      const horaire = await Horaire.findByPk(id, {
        include: [Jours]
      });
      if (!horaire) {
        return res.status(404).json({ message: "Horaire non trouvé" });
      }
      res.status(200).json(horaire);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Mettre à jour un horaire
  static async updateHoraire(req, res) {
    const { id } = req.params;
    try {
      const { Horaire_ouverture, Horaire_fermeture, Horaire_ouverture_aprem, Horaire_fermeture_aprem, Id_jours } = req.body;

      const updateData = {
        Horaire_ouverture,
        Horaire_fermeture,
        Horaire_ouverture_aprem,
        Horaire_fermeture_aprem,
        Id_jours
      };

      const [updated] = await Horaire.update(updateData, {
        where: { Id_horaire: id }
      });

      if (updated) {
        const updatedHoraire = await Horaire.findByPk(id, {
          include: [Jours]
        });
        res.status(200).json(updatedHoraire);
      } else {
        res.status(404).json({ message: "Horaire non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Supprimer un horaire
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
