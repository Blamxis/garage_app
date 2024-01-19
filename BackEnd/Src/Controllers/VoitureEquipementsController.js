const { VoitureEquipements } = require("../Models/index");

class VoitureEquipementsController {
  static async createEquipementToVoiture(req, res) {
    try {
      const newPossederOption = await VoitureEquipements.create(req.body);
      res.status(201).json(newPossederOption);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAllPossederOptions(_, res) {
    try {
      const possederOptions = await VoitureEquipements.findAll();
      res.status(200).json(possederOptions);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async deleteEquipementFromVoiture(req, res) {
    const { Id_voiture } = req.body;

    try {
      const deleted = await VoitureEquipements.destroy({
        where: { Id_voiture },
      });

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Voiture non trouvée ou déjà sans équipements" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}


module.exports = VoitureEquipementsController;
