import multer from 'multer'


// делаем возможность также добавлять видео в статус а не только фото
//
const fileFilter = (request, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
        cb(null, true)
    } else {
        cb(new Error('Разрешено загружать только видео или изображение!'), false)
    }
}


const storage = multer.memoryStorage()
// делаем возможность также добавлять видео в статус а не только фото
const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 100 * 1024 * 1024} // разрешение на видео
})

export default upload