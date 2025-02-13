import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import Wrapper from "../components/Wrapper";
import TypeRadio from "../components/TypeRadio";

export default function TicketType() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: loadFromStorage("ticket-form") || { ticketType: "", ticketCount: "1" },
  });

  const selectedTicket = watch("ticketType");
  const [ticketError, setTicketError] = useState("");

  useEffect(() => {
    setValue("ticketType", selectedTicket);
  }, [selectedTicket, setValue]);

  const onSubmit = (data) => {
    if (!data.ticketType) {
      setTicketError("Please select a ticket type.");
      return;
    }
    setTicketError(""); // Clear error if selection is valid
    saveToStorage("ticket-form", data);
    navigate("/attendee-details");
  };

  const handleReset = () => {
    reset({ ticketType: "", ticketCount: "1" });
    setTicketError(""); // Clear error when resetting
  };

  return (
    <Wrapper step={1} label="Ticket Selection">
      <div className="w-full md:bg-[#08252B] md:border md:border-[#0E464F] rounded-[32px] md:p-6">

        {/* Event Details */}
        <div className="text-[#fafafa] text-center border border-2 border-[#07373F] bg-radial1 rounded-[24px] p-3 md:px-8">
          <h2 className="text-5xl road-rage">Techember Fest ”25</h2>
          <p className="text-sm max-w-[340px] mx-auto mt-[8px] mb-[40px]">
            Join us for an unforgettable experience at [Event Name]! Secure your spot now.
          </p>
          <div className="md:flex justify-center items-center gap-x-4">
            <p>📍 [Event Location]</p>
            <p className="hidden md:block">| |</p>
            <p>March 15, 2025 | 7:00 PM</p>
          </div>
        </div>

        <div className="w-full h-[4px] bg-[#07373F] my-[32px]"></div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Ticket Type Selection */}
          <div>
            <label className="block text-white font-semibold">Select Ticket Type:</label>
            <div className="bg-[#052228] border border-[#07373F] rounded-[24px] mt-[8px] mb-[32px] p-4">
              <TypeRadio
                options={[
                  { value: "regular", label: "Regular Access", amount: "Free" },
                  { value: "vip", label: "VIP Access", amount: "$150" },
                  { value: "vvip", label: "VVIP Access", amount: "$250" },
                ]}
                name="ticketType"
                selected={selectedTicket}
                onChange={(value) => setValue("ticketType", value)}
                aria-required="true"
                aria-invalid={ticketError ? "true" : "false"}
              />
              {ticketError && <p className="text-red-400 text-sm mt-2">{ticketError}</p>}
            </div>
          </div>

          {/* Ticket Count Selection */}
          <div>
            <label htmlFor="ticketCount" className="block text-[#fafafa] font-semibold mb-[8px]">
              Number of Tickets
            </label>
            <select
              {...register("ticketCount", { required: "Please select the number of tickets." })}
              id="ticketCount"
              className="w-full border border-[#07373F] text-white p-3 rounded-[12px] bg-[#052228]" // Background color fixed
              aria-required="true"
              aria-invalid={errors.ticketCount ? "true" : "false"}
            >
              {[...Array(5)].map((_, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            {errors.ticketCount && <p className="text-red-400 text-sm mt-2">{errors.ticketCount.message}</p>}
          </div>

          {/* Buttons */}
          <div className="mt-[32px] flex flex-wrap gap-[8px]">
            <button
              type="submit"
              className="w-full bg-[#24A0B5] text-white p-3 rounded-[8px] font-jeju cursor-pointer"
              aria-label="Proceed to next step"
            >
              Next
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full border border-[#24A0B5] text-[#24A0B5] p-3 rounded-[8px] font-jeju cursor-pointer"
              aria-label="Reset form"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
