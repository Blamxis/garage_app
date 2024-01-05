const { Message } = require("../Models/index");

class MessageController {
  static async createMessage(req, res) {
    try {
      const { Objet , Type ,Nom, Prenom, Email, Telephone, Description } = req.body;

      // Validation des données
      if (!Nom || !Prenom || !Email || !Telephone || !Description || !Type) {
        return res.status(400).json({ error: "Données invalides" });
      }

      // Création du message
      const newMessage = await Message.create({
        Nom,
        Prenom,
        Email,
        Telephone,
        Description,
        Type,
        Objet: Objet || null,
      });

      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getAllMessages(_, res) {
    try {
      const messages = await Message.findAll();
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async getMessageById(req, res) {
    const { id } = req.params;
    try {
      const message = await Message.findByPk(id);
      if (!message) {
        return res.status(404).json({ message: "Message non trouvé" });
      }
      res.status(200).json(message);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async updateMessage(req, res) {
    const { id } = req.params;
    try {
      const { Objet, Type, Nom, Prenom, Email, Telephone, Description, Id_user } = req.body;

      // Validation des données (ajoutez vos propres règles de validation)
      if (!Nom || !Prenom || !Email || !Telephone || !Description || !Type || !Id_user) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const updateData = {
        Nom,
        Prenom,
        Email,
        Telephone,
        Description,
        Type,
        Objet: Objet || null,
        Id_user: Id_user || null,
      };

      const [updated] = await Message.update(updateData, {
        where: { Id_messages: id },
      });

      if (updated) {
        const updatedMessage = await Message.findByPk(id);
        res.status(200).json(updatedMessage);
      } else {
        res.status(404).json({ message: "Message non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }

  static async deleteMessage(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Message.destroy({ where: { Id_messages: id } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Message non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

module.exports = MessageController;
