import React from "react";
import { FaLock } from "react-icons/fa";

export function OffersPage() {
  return (
    <div className="fade-in space-y-6">
      {/* <h1 className="text-2xl font-bold text-slate-900 mb-6">
        Visa &amp; Offer Management
      </h1> */}
      <div className="bg-amber-50 border border-amber-200 p-12 rounded-3xl text-center">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          <FaLock className="text-slate-400 text-lg" />
        </div>
        <h3 className="font-bold text-amber-900 text-lg">Module Locked</h3>
        <p className="text-sm text-amber-700 mt-2">
          Coming Soon! We’re working on unlocking this feature for you.{" "}
        </p>
      </div>
    </div>
  );
}
