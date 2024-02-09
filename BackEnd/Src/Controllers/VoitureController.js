const { Voiture, Modele, Images, sequelize } = require("../Models/index");
const fs = require("fs").promises;
const path = require("path");

class VoitureController {
  // Obtenir toutes les voitures avec le nom du modèle
  static async getAllVoitures(_, res) {
    try {
      const voitures = await Voiture.findAll({
        include: [
          {
            model: Modele,
            attributes: ["Nom"],
          },
          {
            model: Images,
            attributes: ["Id_images", "Url"],
          },
        ],
      });
      res.status(200).json(voitures);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Obtenir une voiture spécifique par son ID
  static async getVoitureById(req, res) {
    try {
      const voiture = await Voiture.findByPk(req.params.id, {
        include: [
          {
            model: Modele,
            attributes: ["Nom"],
          },
          {
            model: Images,
            attributes: ["Id_images", "Url"],
          },
        ],
      });

      if (!voiture) {
        return res.status(404).json({ message: "Voiture non trouvée" });
      }
      res.status(200).json(voiture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Créer une nouvelle voiture
  static async createVoiture(req, res) {
    try {
      const { Kilometrage, Annee, Prix, ModelNom } = req.body;

      const modele = await Modele.findOne({ where: { Nom: ModelNom } });
      if (!modele) {
        return res.status(404).json({ message: "Modèle non trouvé" });
      }

      const newVoiture = await Voiture.create({
        Kilometrage,
        Annee,
        Prix,
        Id_modeles: modele.Id_modeles,
      });

      res.status(201).json(newVoiture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Mettre à jour une voiture
  static async updateVoiture(req, res) {
    try {
      const { Kilometrage, Annee, Prix, ModelNom } = req.body;
      const voiture = await Voiture.findByPk(req.params.id, {
        include: [{ model: Modele, attributes: ["Nom"] }],
      });

      if (!voiture) {
        return res.status(404).json({ message: "Voiture non trouvée" });
      }

      const modele = await Modele.findOne({ where: { Nom: ModelNom } });
      if (!modele) {
        return res.status(404).json({ message: "Modèle non trouvé" });
      }

      await voiture.update({
        Kilometrage,
        Annee,
        Prix,
        Id_modeles: modele.Id_modeles,
      });

      const updatedVoiture = {
        ...voiture.toJSON(),
        Modele: { Nom: modele.Nom },
      };

      res.status(200).json(updatedVoiture);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Supprimer une voiture avec ses images associées
  static async deleteVoiture(req, res) {
    const transaction = await sequelize.transaction();
    try {
      const voiture = await Voiture.findByPk(
        req.params.id,
        {
          include: [Images],
        },
        { transaction }
      );

      if (!voiture) {
        await transaction.rollback();
        return res.status(404).send("Voiture non trouvée");
      }

      // Suppression des images associées à la voiture du serveur
      for (const image of voiture.Images) {
        const filePath = path.resolve("Public/Uploads", image.Nom);
        try {
          await fs.unlink(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.error(
              `Erreur lors de la suppression du fichier ${filePath}:`,
              err
            );
            throw err;
          }
        }
      }

      // Suppression des entrées de la base de données
      await Images.destroy({
        where: { Id_voiture: voiture.Id_voiture },
        transaction,
      });
      await Voiture.destroy({
        where: { Id_voiture: voiture.Id_voiture },
        transaction,
      });

      // Commit de la transaction pour appliquer les changements
      await transaction.commit();
      res.send("Voiture et ses images associées supprimées avec succès");
    } catch (error) {
      // Rollback de la transaction en cas d'erreur
      await transaction.rollback();
      console.error(
        "Erreur serveur lors de la suppression de la voiture et de ses images associées:",
        error
      );
      res.status(500).send("Erreur serveur lors de la suppression");
    }
  }
}

module.exports = VoitureController;
