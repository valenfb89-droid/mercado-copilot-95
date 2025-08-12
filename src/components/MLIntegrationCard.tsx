import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ShoppingCart, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Link as LinkIcon,
  Unlink,
  Clock,
  User,
  Mail,
  Activity,
  Settings
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MLCredentialsModal } from "./MLCredentialsModal";

interface MLIntegrationCardProps {
  status: 'disconnected' | 'connected' | 'expired' | 'error';
  lastSync: string | null;
  userInfo: any;
  onStatusChange: (status: 'disconnected' | 'connected' | 'expired' | 'error') => void;
  onSyncUpdate: (sync: string) => void;
  onUserInfoUpdate: (info: any) => void;
}

export const MLIntegrationCard = ({ 
  status, 
  lastSync, 
  userInfo, 
  onStatusChange, 
  onSyncUpdate, 
  onUserInfoUpdate 
}: MLIntegrationCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const { toast } = useToast();

  const checkCredentials = () => {
    const clientId = localStorage.getItem('ml_client_id');
    const clientSecret = localStorage.getItem('ml_client_secret');
    const redirectUri = localStorage.getItem('ml_redirect_uri');
    
    return !!(clientId && clientSecret && redirectUri);
  };

  const handleConnect = async () => {
    // Verificar se as credenciais estão configuradas
    if (!checkCredentials()) {
      toast({
        title: "Credenciais Necessárias",
        description: "Configure suas credenciais do Mercado Livre antes de conectar",
        variant: "destructive"
      });
      setShowCredentials(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implementar edge function para OAuth
      // const response = await fetch('/api/ml/auth/start', { method: 'POST' });
      // const { authUrl } = await response.json();
      // window.location.href = authUrl;
      
      // Integração desabilitada sem backend
      toast({
        title: "Integração indisponível",
        description: "Conecte o backend para habilitar o OAuth do Mercado Livre.",
        variant: "destructive",
      });
      setIsLoading(false);
      
    } catch (error) {
      console.error('Erro na integração:', error);
      onStatusChange('error');
      setIsLoading(false);
      
      toast({
        title: "Erro na integração",
        description: "Não foi possível conectar com o Mercado Livre. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    onStatusChange('disconnected');
    onUserInfoUpdate(null);
    onSyncUpdate(null);
    
    toast({
      title: "Conta desconectada",
      description: "Sua conta do Mercado Livre foi desconectada.",
    });
  };

  const handleSync = async () => {
    setIsLoading(true);
    
    try {
      // Sincronização desabilitada sem backend
      setIsLoading(false);
      toast({
        title: "Sincronização indisponível",
        description: "Conecte o backend para sincronizar seus dados.",
        variant: "destructive",
      });
      
    } catch (error) {
      console.error('Erro na sincronização:', error);
      setIsLoading(false);
      
      toast({
        title: "Erro na sincronização",
        description: "Não foi possível sincronizar os dados. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-success/10 text-success border-success/20">Conectado</Badge>;
      case 'expired':
        return <Badge variant="destructive">Token Expirado</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">Desconectado</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-6 w-6 text-success" />;
      case 'expired':
      case 'error':
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      default:
        return <LinkIcon className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-glow">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center space-x-2">
                Mercado Livre
                {getStatusBadge()}
              </CardTitle>
              <CardDescription>
                Integração oficial com marketplace Mercado Livre
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {status === 'disconnected' && (
          <>
            <Alert>
              <LinkIcon className="h-4 w-4" />
              <AlertDescription>
                <strong>Conecte sua conta do Mercado Livre</strong> para analisar, automatizar e otimizar seus anúncios com IA.
                Seus dados ficam seguros e criptografados.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Benefícios da integração:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-success" />
                  Análise automática de produtos e anúncios
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-success" />
                  Insights de IA para otimização de títulos e preços
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-success" />
                  Monitoramento de concorrentes em tempo real
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-3 w-3 text-success" />
                  Alertas inteligentes de oportunidades
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleConnect} 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Conectando...
                  </>
                ) : (
                  <>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Conectar com Mercado Livre
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => setShowCredentials(true)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Settings className="mr-2 h-4 w-4" />
                {checkCredentials() ? "Gerenciar Credenciais" : "Configurar Credenciais"}
              </Button>
            </div>
          </>
        )}

        {status === 'connected' && userInfo && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <User className="mr-2 h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Loja:</span>
                  <span className="ml-1 font-medium">{userInfo.nickname}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-1 font-medium">{userInfo.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Activity className="mr-2 h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="default" className="ml-1">Ativo</Badge>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Última sync:</span>
                  <span className="ml-1 font-medium">Há 5 min</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button 
                onClick={handleSync} 
                disabled={isLoading}
                variant="outline" 
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Sincronizar Agora
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDisconnect} 
                variant="destructive" 
                size="sm"
              >
                <Unlink className="mr-2 h-4 w-4" />
                Desconectar
              </Button>
            </div>
          </>
        )}

        {(status === 'expired' || status === 'error') && (
          <>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {status === 'expired' 
                  ? 'Sua autorização do Mercado Livre expirou. Reconecte para continuar usando os recursos.'
                  : 'Erro na conexão com o Mercado Livre. Tente reconectar.'
                }
              </AlertDescription>
            </Alert>

            <Button 
              onClick={handleConnect} 
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Reconectando...
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Renovar Acesso
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>

      {status === 'connected' && (
        <div className="absolute inset-0 bg-gradient-to-r from-success/5 to-transparent pointer-events-none" />
      )}

      <MLCredentialsModal 
        open={showCredentials}
        onOpenChange={setShowCredentials}
        onSave={() => {
          toast({
            title: "Credenciais Atualizadas",
            description: "Agora você pode conectar com o Mercado Livre",
          });
        }}
      />
    </Card>
  );
};