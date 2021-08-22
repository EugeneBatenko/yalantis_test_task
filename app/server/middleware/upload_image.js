import multer from 'multer'

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      console.log('Only jpg & png file supported')
      cb(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})

export default upload
