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
      request: "",
    },
  });

  const [error, setError] = useState("");
  const avatar = watch("avatar"); // Watch avatar field for updates

  const handleImageSelect = (url) => {
    setValue("avatar", url);
    setError("");
  };

  const onSubmit = (data) => {
    if (!data.avatar) {
      setError("Profile photo is required!");
      return;
    }

    saveToStorage("ticket-form", {
      ...loadFromStorage("ticket-form"),
      ...data,
    });
    navigate("/ticket");
  };

  return (
    <Wrapper step={2} label={"Attendee Details"}>
      <div className="w-full md:bg-[#08252B] md:border md:border-[#0E464F] rounded-[32px] md:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload Section */}
          <ImageUploader
            onImageSelect={handleImageSelect}
            imagePreview={avatar}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}

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
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="my-[32px]">
            <label htmlFor="email" className="block mb-[8px]">
              Enter your email *
            </label>
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
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Special Request */}
          <div>
            <label htmlFor="request" className="block mb-[8px]">
              Special Request?
            </label>
            <textarea
              id="request"
              {...register("request")}
              placeholder="Textarea"
              className="w-full p-3 bg-transparent border border-[#07373F] text-white min-h-[150px] rounded-[12px]"
              onInput={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean);
                if (words.length > 20) {
                  e.target.value = words.slice(0, 20).join(" ");
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
