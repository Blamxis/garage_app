const { Annonce, Voiture, Modele, Images } = require("../Models/index");

class AnnonceController {
  static async convertirDateFrancaiseEnSQL(dateFrancaise) {
    const [jour, mois, annee] = dateFrancaise.split("/");
    return `${annee}-${mois}-${jour}`;
  }

  static async createAnnonce(req, res) {
    try {
      const { Nom, Id_voiture, Id_user, Carburant, Transmission } = req.body;

      // Mise à jour de la date de publication avec la date actuelle
      const datePublication = new Date();

      // Création de l'annonce
      const newAnnonce = await Annonce.create({
        Nom,
        Id_voiture,
        Id_user,
        Carburant,
        Transmission,
        Date_publication: datePublication,
      });

      res.status(201).json(newAnnonce);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async updateAnnonce(req, res) {
    const { id } = req.params;
    try {
      const { Id_voiture, Id_user, IsVisible, Carburant, Transmission } =
        req.body;

      // Update de la date de publication avec la date actuelle
      const datePublication = new Date();

      // Update de l'annonce
      const [updated] = await Annonce.update(
        {
          Id_voiture,
          Id_user,
          Date_publication: datePublication,
          IsVisible,
          Carburant,
          Transmission,
        },
        { where: { Id_annonces: id } }
      );

      if (updated === 0) {
        res.status(404).json({ message: "Annonce non trouvée" });
      } else {
        const updatedAnnonce = await Annonce.findByPk(id);
        res.status(200).json(updatedAnnonce);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAllAnnonces(req, res) {
    const includeInvisible = req.query.includeInvisible === 'true';
    try {
      let whereClause = {};
      if (!includeInvisible) {
        whereClause.IsVisible = true;
      }
      const annonces = await Annonce.findAll({
        where: whereClause,
        include: [
          {
            model: Voiture,
            include: [{ model: Modele }, { model: Images }],
          },
        ],
      });
      if (annonces.length === 0) {
        return res.status(200).json({ message: "Aucune annonce pour le moment" });
      }
      res.status(200).json(annonces);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAnnonceById(req, res) {
    const { id } = req.params;
    const includeInvisible = req.query.includeInvisible === 'true';
    try {
      const annonce = await Annonce.findByPk(id, {
        include: [
          {
            model: Voiture,
            include: [
              { model: Modele },
              { model: Images }
            ]
          }
        ]
      });
  
      if (!annonce || (!annonce.IsVisible && !includeInvisible)) {
        return res.status(404).json({ message: "Annonce non trouvée ou non visible" });
      }
  
      res.status(200).json(annonce);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
  

  static async deleteAnnonce(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Annonce.destroy({ where: { Id_annonces: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Annonce non trouvée" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

module.exports = AnnonceController;
