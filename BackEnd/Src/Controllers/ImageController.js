const fs = require('fs');
const fsp = require('fs/promises');
const imageUploader = require('../Middlewares/ImageUploader'); 
const { Images } = require('../Models/index');
const mime = require('mime-types');
const ImageUploader = require('../Middlewares/ImageUploader');

class ImageController {
    
    async create(req, res) {
        try {
          if (!req.files || req.files.length === 0) {
            return res.status(400).send("Aucun fichier fourni");
          }
    
          const imagesData = await Promise.all(req.files.map(async (file) => {
            const mimeType = mime.lookup(file.path);
            const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
            if (!validTypes.includes(mimeType)) {
              await fsp.unlink(file.path);
              return { error: "Type de fichier non valide" };
            }
    
            return Images.create({
              Nom: file.filename,
              Url: file.path,
              Id_voiture: req.body.Id_voiture,
            });
          }));
    
          res.status(201).json(imagesData.filter(image => !image.error));
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }
      }
      

    async getAll(_, res) {
        try {
            const images = await Images.findAll();
            const imagesWithUrls = images.map(image => ({
                ...image.toJSON(),
                Url: `Public/Uploads/${image.Nom}`
            }));
            res.json(imagesWithUrls);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const image = await Images.findByPk(req.params.id);
            if (image) {
                const imagePath = `Public/Uploads/${image.Nom}`;
                res.json(imagePath);
            } else {
                res.status(404).send('Image non trouvée');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    async update(req, res) {
        try {
            await ImageUploader.single('image')(req, res, async (err) => {
                if (err) {
                    return res.status(500).send(err.message);
                }
    
                const idImage = req.params.id;
                const { Id_voiture } = req.body;
    
                // Mise à jour des informations de l'image dans la base de données
                if (req.file) {
                    const nouveauChemin = `Public/Uploads/${req.file.filename}`;
                    await Images.update({ Nom: req.file.filename, Url: nouveauChemin, Id_voiture }, { where: { Id_images: idImage } });
                } else {
                    await Images.update({ Id_voiture }, { where: { Id_images: idImage } });
                }
    
                res.send('Image mise à jour avec succès');
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("Erreur lors de la mise à jour de l'image");
        }
    }
    
    async delete(req, res) {
        try {
            const image = await Images.findByPk(req.params.id);
            if (!image) {
                return res.status(404).send('Image non trouvée');
            }
    
            const filePath = `Public/Uploads/${image.Nom}`;
            
            // On supprime en bdd en premier
            await Images.destroy({ where: { Id_images: req.params.id } });
    
            // On vérifie si le fichier existe avant de le supr
            if (fs.existsSync(filePath)) {
                try {
                    await fsp.unlink(filePath);
                    res.send('Image supprimée avec succès');
                } catch (err) {
                    console.error('Erreur lors de la suppression du fichier:', err);
                    res.status(500).send('Erreur lors de la suppression du fichier');
                }
            } else {
                res.status(404).send('Fichier non trouvé');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
    
}

module.exports = new ImageController();

