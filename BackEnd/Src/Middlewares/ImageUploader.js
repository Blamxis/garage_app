const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

class ImageUploader {
  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "Public/Uploads");
      },
      filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        let filename;

        if (req.params.id) {
          filename = `image-${req.params.id}${extension}`;
        } else {
          // si req.params non dispo use uuid
          filename = `image-${uuidv4()}${extension}`;
        }

        cb(null, filename);
      },
    });

    const fileFilter = (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|webp/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(
          new Error(
            "Seuls les fichiers .png, .jpg, .jpeg, et .webp sont acceptés"
          )
        );
      }
    };

    this.upload = multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    });
  }

  single(fieldName) {
    return this.upload.single(fieldName);
  }

  array(fieldName, maxCount) {
    return this.upload.array(fieldName, maxCount);
  }
}

module.exports = new ImageUploader();
