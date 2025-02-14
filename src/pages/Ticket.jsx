import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadFromStorage } from "../utils/storage";
import Wrapper from "../components/Wrapper";

export default function Ticket() {
  const [ticketData, setTicketData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = loadFromStorage("ticket-form");
    if (!savedData) navigate("/");
    else setTicketData(savedData);
  }, [navigate]);

  if (!ticketData)
    return <p className="text-center mt-10">Loading ticket...</p>;

  return (
    <Wrapper step={3} label={"Ready"}>
      <div className="">
        <div className="mb-[64px] text-center">
          <h2 className="font-bold text-2xl mb-[12px]">
            Your Ticket is Booked!
          </h2>
          <p className="">You can download or Check your email for a copy</p>
        </div>

        <div className="p-6 pb-2 mx-auto ticket flex flex-col justify-between gap-y-[32px] w-full max-w-[300px] h-fit bg-[url('/bg.svg')] bg-contain bg-no-repeat bg-center">
          <div className="bg-[#031e211a] border border-[#24A0B5] rounded-[16px] p-3 flex flex-col gap-y-4">
            <div className="text-center">
              <h2 className="text-4xl road-rage">Techember Fest ”25</h2>
              <p className="text-xs">📍 04 Rumens road, Ikoyi, Lagos</p>
              <p className="text-xs">📅 March 15, 2025 | 7:00 PM</p>
            </div>
            <div className="w-[140px] h-[140px] rounded-[12px] border border-[#24A0B5] border-opacity-50 mx-auto">
              <img
                src={ticketData.avatar}
                alt="Avatar"
                className="w-full h-full block rounded-[12px]"
              />
            </div>

            <div className="w-full bg-[#08343C] border border-[#133D44] rounded-[8px] p-[4px] pb-[12px]">
              <div className="grid grid-cols-2">
                <div className="flex flex-col p-[4px] gap-y-[4px] border-b-2 border-[#12464E] border-r-2">
                  <label className="block text-xs">Enter your name</label>
                  <p className="text-xs text-white font-bold">
                    {ticketData.fullName}
                  </p>
                </div>
                <div className="flex flex-col p-[4px] gap-y-[4px] border-b-2 border-[#12464E]">
                  <label className="block text-xs">Enter your email *</label>
                  <p className="text-xs text-white font-bold">
                    {ticketData.email}
                  </p>
                </div>
                <div className="flex flex-col p-[4px] gap-y-[4px] border-b-2 border-[#12464E] border-r-2">
                  <label className="block text-xs">Ticket Type:</label>
                  <p className="text-xs text-white font-bold">
                    {ticketData.ticketType}
                  </p>
                </div>
                <div className="flex flex-col p-[4px] gap-y-[4px] border-b-2 border-[#12464E]">
                  <label className="block text-xs">Ticket for :</label>
                  <p className="text-xs text-white font-bold">
                    {ticketData.ticketCount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col p-[4px] gap-y-[4px] pt-[8px]">
                <label className="block text-xs">Special request?</label>
                <p className="text-xs text-white font-bold">
                {ticketData.request}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="/bar-code.svg"
              alt="Bar Code"
              className="block md:hidden"
            />
            <img
              src="/bar-code.svg"
              alt="Bar Code"
              className="hidden md:block"
            />
          </div>
        </div>

        <div className="mt-[32px] flex flex-col md:flex-row gap-[8px]">
          <button
            type="submit"
            className="w-full md:order-2 bg-[#24A0B5] text-white p-3 rounded-[8px] font-jeju cursor-pointer"
          >
            Download Ticket
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full border border-[#24A0B5] text-[#24A0B5] p-3 rounded-[8px] font-jeju cursor-pointer"
          >
            Book Another Ticket
          </button>
        </div>
      </div>
    </Wrapper>
  );
}
