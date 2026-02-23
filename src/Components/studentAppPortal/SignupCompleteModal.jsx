import React from "react";

const SignupCompleteModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
        {/* Icon / status circle */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl text-green-600">✓</span>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Submission Successful!
        </h2>

        <p className="mt-3 text-sm text-gray-700">
          Your profile has been securely sent to our Admissions Team.
        </p>

        <p className="mt-2 text-sm text-gray-700">
          Please check your email within{" "}
          <span className="font-semibold">24-48 hours</span> for your review
          result.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Understood, Close
        </button>
      </div>
    </div>
  );
};

export default SignupCompleteModal;
