const { Service, User } = require("../Models/index");

class ServiceController {
  // Create a Service
  static async createService(req, res) {
    try {
      const { Nom, Type, Id_user } = req.body;

      // On valide les données
      if (!isValidName(Nom) || !isValidType(Type)) {
        return res.status(400).json({ error: "Données invalides " });
      }

      // On créé le service
      const newService = await Service.create(
        {
          Nom,
          Type,
          Id_user,
        },
        {
          fields: ["Nom", "Type", "Id_user"],
        }
      );
      res.status(201).json(newService);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur " });
    }
  }

  // Get
  static async getAllServices(_, res) {
    try {
      const services = await Service.findAll();
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Get By Id
  static async getServiceById(req, res) {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return res.status(404).json({ message: "Service non trouvé" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Get By Type
  static async getServicesByType(req, res) {
    const { type } = req.params;
    try {
      const services = await Service.findAll({
        where: { Type: type }
      });
      if (!services || services.length === 0) {
        return res.status(404).json({ message: "Aucun service trouvé pour ce type" });
      }
      res.status(200).json(services);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Update
  static async updateService(req, res) {
    const { id } = req.params;
    try {
      const { Nom, Type, Id_user } = req.body;

      // Validation des données
      if ((Nom && !isValidName(Nom)) || (Type && !isValidType(Type))) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const updateData = { ...req.body };

      if (Id_user) {
        // Vérification si l'utilisateur existe avant de l'assigner
        const userExists = await User.findByPk(Id_user);
        if (!userExists) {
          return res.status(400).json({ error: "Utilisateur non valide" });
        }
        updateData.Id_user = Id_user;
      }

      const [updated] = await Service.update(updateData, {
        where: { Id_serv: id },
      });

      if (updated) {
        const updatedService = await Service.findByPk(id);
        res.status(200).json(updatedService);
      } else {
        console.error("Erreur serveur:", updated);
        res.status(404).json({ message: "Service non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  // Delete
  static async deleteService(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Service.destroy({ where: { Id_serv: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Service non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

// Fonction de validation pour le nom de service
function isValidName(Nom) {
  return Nom && Nom.length <= 50;
}

// Fonction de validation pour le type de service
function isValidType(Type) {
  return Type && Type.length <= 50;
}

module.exports = ServiceController;
