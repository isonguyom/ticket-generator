import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import Wrapper from "../components/Wrapper";

export default function AttendeeDetails() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: loadFromStorage("ticket-form") || { fullName: "", email: "", avatar: "" },
  });

  const avatarUrl = watch("avatar");

  const onSubmit = (data) => {
    saveToStorage("ticket-form", { ...loadFromStorage("ticket-form"), ...data });
    navigate("/ticket");
  };

  return (

    <Wrapper step={2} label={"Attendee Details"}>
    <div className="w-full md:bg-[#08252B] md:border md:border-[#0E464F] rounded-[32px] md:p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
          <label className="block text-gray-700 font-semibold">Avatar URL</label>
          <input {...register("avatar")} className="w-full border p-2 rounded mt-1" placeholder="Paste Cloudinary image URL" />
          {avatarUrl && <img src={avatarUrl} alt="Avatar" className="w-24 h-24 mt-2 rounded-full" />}
        </div>

        <div className="w-full h-[4px] bg-[#07373F] my-[32px]"></div>

        <div>
          <label className="block mb-[8px]">Enter your name</label>
          <input {...register("fullName")} className="w-full border border-[#07373F] text-white p-3 rounded-[12px]" />
        </div>

        <div className="my-[32px]">
          <label className="block mb-[8px]">Enter your email *</label>
          <div className="w-full h-fit relative">
            <div className="absolute top-1/2 left-[14px] -translate-y-1/2"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 4H4C2.897 4 2 4.897 2 6V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V6C22 4.897 21.103 4 20 4ZM20 6V6.511L12 12.734L4 6.512V6H20ZM4 18V9.044L11.386 14.789C11.5611 14.9265 11.7773 15.0013 12 15.0013C12.2227 15.0013 12.4389 14.9265 12.614 14.789L20 9.044L20.002 18H4Z" fill="white"/>
</svg>
</div>
          <input type="email" {...register("email")} className="w-full border border-[#07373F] text-white p-3 rounded-[12px]" />
        </div>
        </div>

        <div>
        <label className="block mb-[8px]">About the project</label>
        <textarea
          id="id"
          name="name"
          placeholder="Textarea"
          className="w-full p-3 bg-transparent border border-[#07373F] text-white min-h-[150px] rounded-[12px]"
        />
          </div>

        
          <div className="mt-[32px] flex flex-wrap gap-[8px]">
        <button type="submit" className="w-full bg-[#24A0B5] text-white p-3 rounded-[8px] font-jeju cursor-pointer">Get My Free Ticket</button>
        <button type="reset" className="w-full border border-[#24A0B5] text-[#24A0B5] p-3 rounded-[8px] font-jeju cursor-pointer">Back</button>
      </div>
      </form>
    </div>
    </Wrapper>
  );
}
