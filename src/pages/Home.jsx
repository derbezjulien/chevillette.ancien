import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calculator, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LOGO_FULL_URL } from "@/lib/branding";
import useSeo from "@/hooks/use-seo";

export default function Home() {
  useSeo({ title: "Estimation immobilière gratuite en ligne | Chevillette.fr", description: "Estimez gratuitement votre maison ou appartement à partir des ventes réelles de votre commune (DVF, données de l'État). Estimation indicative.", path: "/" });
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 20%, #CBA328 0, transparent 42%), radial-gradient(circle at 82% 0%, #1E293B 0, transparent 38%)",
          }}
        />
        <div className="relative flex flex-col items-center text-center mx-auto w-full max-w-3xl px-6 py-12 md:py-16">
          <div className="relative">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.10] w-[400px] h-[400px]"
              style={{ backgroundImage: "radial-gradient(circle, #CBA328 0, transparent 65%)" }}
            />
            <img
              src={LOGO_FULL_URL}
              alt="Chevillette.fr"
              className="relative w-[250px] md:w-[360px] h-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-balance max-w-3xl mt-8 text-primary leading-[1.1]">
            Estimez votre bien immobilier
          </h1>
          <p className="text-lg text-accent font-medium max-w-2xl mt-3">
            Tirez la chevillette, découvrez ce que vaut votre maison.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mt-3">
            Une estimation indicative basée sur les ventes réelles récentes de votre commune, issues des données ouvertes de l'État (DVF).
          </p>
          <Button asChild size="lg" className="shadow-soft mt-7">
            <Link to="/estimation">Commencer une estimation</Link>
          </Button>
          <div className="flex items-center justify-center gap-3 mt-9">
            <span className="hidden sm:block w-10 h-px bg-[#CBA328] shrink-0" />
            <span className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-white/70 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#CBA328] shrink-0" />
              Données officielles de l'État · DVF · Base Adresse Nationale
            </span>
            <span className="hidden sm:block w-10 h-px bg-[#CBA328] shrink-0" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid gap-6 md:grid-cols-3">
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Recherche d'adresse</CardTitle>
            <CardDescription>
              Saisissez l'adresse de votre bien ; elle est recherchée dans la Base Adresse Nationale.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <Calculator className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Estimation personnalisée</CardTitle>
            <CardDescription>
              Renseignez la surface de votre bien pour obtenir une valeur indicative.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="transition-all hover:shadow-md hover:-translate-y-0.5">
          <CardHeader>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-3 ring-1 ring-accent/20">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <CardTitle className="text-primary text-lg">Ventes réelles récentes</CardTitle>
            <CardDescription>
              Votre prix de référence est calculé à partir des ventes enregistrées dans votre commune au cours des trois dernières années (Demandes de Valeurs Foncières).
            </CardDescription>
          </CardHeader>
        </Card>
      </section>


    </div>
  );
}