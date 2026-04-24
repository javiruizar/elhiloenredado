"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      toast.error("Contraseña demasiado corta");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        toast.success("Contraseña actualizada");
      } else {
        setError(data.message || "Error al actualizar la contraseña");
        toast.error("Error al actualizar");
      }
    } catch {
      setError("Error de conexión al servidor");
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md shadow-xl border-sand/30 text-center">
        <CardContent className="pt-10 pb-10">
          <p className="text-red-500 font-medium mb-6 text-sm">El enlace de recuperación no es válido o ha expirado.</p>
          <Link href="/auth/forgot-password">
            <Button variant="outline" className="w-full">Solicitar nuevo enlace</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-xl border-sand/30 animate-in fade-in zoom-in duration-300 h-fit">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="mx-auto w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-2">¡Contraseña actualizada!</h2>
          <p className="text-muted-foreground mb-8">
            Tu nueva contraseña ha sido guardada correctamente. Ya puedes acceder a tu cuenta.
          </p>
          <Link href="/login">
            <Button className="w-full bg-sage hover:bg-sage/90 h-12 rounded-xl text-lg font-semibold shadow-sm">
              Ir al inicio de sesión
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-sand/30 h-fit animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-serif font-bold text-primary">Nueva contraseña</CardTitle>
        <p className="text-sm text-muted-foreground">
          Por favor, introduce tu nueva contraseña a continuación.
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Nueva contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-sand/40 rounded-xl bg-background focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all shadow-sm pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Confirmar contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-sand/40 rounded-xl bg-background focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all shadow-sm"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            className="w-full bg-sage hover:bg-sage/90 h-12 rounded-xl text-md font-semibold" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Actualizando...
              </>
            ) : (
              "Actualizar contraseña"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex justify-center bg-cream px-4 pt-24 sm:pt-32">
      <Suspense fallback={
        <Card className="w-full max-w-md shadow-xl border-sand/30">
          <CardContent className="p-10 flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-sage mb-4" />
            <p className="text-muted-foreground">Cargando...</p>
          </CardContent>
        </Card>
      }>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
