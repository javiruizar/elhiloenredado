"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronLeft, Loader2, MailCheck, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{ text: string, type: 'error' | 'info' } | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg({ text: data.message, type: res.status === 403 ? 'info' : 'error' });
      }
    } catch {
      toast.error("Error de conexión");
    } finally {
      setLoading(false);
      setCooldown(4);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex justify-center bg-cream px-4 pt-24 sm:pt-32">
        <Card className="w-full max-w-md shadow-xl border-sand/30 h-fit animate-in fade-in zoom-in duration-300">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="mx-auto w-16 h-16 bg-sage/10 text-sage rounded-full flex items-center justify-center mb-6">
              <MailCheck className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary mb-2">Revisa tu correo</h2>
            <p className="text-muted-foreground mb-8">
              Si tu cuenta es válida, hemos enviado un enlace de recuperación a <strong>{email}</strong>.
            </p>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setSubmitted(false)}
              >
                Intentar con otro correo
              </Button>
              <Link href="/login" className="block">
                <Button className="w-full bg-sage hover:bg-sage/90">
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-cream px-4 pt-24 sm:pt-32">
      <Card className="w-full max-w-md shadow-xl border-sand/30 h-fit animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-1 pb-4">
          <Link href="/login" className="flex items-center text-xs text-sage hover:underline mb-4">
            <ChevronLeft className="h-3 w-3 mr-1" /> Volver al login
          </Link>
          <CardTitle className="text-2xl font-serif font-bold text-primary">Recuperar contraseña</CardTitle>
          <p className="text-sm text-muted-foreground">
            Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {errorMsg && (
              <div className={`p-4 rounded-lg flex items-start gap-3 border ${
                errorMsg.type === 'info' ? 'bg-blue-50 border-blue-100 text-blue-800' : 'bg-red-50 border-red-100 text-red-800'
              }`}>
                {errorMsg.type === 'info' ? <Info className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                <p className="text-sm font-medium">{errorMsg.text}</p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-sand/40 rounded-md bg-background focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-sage hover:bg-sage/90" disabled={loading || cooldown > 0}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : cooldown > 0 ? (
                `Espera ${cooldown}s`
              ) : (
                "Enviar enlace de recuperación"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
