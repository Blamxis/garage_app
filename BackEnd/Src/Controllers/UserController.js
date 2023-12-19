const { User } = require("../Models/index");
const bcrypt = require("bcrypt");

class UserController {
    // Create
  static async createUser(req, res) {
    try {
      const { Nom, Prenom, Email, Mdp } = req.body;

      if (!isValidEmail(Email) || !isValidPassword(Mdp)) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND) || 10;
      const hashedPassword = await bcrypt.hash(Mdp, saltRounds);

      const newUser = await User.create({
        Email,
        Mdp: hashedPassword,
        Nom,
        Prenom,
      });
      res.status(201).json({ ...newUser.toJSON(), Mdp: undefined });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    // Get
  static async getAllUsers(_, res) {
    try {
      const users = await User.findAll({ attributes: { exclude: ["Mdp"] } });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    // Get By Id
  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: { exclude: ["Mdp"] },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    // Update
  static async updateUser(req, res) {
    try {
      const { Email, Mdp } = req.body;

      if ((Email && !isValidEmail(Email)) || (Mdp && !isValidPassword(Mdp))) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const updateData = { ...req.body };

      if (Mdp) {
        updateData.Mdp = await bcrypt.hash(
          Mdp,
          parseInt(process.env.BCRYPT_SALT_ROUND) || 10
        );
      }

      const [updated] = await User.update(updateData, {
        where: { id: req.params.id },
      });

      if (updated) {
        const updatedUser = await User.findByPk(req.params.id, {
          attributes: { exclude: ["Mdp"] },
        });
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    // Delete
  static async deleteUser(req, res) {
    try {
      const deleted = await User.destroy({ where: { id: req.params.id } });

      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regex pour vérifier si l'email est dans un format correcte
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Regex pour vérifier si le mdp contient au moins 8 caractères dont 1 chiffre, 1 lettre minuscule et 1 lettre majuscule.
  return passwordRegex.test(password);
}

module.exports = UserController;
