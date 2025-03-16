import statusModel from "../models/statusModel.js";
import {v2 as cloudinary} from 'cloudinary'
const getStatuses = async (request, response) => {
    try {
        const statuses = await statusModel.find({}).populate({
            path: "userId",
            select: "fullName profilePic",
            model: "user"
        }).lean() // Подгружаем имя и аватар

        console.log(statuses)
        response.json({success:true, statuses})
    } catch (error) {
        response.json({success:false, message: error.message})
    }


}


const getSpecificStatus = async (request, response) => {
    try {
        const {id} = request.params
        const specificStatusData = await statusModel.findById(id).populate({
            path: "userId",
            select: "fullName profilePic",
            model: "user"
        }).lean()

        if (!specificStatusData) {
            return response.json({ success: false, message: "Статус не найден" });
        }

        response.json({success:true, specificStatusData})

    } catch (error) {
        response.json({success:false, message: error.message})

    }
}


const uploadStatus = async (request, response) => {
    try {
        const {userId, text} = request.body

        const file = request.file

        console.log(request.file)

        let mediaUrl = null

            //
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const statusCount = await statusModel.countDocuments({ // checking
            // how many statuses user had created for this day
            userId,
            createdAt: { $gte: today }
        })

        if (statusCount >= 5) {
            return response.json({success:false, message: 'Вы не можете установить больше 5 статусов в сутки!'})
        }


        if (!userId) {
            return response.json({success:false, message: 'Пользователь не найден'})
        }

        if (!text) {
            return response.json({success:false, message: 'Необходим текст статуса'})
        }

        if (file) {
            try {
                // defining image or video we`re uploading into status
                const resource_type = file.mimetype.startsWith("video/") ? "video" : "image"

                mediaUrl = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: resource_type },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        }
                    );
                    uploadStream.end(file.buffer); // Отправляем файл
                });
            } catch (uploadError) {
                console.error("Ошибка загрузки файла:", uploadError);
                return response.json({ success: false, message: uploadError.message });
            }
        }

        await statusModel.create( // creating a new status
            {
                userId,
                text,
                mediaUrl,
                createdAt: new Date(),
            })

        console.log(mediaUrl)

        response.json({success:true, message: 'Статус установлен!'})

    } catch (error) {
        response.json({success:false, message: error.message})
    }
}

const removeStatus = async (request, response) => {
    try {
        const {id} = request.body
        await statusModel.findByIdAndDelete(id)
        response.json({success:true, message: 'Статус удалён!'})
    } catch (error) {
        response.json({success:false, message: 'Не удалось удалить статус!'})
    }
}

const removeParamsStatus = async (request, response) => {
    try {



    } catch (error) {
        response.json({success:false, message: 'Не удалось удалить статус!'})
    }
}

const rateStatus = async (request, response) => {
    try {
        const {id, rating} = request.body

        const status = await statusModel.findById(id)
        if (!status) {
            return response.json({success:false, message: 'Статус не найден!'})
        }

        if (!status.ratings) {
            status.ratings = [];
        }


        status.ratings.push(rating);

        status.averageRating = status.ratings.reduce((sum, r) => sum + r, 0) / status.ratings.length;


        await status.save()

        response.json({success:true, message: 'Оценка сохранена', averageRating: status.averageRating})

    } catch (error) {
        response.json({success:false, message: error.message})
    }
}


export {getStatuses, getSpecificStatus, uploadStatus,  removeStatus, rateStatus}
