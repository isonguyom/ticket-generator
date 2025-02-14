/* eslint-disable react/prop-types */
import { useRef } from "react";

export default function CustomRadio({ options, name, selected, onChange }) {
  const radioRefs = useRef([]);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-x-4 gap-y-6">
      {options.map((option, index) => (
        <label
          key={index}
          className="flex items-center cursor-pointer w-full"
          tabIndex="0"
          ref={(el) => (radioRefs.current[index] = el)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onChange(option.value);
            }
          }}
        >
          {/* Hidden Default Radio */}
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className="hidden"
          />

          {/* Custom Radio */}
          <div
            className={`w-full h-fit border-2 flex flex-col gap-y-3 p-4 rounded-xl transition-all duration-300 
              focus:outline-none focus:ring-2 focus:ring-[#24A0B5] focus:ring-offset-2
              ${
                selected === option.value
                  ? "border-[#197686] bg-[#12464E]"
                  : "border-[#197686] bg-transparent hover:border-[#197686]"
              }
              hover:bg-[#2C545B] hover:text-white`}
          >
            <span className="text-white font-semibold text-2xl">
              {option.amount}
            </span>
            <div className="flex flex-col">
              <span className="">{option.label}</span>
              <span className="text-sm text-[#D9D9D9]">20/52</span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
