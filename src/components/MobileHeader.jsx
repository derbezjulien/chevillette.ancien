import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { LOGO_MARK_URL } from "@/lib/branding";

export default function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const canBack = location.pathname !== "/";

  return (
    <header
      className="md:hidden sticky top-0 z-30 bg-[#0F1B2A] border-b border-[#CBA328]/20"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center justify-between px-2 py-2.5">
        <button
          type="button"
          onClick={() => { if (canBack) { if (window.history.state?.idx > 0) navigate(-1); else navigate("/"); } }}
          className={`w-11 h-11 flex items-center justify-center rounded-xl text-white ${canBack ? "" : "opacity-0 pointer-events-none"}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center gap-2.5">
          <img src={LOGO_MARK_URL} alt="" className="h-9 w-auto object-contain" />
          <span className="font-heading font-bold text-xl leading-none whitespace-nowrap">
            <span className="text-white">chevillette</span>
            <span className="text-[#CBA328]">.fr</span>
          </span>
        </div>
        <div className="w-11" />
      </div>
    </header>
  );
}