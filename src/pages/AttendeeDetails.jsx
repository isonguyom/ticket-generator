import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import Wrapper from "../components/Wrapper";
import ImageUploader from "../components/ImageUploader";

export default function AttendeeDetails() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: loadFromStorage("ticket-form") || {
      fullName: "",
      email: "",
      avatar: "",
      request: "", // No required validation
    },
  });

  const [selectedImage, setSelectedImage] = useState(watch("avatar"));

  // Image Selection Handler
  const handleImageSelection = (imageFile) => {
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
    setValue("avatar", imageUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    saveToStorage("ticket-form", { ...loadFromStorage("ticket-form"), ...data });
    navigate("/ticket");
  };

  return (
    <Wrapper step={2} label={"Attendee Details"}>
      <div className="w-full md:bg-[#08252B] md:border md:border-[#0E464F] rounded-[32px] md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload Section */}
          <ImageUploader onImageSelect={handleImageSelection} />
          {errors.avatar && (
            <p className="text-red-500 text-sm mt-1">Please upload an avatar.</p>
          )}

          <div className="w-full h-[4px] bg-[#07373F] my-[32px]"></div>

          {/* Name Input */}
          <div>
            <label htmlFor="fullName" className="block mb-[8px]">
              Enter your name *
            </label>
            <input
              id="fullName"
              {...register("fullName", { required: "Name is required" })}
              className="w-full border border-[#07373F] text-white p-3 rounded-[12px]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="my-[32px]">
            <label htmlFor="email" className="block mb-[8px]">
              Enter your email *
            </label>
            <div className="w-full h-fit relative">
              <div className="absolute top-1/2 left-[14px] -translate-y-1/2">
                {/* Email Icon */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z"
                    fill="white"
                  />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full border border-[#07373F] text-white p-3 pl-10 rounded-[12px]"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Special Request */}
          <div>
            <label htmlFor="project" className="block mb-[8px]">
            Special Request?
            </label>
            <textarea
              id="project"
              {...register("request")}
              placeholder="Textarea"
              className="w-full p-3 bg-transparent border border-[#07373F] text-white min-h-[150px] rounded-[12px]"
              onInput={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean); // Split by spaces, remove empty values
                if (words.length > 20) {
                  e.target.value = words.slice(0, 20).join(" "); // Keep only first 20 words
                }
              }}
            />
          </div>

          {/* Button Controls */}
          <div className="mt-[32px] flex flex-col md:flex-row gap-[8px]">
            <button
              type="submit"
              className="w-full md:order-2 bg-[#24A0B5] text-white p-3 rounded-[8px] font-jeju cursor-pointer"
            >
              Get My Free Ticket
            </button>
            <button
              type="button"
              className="w-full border border-[#24A0B5] text-[#24A0B5] p-3 rounded-[8px] font-jeju cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
