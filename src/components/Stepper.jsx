/* eslint-disable react/prop-types */
export default function Stepper({ step, label }) {
  const steps = ["Ticket Type", "Attendee Details", "Ticket"];

  return (
    <div className="w-full mb-4">
      {/* Step Title */}
      <div className="w-full flex items-center justify-between flex-wrap mb-3 gap-x-6">
        <div className="text-white text-2xl font-jeju">{label}</div>
        <div className="text-[#fafafa]">Step {step}/3</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full flex h-[4px] bg-[#0E464F] rounded-[5px]">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-[5px] transition-all ${
              index < step
                ? "bg-[#24A0B5]" // Completed step
                : "bg-[#0E464F]" // Inactive step
            } 
            ${index === 0 ? "rounded-l-[5px]" : ""} // Left-rounded for step 1
            ${
              index === step - 1 ? "rounded-r-[5px]" : ""
            } // Right-rounded for the current step
            `}
          ></div>
        ))}
      </div>
    </div>
  );
}
