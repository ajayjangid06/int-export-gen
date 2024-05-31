"use client";
import Wrapper from "@/app/components/Wrapper";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const MyUploads = () => {

  const router = useRouter();

  const [uploadedImages, setUploadedImages] = useState([]);
  useEffect(() => {
    async function getMyUploads() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/my-uploads`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        setUploadedImages(response.data.images);
      } catch (error) {
        console.error("Login failed", error);
      }
    }
    if(localStorage.getItem("token")) {
      getMyUploads();
    } else {
      router.push("/signin");
    }
  }, []);

  const handleUploadButton = (e) => {
    e.preventDefault();
    router.push("/upload-files");
  };

  return (
    <Wrapper className="lg:w-2/4 md:w-3/4 sm:w-4/5 w-full">
      <h4
        // href={'/upload-files'}
        className="mb-2 font-semibold leading-6"
      >
        Uploaded files
      </h4>
      <button
        onClick={handleUploadButton}
        className="border border-gray-300 rounded-lg py-3 px-5 mb-5 mx-auto block text-sm"
      >
        Upload
      </button>
      <div className="overflow-y-auto max-h-96">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr className="text-gray-400 bg-white border-b">
              <th
                scope="col"
                className="text-sm text-left px-3 py-4 capitalize"
              >
                Picture
              </th>
              <th
                scope="col"
                className="flex items-center text-sm text-left px-3 py-4 capitalize"
              >
                Status
                <svg x="0" y="0" viewBox="0 0 512 512" className="w-3 h-3 ms-2">
                  <g>
                    <path
                      d="M232.166 89.539c6.248 6.248 6.248 16.379 0 22.627s-16.379 6.248-22.627 0l-57.54-57.54V496c0 8.837-7.163 16-16 16s-16-7.163-16-16V54.628L62.46 112.166a15.957 15.957 0 0 1-11.313 4.687 15.943 15.943 0 0 1-11.313-4.687c-6.248-6.248-6.248-16.379 0-22.627l84.854-84.853c6.249-6.249 16.38-6.249 22.627 0zm240.001 310.294c-6.248-6.248-16.379-6.248-22.627 0l-57.539 57.539V16c0-8.837-7.163-16-16-16s-16 7.163-16 16v441.374l-57.539-57.541c-6.246-6.248-16.377-6.249-22.627 0-6.248 6.248-6.249 16.379 0 22.627l84.852 84.854a15.997 15.997 0 0 0 22.626 0l84.854-84.854c6.248-6.248 6.248-16.379 0-22.627z"
                      fill="#9ca3af"
                      opacity="1"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </th>
              <th scope="col" className="text-sm text-left px-3 py-4">Name</th>
              <th scope="col" className="text-sm text-left px-3 py-4">Size</th>
            </tr>
          </thead>
          <tbody>
            {uploadedImages?.map((data) => (

              <tr className="border-b" key={data.id + "image"}>
                <td className="text-sm text-left px-3 py-4">
                  <Image
                    width={30}
                    height={30}
                    alt="image"
                    src={data.url}
                  />
                </td>
                <td className="text-sm text-left px-3 py-4">{data.status}</td>
                <td>
                  <Link
                    href={data.url}
                    target="_blank"
                  >
                    {data.originalName}
                  </Link>
                  {/* <button 
                    className="flex items-center text-sm text-left px-3 py-4"
                    // onClick={()=> window.open(data.url, '_blank', 'noopener,noreferrer')}
                >
                    <svg className="w-5 h-5 me-2" viewBox="0 0 30 30">
                      <g>
                        <path
                          d="M25.961 3.05H4.04A3.794 3.794 0 0 0 .25 6.839V23.16a3.794 3.794 0 0 0 3.79 3.79h21.921a3.794 3.794 0 0 0 3.789-3.79V6.839a3.795 3.795 0 0 0-3.789-3.789zm2.289 20.11a2.292 2.292 0 0 1-2.289 2.29H4.04a2.292 2.292 0 0 1-2.29-2.29v-3.51l6.891-6.886c.392-.383 1.076-.394 1.443.03l9.03 9.852c.662.719 1.768-.287 1.106-1.014L18.175 19.4l2.675-2.887c.365-.414 1.054-.422 1.437-.028l5.963 5.975zm0-2.821-4.9-4.909a2.5 2.5 0 0 0-3.6.069l-2.591 2.8-5.97-6.512c-.905-1.043-2.661-1.096-3.608-.082L1.75 17.529V6.839A2.292 2.292 0 0 1 4.04 4.55h21.921a2.293 2.293 0 0 1 2.289 2.289z"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M16.869 7.112c-3.818.097-3.815 5.684-.002 5.788 3.817-.095 3.818-5.69.002-5.788zm0 4.288c-1.834-.031-1.831-2.751-.002-2.789v.001c1.833.03 1.834 2.756.002 2.788z"
                          fill="#000000"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                    View
                  </button> */}
                </td>
                <td>{`${data.size} kb`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex justify-center items-center mt-5">
        <button className="border border-gray-300 rounded-lg py-2 px-4 mx-auto block text-xs mx-2 text-gray-400">
          Previous
        </button>
        <button className="border border-gray-300 rounded-lg py-2 px-4 mx-auto block text-xs mx-2 text-gray-400">
          Next
        </button>
      </div> */}
    </Wrapper>
  );
};

export default MyUploads;
