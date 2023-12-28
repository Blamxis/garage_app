const { Avis } = require("../Models/index");

class AvisController {
  static convertirDateFrancaiseEnSQL(dateFrancaise) {
    const [jour, mois, annee] = dateFrancaise.split("/");
    return `${annee}-${mois}-${jour}`;
  }

  static async createAvis(req, res) {
    try {
      const { Nom, Prenom, Description, Date: dateReçue, Note, Id_user } = req.body;

      // Validation du format de la date (format français : jj/mm/aaaa)
      const regexDateFrancaise = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regexDateFrancaise.test(dateReçue)) {
        return res.status(400).json({ error: "Le format de la date doit être jj/mm/aaaa" });
      }

      const dateSQL = AvisController.convertirDateFrancaiseEnSQL(dateReçue);

      // Création de l'avis avec ou sans id_user
      const newAvis = await Avis.create({
        Nom,
        Prenom,
        Description,
        Date: dateSQL,
        Note,
        Status: "en attente", // Le statut par défaut est 'en attente'
        Id_user: Id_user || null, // id_user est optionnel
      });

      res.status(201).json(newAvis);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Récupérer tous les avis
  static async getAllAvis(_, res) {
    try {
      const avis = await Avis.findAll();
      if (avis.length === 0) {
        return res.status(200).json({ message: "Aucun avis pour le moment" });
      }
      res.status(200).json(avis);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Récupérer un avis par son ID
  static async getAvisById(req, res) {
    const { id } = req.params;
    try {
      const avis = await Avis.findByPk(id);
      if (!avis) {
        return res.status(404).json({ message: "Avis non trouvé" });
      }
      res.status(200).json(avis);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Mettre à jour un avis
  static async updateAvis(req, res) {
    const { id } = req.params;
    try {
      console.log("Données reçues:", req.body);
      let { Date: dateReçue, Status } = req.body;

      let dateTraitée;
      if (dateReçue) {
        const regexDateFrancaise = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexDateFrancaise.test(dateReçue)) {
          return res.status(400).json({ error: "Le format de la date doit être jj/mm/aaaa" });
        }
        dateTraitée = AvisController.convertirDateFrancaiseEnSQL(dateReçue);
      } else {
        dateTraitée = new Date().toISOString().slice(0, 10);
      }

      // Validation du statut
      if (Status && !["en attente", "approuvé", "rejeté"].includes(Status)) {
        return res.status(400).json({ error: "Statut invalide" });
      }
      
      // Mise à jour de l'avis
      const updateData = { Date: dateTraitée, Status };
      const [updated] = await Avis.update(updateData, {
        where: { Id_avis: id },
      });

      if (updated === 0) {
        // Si aucun avis modifié
        res.status(404).json({ message: "Avis non trouvé" });
      } else {
        // Si avis mis a jour avec succès
        const updatedAvis = await Avis.findByPk(id);
        res.status(200).json(updatedAvis);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Supprimer un avis
  static async deleteAvis(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Avis.destroy({ where: { Id_avis: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Avis non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

module.exports = AvisController;
