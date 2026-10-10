import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import useSeo from "@/hooks/use-seo";

export default function Settings() {
  useSeo({ title: "Paramètres | Chevillette.fr", description: "Paramètres du compte et de l'application.", path: "/settings" });
  const { isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await base44.functions.invoke("deleteAccount", {});
      toast({ title: "Compte supprimé", description: "Votre compte a été définitivement supprimé." });
      setDialogOpen(false);
      logout(false);
      window.location.href = "/";
    } catch (e) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer le compte. Réessayez plus tard." });
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-2 text-primary">
          Paramètres
        </h1>
        <p className="text-muted-foreground mb-8">
          Gérez vos préférences et votre compte.
        </p>

        {isAuthenticated ? (
          <Card className="border-destructive/30">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-destructive/10 mb-3 ring-1 ring-destructive/20">
                <Trash2 className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-primary text-lg">Supprimer mon compte</CardTitle>
              <CardDescription>
                Cette action est irréversible. Toutes vos données seront définitivement effacées.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={deleting}>
                    {deleting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Suppression…
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Supprimer mon compte
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer définitivement votre compte ? Cette action ne peut pas être annulée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                      {deleting ? "Suppression…" : "Supprimer définitivement"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground text-center">
                Vous n'êtes pas connecté. Aucun compte à gérer.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}