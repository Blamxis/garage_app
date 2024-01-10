const { Modele } = require("../Models/index");

class ModeleController {
  
  // Créer un nouveau Modèle
  static async createModele(req, res) {
    try {
      const { Nom, Id_marques } = req.body;

      // Validation des données
      if (!isValidName(Nom)) {
        return res.status(400).json({ error: "Nom invalide" });
      }

      // Création du modèle
      const newModele = await Modele.create({ Nom, Id_marques });
      res.status(201).json(newModele);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Obtenir tous les Modèles
  static async getAllModeles(_, res) {
    try {
      const modeles = await Modele.findAll();
      res.status(200).json(modeles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Obtenir un Modèle par ID
  static async getModeleById(req, res) {
    const { id } = req.params;
    try {
      const modele = await Modele.findByPk(id);
      if (!modele) {
        return res.status(404).json({ message: "Modèle non trouvé" });
      }
      res.status(200).json(modele);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Mettre à jour un Modèle
  static async updateModele(req, res) {
    const { id } = req.params;
    try {
      const { Nom, Id_marques } = req.body;

      // Validation des données
      if (Nom && !isValidName(Nom)) {
        return res.status(400).json({ error: "Nom invalide" });
      }

      const updateData = { Nom, Id_marques };

      const [updated] = await Modele.update(updateData, {
        where: { Id_modeles: id },
      });

      if (updated) {
        const updatedModele = await Modele.findByPk(id);
        res.status(200).json(updatedModele);
      } else {
        res.status(404).json({ message: "Modèle non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Supprimer un Modèle
  static async deleteModele(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Modele.destroy({ where: { Id_modeles: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Modèle non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

// Fonction de validation pour le nom du modèle
function isValidName(name) {
  return typeof name === 'string' && name.trim().length > 0 && name.trim().length <= 50;
}

module.exports = ModeleController;
