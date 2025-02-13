/* eslint-disable react/prop-types */
import Stepper from "./Stepper";

export default function Wrapper({ step, label, children }) {
  return (
    <div className="w-full min-h-screen bg-transparent flex items-center justify-center px-4 md:px-5 py-16 lg:py-28">
      <div className="w-full max-w-[700px] h-fit flex flex-col items-center justify-center bg-[#041E23] border border-[#0E464F] rounded-[32px] md:rounded-[40px] p-6 md:p-12">
        <Stepper step={step} label={label} />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
