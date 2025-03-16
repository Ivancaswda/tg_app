import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore.js";
import { toast } from "react-hot-toast";
import { Image, Send, X } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import {useStatusStore} from "../store/useStatusStore.js";

const MessageInput = ({messageEndRef}) => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const {showPicker, setShowPicker} = useStatusStore()
    const { sendMessage } = useChatStore();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Выберите изображение");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

    };

    const handleEmojiSelect = (emoji) => {
        setText((prev) => prev + emoji);
    };


    const handleEmojiClick = (emojiObject) => {
        handleEmojiSelect(emojiObject.emoji)
        setShowPicker(false)
    }

    const removeImage = (event) => {
        event.preventDefault();
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!text.trim() && !imagePreview) {
            return;
        }

        await sendMessage({ text: text.trim(), image: imagePreview });

        setText("");
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (messageEndRef?.current) { // scroll to the bottom after sending the image
        setTimeout(() => {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    return (
        <div className="fixed bottom-0 mt-10  items-end justify-right w-full bg-white dark:bg-gray-900 border-t border-gray-300 p-3">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20  z-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-700
                         flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form  onSubmit={handleSendMessage} className="flex items-center gap-2 w-[100%] sm:w-[73%] left-0 ">
                <div className="flex-1 items-center flex gap-2">
                    <div className='relative inline-block '>
                        <button onClick={() => {
                            setShowPicker(!showPicker)
                        }} >
                            <svg   className="fill-gray-500 hover:fill-blue-500 transition-colors duration-300"  width='20' height='20' xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 512 512">
                                <path
                                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                            </svg>
                        </button>

                        <div className='absolute bottom-[40px]  right-0'>
                          {showPicker &&
                            <EmojiPicker className=' ' onEmojiClick={handleEmojiClick}/>
                          }
                        </div>

                    </div>
                    <input
                        type="text"
                        className="w-full py-2 px-4 border rounded-lg focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите сообщение..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>

                <button
                    type="button"
                    className={`btn btn-circle ${
                        imagePreview ? "text-emerald-500" : "text-zinc-400"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Image className='text-blue-500' size={20} />
                </button>
                <button
                    type="submit"
                    className="btn btn-circle bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={20} className='bg-blue-500' />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
