"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const UploadForm = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [imageData, setImageData] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const router = useRouter();
    useEffect(() => {
        if(!localStorage.getItem("token")) {
            router.push("/signin");
        }
    }, [])
    


    const onSubmit = async (e) => {
        e.preventDefault();
        if (!date) {
            alert("Date is required");
            return;
        }
        if (!time) {
            alert("Time is required");
            return;
        }
        if (!imageData) {
            alert("Image is required");
            return;
        }
        let publishAt = date + " " + time;
        const formData = new FormData();
        formData.append("image", imageData);
        // console.log(imageData, 'asdh');
        formData.append("publishAt", publishAt);
        formData.append("imageData", imageUrl);
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`, 
                formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        authorization: localStorage.getItem("token")
                    },
                }
            );
            // localStorage.setItem('token', response.data.token);
            router.push('/my-uploads');
        } catch (error) {
            console.error('upload failed', error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        console.log(file, 'fsdjkfha');

        // Check if a file is selected
        if (!file) {
            console.warn("No file selected");
            return;
        }

        // Validate file type (optional)
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
            console.error("Invalid file type. Only JPG and PNG allowed.");
            return;
        }
        setImageData(file);
        // Access and log image data
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageUrl(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setImageUrl("");
        setImageData("");
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <Wrapper className="xl:w-1/4 w-96">
            <h2 className="mt-0 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Upload Your Files
            </h2>
            <h5 className="text-sm text-gray-500">
                Upload File and then Choose Date & Time to Publish
            </h5>
            <div className="mt-4">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="flex items-center justify-center w-full">
                        {imageUrl ? (
                            <div className="image-block my-5">
                                <button
                                    className="cross-icon"
                                    onClick={(e) => handleRemoveImage(e)}
                                >
                                    <svg
                                        width={10}
                                        height={10}
                                        viewBox="0 0 329.269 329"
                                    >
                                        <g>
                                            <path
                                                d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                                                fill="#6b7280"
                                                opacity="1"
                                                dataOriginal="#000000"
                                            ></path>
                                        </g>
                                    </svg>
                                </button>
                                <Image
                                    height={150}
                                    width={150}
                                    src={imageUrl}
                                    alt="Uploaded Image Preview"
                                />
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-24 border-dotted border-2 border-gray-300 rounded-lg cursor-pointe">
                                <div className="flex items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-6 h-6 me-3 text-gray-400 dark:text-gray-400"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-0 text-sm text-gray-400 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Drag Files
                                        </span>
                                    </p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    
                                />
                            </label>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="date"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Publish Date
                        </label>
                        <div className="mt-2">
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={handleDateChange}
                                className="mt-1 block w-56 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="time"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Publish Time
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={handleTimeChange}
                                className="mt-1 block w-56 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-black flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
};

export default UploadForm;
