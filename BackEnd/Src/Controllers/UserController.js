const { User, Role } = require("../Models/index");
const bcrypt = require("bcrypt");

class UserController {
    // Create user with roles
  static async createUser(req, res) {
    try {
      const { Nom, Prenom, Email, Mdp, Id_role } = req.body;

      if (!isValidEmail(Email) || !isValidPassword(Mdp)) {
        return res.status(400).json({ error: "Données invalides" });
      }

      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUND) || 10;
      const hashedPassword = await bcrypt.hash(Mdp, saltRounds);
  
      const newUser = await User.create({
        Nom,
        Prenom,
        Email,
        Mdp: hashedPassword,
        Id_role
      }, {
        fields: ["Nom", "Prenom", "Email", "Mdp", "Id_role"]
      });

      res.status(201).json({ ...newUser.toJSON(), Mdp: undefined });
    } catch (error) {
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    // Get
  static async getAllUsers(_, res) {
    try {
      const users = await User.findAll({ 
        attributes: { 
          exclude: ["Mdp"], 
          include: ['Nom', 'Prenom', 'Email', 'Id_role'],
        },
        include: [{
          model: Role,
          attributes: ['Nom']
        }]
      });
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
      const { Email, Mdp, Id_role } = req.body;

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

      if (Email) {
        updateData.Email = Email;
      }

      if (Id_role) {
        // Vérification si le role existe avant de l'assigner
        const roleExists = await Role.findByPk(Id_role);
        if (!roleExists) {
          return res.status(400).json({ error: "Rôle non valide"});
        }
        updateData.Id_role = Id_role;
      }

      const [updated] = await User.update(updateData, {
        where: { Id_user: req.params.id },
      });

      if (updated) {
        const updatedUser = await User.findByPk(req.params.id, {
          attributes: { exclude: ["Mdp"] },
          include: [{
            model: Role,
            attributes: ['Nom']
          }]
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
      const deleted = await User.destroy({ where: { Id_user: req.params.id } });

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
