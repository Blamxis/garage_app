const { Marque } = require("../Models/index");

class MarqueController {
  
  static async createMarque(req, res) {
    try {
      const { Nom } = req.body;

      // On valide les données
      if (!isValidName(Nom)) {
        return res.status(400).json({ error: "Données invalides " });
      }

      // création de la marque
      const newMarque = await Marque.create(
        {
          Nom
        },
        {
          fields: ["Nom"]
        }
      );
      res.status(201).json(newMarque);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur " });
    }
  }

  // Get all Marque
  static async getAllMarques(_, res) {
    try {
      const marques = await Marque.findAll();
      res.status(200).json(marques);
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Get Marque By Id
  static async getMarqueById(req, res) {
    const { id } = req.params;
    try {
      const marque = await Marque.findByPk(id);
      if (!marque) {
        return res.status(404).json({ message: "Marque non trouvée" });
      }
      res.status(200).json(marque);
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Update Marque
  static async updateMarque(req, res) {
    const { id } = req.params;
    try {
      const { Nom } = req.body;

      // Validation des données
      if (Nom && !isValidName(Nom)) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const updateData = { ...req.body };

      const [updated] = await Marque.update(updateData, {
        where: { Id_marques: id },
      });

      if (updated) {
        const updatedMarque = await Marque.findByPk(id);
        res.status(200).json(updatedMarque);
      } else {
        res.status(404).json({ message: "Marque non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Delete Marque
  static async deleteMarque(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Marque.destroy({ where: { Id_marques: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Marque non trouvée" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

// Fonction de validation pour le nom de la marque
function isValidName(Nom) {
  return Nom && Nom.length <= 50;
}

module.exports = MarqueController;
