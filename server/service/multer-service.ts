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

export const profileImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "profileImages");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const profileImagesUpload = multer({ storage: profileImagesStorage });

export const attachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "attachments");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
export const attachmentUploads = multer({ storage: attachmentStorage });
