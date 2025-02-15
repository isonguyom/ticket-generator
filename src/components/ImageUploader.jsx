/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function CustomImageUpload({ imageUrl, onImageSelect }) {
  const [imagePreview, setImagePreview] = useState(imageUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = async (file) => {
    if (!file || !(file instanceof File)) {
      console.error("Invalid file selected");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/djtgw5sv5/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImagePreview(data.secure_url);
        onImageSelect(data.secure_url);
      } else {
        console.error("Cloudinary Error:", data);
      }
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      handleImageChange(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);
      handleImageChange(file);
    }
  };

  return (
    <div className="w-full bg-[#052228] border border-[#07373F] rounded-[24px] p-8 pb-10 md:pb-18 flex flex-col gap-4">
      <span className="block">Upload Profile Photo</span>

      <div className="w-full md:h-[150px] md:bg-[#0000002f] md:mt-[36px] md:flex items-center justify-center">
        <div
          className={`w-full relative max-w-[240px] h-[240px] bg-[#0E464F] rounded-[32px] mx-auto text-center transition ${
            isDragging ? "border-4 border-[#24A0B5]" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {!imagePreview ? (
            <label
              className="w-full h-full cursor-pointer flex flex-col items-center justify-center gap-y-4 px-6 md:px-10 border-2 border-[#24A0B5] rounded-[32px] border-opacity-50"
              tabIndex="0"
              role="button"
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && e.target.click()
              }
            >
              {isUploading ? (
                <span className="text-white">Uploading...</span>
              ) : (
                <>
                  <svg
                    width="33"
                    height="32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.764 14.816C25.1813 10.2266 21.2507 6.66663 16.5053 6.66663C12.8307 6.66663 9.63866 8.81463 8.18133 12.2C5.31733 13.056 3.172 15.76 3.172 18.6666C3.172 22.3426 6.16266 25.3333 9.83866 25.3333H11.172V22.6666H9.83866C7.63333 22.6666 5.83866 20.872 5.83866 18.6666C5.83866 16.7946 7.43733 14.9906 9.40266 14.6453L10.1773 14.5093L10.4333 13.7653C11.3707 11.0306 13.6973 9.33329 16.5053 9.33329C20.1813 9.33329 23.172 12.324 23.172 16V17.3333H24.5053C25.976 17.3333 27.172 18.5293 27.172 20C27.172 21.4706 25.976 22.6666 24.5053 22.6666H21.8387V25.3333H24.5053C27.4467 25.3333 29.8387 22.9413 29.8387 20C29.8371 18.8047 29.4348 17.6444 28.6962 16.7046C27.9575 15.7649 26.9251 15.0999 25.764 14.816Z"
                      fill="#FAFAFA"
                    />
                    <path
                      d="M17.8387 18.6666V13.3333H15.172V18.6666H11.172L16.5053 25.3333L21.8387 18.6666H17.8387Z"
                      fill="#FAFAFA"
                    />
                  </svg>
                  <span className="">Drag & drop or click to upload</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                aria-label="Upload an image"
              />
            </label>
          ) : (
            <div className="relative w-full h-full rounded-[32px] overflow-hidden">
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-full h-full block border-2 border-[#24A0B5] rounded-[32px] border-opacity-50"
              />

              {isHovered && (
                <label
                  className="absolute inset-0 bg-[#0000004b] flex flex-col items-center justify-center gap-y-4 px-6 md:px-10 cursor-pointer border-2 border-[#24A0B5] rounded-[32px] border-opacity-50"
                  tabIndex="0"
                  role="button"
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && e.target.click()
                  }
                >
                  <span className="text-white">
                    Drag & drop or click to upload
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

{/* <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-full h-full block border-2 border-[#24A0B5] rounded-[32px] border-opacity-50"
              /> */}
        </div>
      </div>
    </div>
  );
}
