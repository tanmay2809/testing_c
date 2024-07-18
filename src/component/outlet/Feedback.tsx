import React from 'react';

//images
import feedback from "../../assets/undraw_feedback_re_urmj 1.png";

const Feedback: React.FC = () => {
  return (
    <div className="py-4 px-8 flex items-center justify-start gap-10 border rounded-lg border-[#505050] font-inter mt-4">
      <img
        src={feedback}
        alt="Feedback"
        className="w-[70px] h-auto"
      />
      <div className="flex flex-col gap-4">
        <p className="text-base font-medium text-[#555555]">
          Help us to make snackBAE better by adding a feedback or request
          features that are best for your business
        </p>
        <p className="text-[#004AAD] text-base font-bold">Give Feedback</p>
      </div>
    </div>
  );
};

export default Feedback;
