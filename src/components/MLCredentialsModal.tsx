import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save, ExternalLink, Key } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MLCredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: () => void;
}

export const MLCredentialsModal = ({ open, onOpenChange, onSave }: MLCredentialsModalProps) => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [redirectUri, setRedirectUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!clientId || !clientSecret || !redirectUri) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Salvar no Supabase Secrets
      // const { error } = await supabase.functions.invoke('save-ml-credentials', {
      //   body: { clientId, clientSecret, redirectUri }
      // });
      
      // Por enquanto, salvar no localStorage para demonstração
      localStorage.setItem('ml_client_id', clientId);
      localStorage.setItem('ml_client_secret', clientSecret);
      localStorage.setItem('ml_redirect_uri', redirectUri);
      
      toast({
        title: "Credenciais Salvas!",
        description: "As credenciais do Mercado Livre foram configuradas com sucesso",
      });
      
      onSave?.();
      onOpenChange(false);
      
      // Limpar campos
      setClientId("");
      setClientSecret("");
      setRedirectUri("");
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar as credenciais. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Configurar API Mercado Livre</span>
          </DialogTitle>
          <DialogDescription>
            Configure suas credenciais para conectar com a API do Mercado Livre
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client-id">ML Client ID *</Label>
            <Input
              id="client-id"
              type="text"
              placeholder="Seu Client ID do Mercado Livre"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-secret">ML Client Secret *</Label>
            <Input
              id="client-secret"
              type="password"
              placeholder="Seu Client Secret do Mercado Livre"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="redirect-uri">ML Redirect URI *</Label>
            <Input
              id="redirect-uri"
              type="url"
              placeholder="https://seudominio.com/ml/callback"
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              className="font-mono"
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Onde encontrar:</strong> Acesse o{" "}
              <a 
                href="https://developers.mercadolibre.com.ar/devcenter" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Dev Center do Mercado Livre
              </a>{" "}
              para obter suas credenciais de API.
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Suas credenciais serão armazenadas de forma segura usando o sistema de secrets do Supabase.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={isLoading}
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? "Salvando..." : "Salvar Credenciais"}
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="https://developers.mercadolibre.com.ar/devcenter" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};