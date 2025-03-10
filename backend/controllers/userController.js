
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateToken from "../middlewares/utils.js";
import {v2 as cloudinary} from 'cloudinary'

const signup = async (request, response) => {
    try {
        const {fullName, email, password} = request.body;
        console.log('REQUEST BODY:', request.body)

        if (!fullName || !email || !password) {
            return  response.json({success:false, message: 'Заполните все поля! '})
        }

        if ( password.length < 6) {
            return  response.json({success:false, message: 'пароль должен иметь хотя-бы 6 символов '})
        }
        const user = await userModel.findOne({email})

        if (user) {
            return  response.json({success:false, message: 'Пользователь уже существует'})
        }

        // encrypting password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser =  new userModel({
            email,
            fullName,
            password: hashedPassword
        })

        const userData = {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            profilePic: newUser.profilePic,
            description: newUser.description
        }

        if (newUser) {
            // generating token
            generateToken(newUser._id, response)

            console.log(newUser)
            await newUser.save()

            response.json({success:true, user:userData, message: 'Вы успешно зарегистрировались'})
        } else {
            response.json({success:false, message: 'Не удалось создать пользователя '})
        }
    } catch (error) {
        response.json({success:false, message:error.message})
    }
}

const login = async (request, response) => {
    try {
        const {email, password} = request.body

        const user = await userModel.findOne({email})

        if (!user) {
            response.json({success:false, message: 'Пользователь не существует'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return response.json({ success:false,message: 'Неверный пароль'})
        }

        const userData = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic,
            description: user.description
        }

        generateToken(user._id, response)

        response.json({success:true, user:userData, message: 'Вы успешно вошли в аккаунт!'})

    } catch (error) {
        response.json({success:false, message: 'Не удалось войти в аккаунт'})
    }
}

const logout = async (request, response) => {
    try {
        response.cookie('jwt', "", {maxAge: 0})
        response.json({success:true, message: 'Вы успешно вышли из аккаунта!'})
    } catch (error) {
        response.json({success:false, message: 'Не удалось выйти из системы!'})
    }
}




const updateProfile = async (request, response) => {
    try {
        const { fullName, description } = request.body;


        const userId = request.user._id; // получаем userId из middleware

        if (!fullName && !description) {
            return response.json({ success: false, message: 'Нет данных для обновления!' });
        }

        let updateData = {}; // объект для обновления данных пользователя

        if (fullName) {
            updateData.fullName = fullName;
        }

        if (description) {
            updateData.description = description
        }



        // Обновляем пользователя одним запросом
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        response.json({ success: true, message: 'Профиль обновлен!', user: updatedUser });

    } catch (error) {
        response.json({ success: false, message: error.message });
    }
};

const updateImage = async (request, response) => {
    try {
        const {profilePic} = request.body

        const userId = request.user._id

        if (!profilePic) {
            return response.json({success:false, message: 'Изображение необходимо!'})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        const updateImage = await userModel.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url},
            {new:true}
        )
        response.json({success:true, updateImage, message:"Аватарка успещно обновлена!"})

    } catch (error) {
        response.json({success:false, message:error.message})
    }
}

const checkAuth  = (request, response) => {
    try {
        response.json(request.user)
    } catch (error) {
        console.log('Error in checkAuth controller', error.message)
        response.json({success:false, message:error.message})
    }
}


export {signup, login, logout, updateProfile, checkAuth, updateImage}