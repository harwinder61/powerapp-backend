import * as multer from "multer";
import * as path from "path";

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, "./public/");
  },
  // destination: './uploads/',
  filename: (req: any, file: any, cb: any) => {
    const filename = file.originalname;
    // const fileExtension = filename.split(".").pop();
    cb(null, Date.now() + filename);
  },
});

export const fileUploadOptions = () => {
  return {
    storage,
    // fileFilter: (req: any, file: any, cb: any) => {
    //   if (
    //     file.mimetype === "image/jpeg" ||
    //     file.mimetype === "image/png" ||
    //     file.mimetype === "image/gif" ||
    //     file.mimetype === "application/pdf" ||
    //     file.mimetype === "application/msword"
    //   ) {
    //     cb(null, true);
    //   } else {
    //     cb(new Error("Only .jpeg, png or gifs files are accepted"), false);
    //   }
    // },
    limits: {
      fieldNameSize: 255,
      fileSize: 1024 * 1024 * 20,
    },
  };
};
