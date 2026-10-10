import React from "react";
import { Link } from "react-router-dom";
import { LOGO_MARK_URL } from "@/lib/branding";

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-30 bg-[#0F1B2A] border-b border-[#CBA328]/20"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[60px] md:h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src={LOGO_MARK_URL}
            alt=""
            className="h-9 md:h-11 w-auto object-contain"
          />
          <span className="font-heading font-bold text-xl md:text-[26px] leading-none whitespace-nowrap">
            <span className="text-white">chevillette</span>
            <span className="text-[#CBA328]">.fr</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 shrink-0">
          <Link
            to="/"
            className="hidden md:inline text-white text-sm font-medium hover:text-[#CBA328] transition-colors"
          >
            Accueil
          </Link>
          <Link
            to="/estimation"
            className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-[#CBA328] text-[#CBA328] hover:bg-[#CBA328] hover:text-[#0F1B2A] transition-colors whitespace-nowrap"
          >
            Estimer mon bien
          </Link>
        </div>
      </div>
    </header>
  );
}