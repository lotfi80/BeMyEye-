import multer from "multer";

export const imagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "postImages");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const imagesUpload = multer({ storage: imagesStorage });
