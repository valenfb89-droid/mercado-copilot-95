import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  ShoppingCart,
  ArrowRight
} from "lucide-react";

const MLCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processando autorização...');
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const processCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(`Erro na autorização: ${error}`);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('Código de autorização não encontrado');
        return;
      }

      try {
        // TODO: Chamar edge function para processar callback
        // const response = await fetch('/api/ml-oauth?action=callback', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ code, state })
        // });
        
        // const result = await response.json();
        
        // Mock para demonstração
        setTimeout(() => {
          setStatus('success');
          setMessage('Integração concluída com sucesso!');
          setUserInfo({
            nickname: 'LOJA_TECH_STORE',
            email: 'contato@lojatech.com.br'
          });
        }, 2000);

      } catch (error) {
        console.error('Erro no callback:', error);
        setStatus('error');
        setMessage('Erro ao processar autorização. Tente novamente.');
      }
    };

    processCallback();
  }, [searchParams]);

  const handleContinue = () => {
    navigate('/integrations');
  };

  const handleRetry = () => {
    navigate('/integrations');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <ShoppingCart className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl">
            Integração Mercado Livre
          </CardTitle>
          <CardDescription>
            {status === 'processing' && 'Finalizando conexão com sua conta...'}
            {status === 'success' && 'Sua conta foi conectada com sucesso!'}
            {status === 'error' && 'Houve um problema na integração'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {status === 'processing' && (
            <div className="text-center space-y-4">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Parabéns!</strong> Sua conta do Mercado Livre foi conectada com sucesso.
                </AlertDescription>
              </Alert>

              {userInfo && (
                <div className="p-4 bg-muted/20 rounded-lg space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Loja:</span>
                    <span className="ml-2 font-medium">{userInfo.nickname}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="ml-2 font-medium">{userInfo.email}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✅ Sincronização de produtos ativada</p>
                <p>✅ Análise de IA habilitada</p>
                <p>✅ Monitoramento de concorrentes configurado</p>
              </div>

              <Button onClick={handleContinue} className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ir para Dashboard
              </Button>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  {message}
                </AlertDescription>
              </Alert>

              <div className="text-sm text-muted-foreground">
                <p>Possíveis causas:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Você cancelou a autorização</li>
                  <li>Problema temporário no servidor</li>
                  <li>Erro de comunicação com o Mercado Livre</li>
                </ul>
              </div>

              <Button onClick={handleRetry} variant="outline" className="w-full">
                Tentar Novamente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MLCallback;