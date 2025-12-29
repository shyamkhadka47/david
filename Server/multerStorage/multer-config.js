import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const sliderStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/slider`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const serviceStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/service`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const testimonialStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/testimonial`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/gallery`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const aboutStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/about");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const bannerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/bannervideos');
  },
  filename: function (req, file, cb) {
   
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const StorytellerStorage= multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/storytellers");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})

export const storytellerupload= multer({storage:StorytellerStorage})

export const bannerupload = multer({ storage:bannerStorage });

export const logoupload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export const sliderupload = multer({
  storage: sliderStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});
export const serviceupload = multer({
  storage: serviceStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export const testimonialupload = multer({
  storage: testimonialStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export const galleryupload = multer({
  storage: galleryStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

export const aboutupload = multer({
  storage: aboutStorage,
  limits: { fileSize: 1 * 1024 * 1024 },
});
