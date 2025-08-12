import React from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { SEO as Meta } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock } from "lucide-react";

export default function Login() {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Autenticação pendente",
        description: "Conecte o backend (Supabase) para ativar o login.",
      });
    }, 600);
  }

  function onGoogle() {
    toast({
      title: "Google Sign‑In",
      description: "Será ativado quando o backend estiver conectado.",
    });
  }

  return (
    <>
      <Meta
        title="Entrar | SaaS de IA para E‑commerce"
        description="Acesse sua conta para usar as análises de IA, estratégia e automações."
        canonical="/login"
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <main className="w-full max-w-md">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Entrar</CardTitle>
              <CardDescription>Acesse com e‑mail e senha</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4" aria-label="Formulário de login">
                <div className="space-y-2">
                  <Label htmlFor="email">E‑mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="voce@exemplo.com"
                      className="pl-9"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="••••••••"
                      className="pl-9"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
              <div className="my-4 text-center text-sm text-muted-foreground">ou</div>
              <Button variant="outline" className="w-full" onClick={onGoogle} aria-label="Continuar com Google">
                {/* Google G logo (inline, leve) */}
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#EA4335" d="M12 10.2v3.8h5.3c-.2 1.2-1.6 3.6-5.3 3.6-3.2 0-5.8-2.6-5.8-5.8S8.8 6 12 6c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c7.2 0 9.6-5 9.6-7.6 0-.5 0-1-.1-1.4H12z"/>
                </svg>
                Continuar com Google
              </Button>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Não tem conta?</span>
              <Link to="/signup" className="font-medium text-primary hover:underline">Criar conta</Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
}
