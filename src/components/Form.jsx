import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { saveToStorage, loadFromStorage } from "../utils/storage";

const formSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Must be a valid image URL"),
});

export default function Form({ onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      avatar: "",
    },
  });

  const avatarUrl = watch("avatar");

  // Load stored data when component mounts
  useEffect(() => {
    const savedData = loadFromStorage("ticket-form");
    if (savedData) {
      setValue("fullName", savedData.fullName);
      setValue("email", savedData.email);
      setValue("avatar", savedData.avatar);
    }
  }, [setValue]);

  const handleFormSubmit = (data) => {
    saveToStorage("ticket-form", data); // Save to local storage
    onSubmit(data); // Pass data to parent component for ticket generation
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-gray-700 font-semibold">Full Name</label>
        <input
          {...register("fullName")}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter full name"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">Email Address</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter email"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold">Avatar URL</label>
        <input
          {...register("avatar")}
          className="w-full border p-2 rounded mt-1"
          placeholder="Paste Cloudinary image URL"
        />
        {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
        {avatarUrl && <img src={avatarUrl} alt="Avatar Preview" className="w-24 h-24 mt-2 rounded-full" />}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mt-4">
        Generate Ticket
      </button>
    </form>
  );
}
