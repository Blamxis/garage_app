const { EquipementOptions } = require("../Models/index");

class EquipementOptionsController {
    static async createEquipementOptions(req, res) {
        try {
            const newEquipementOption = await EquipementOptions.create(req.body);
            res.status(201).json(newEquipementOption);
        } catch (error) {
            res.status(500).json({ error: "Erreur Serveur"});
        }
    }

    static async getAllEquipementOptions(_, res) {
        try {
            const equipementOptions = await EquipementOptions.findAll();
            res.status(200).json(equipementOptions);
          } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
          }
    }

    static async getAllEquipementOptionsById(req, res) {
        const {id} = req.params;
        try {
            const equipementOptions = await EquipementOptions.findByPk(id);
            if (!equipementOptions) {
                return res.status(404).json({ message: "Equipement non trouvé" });
            }
            res.status(200).json(equipementOptions);
        } catch (error) {
            res.status(500).json({ error: "Erreur Serveur"});
        }
    }

    static async updateEquipementOptions(req, res) {
        const { id } = req.params;
        try {
            const [updated] = await EquipementOptions.update(req.body, { where: { Id_options: id } });
            if (updated === 0) {
                return res.status(404).json({ message: "Equipement non trouvé" });
            }
            const updatedEquipementOption = await EquipementOptions.findByPk(id);
            res.status(200).json(updatedEquipementOption);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erreur Serveur" });
        }
    }
    

    static async deleteEquipementOptions(req, res) {
        const { id } = req.params;
        try {
            const deleted = await EquipementOptions.destroy({ where: { Id_options: id } });
            if (deleted) {
              res.status(204).send();
            } else {
              res.status(404).json({ message: "Equipement non trouvé" });
            }
          } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
}

module.exports = EquipementOptionsController;