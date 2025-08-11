import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingCart, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Link as LinkIcon,
  Unlink,
  Clock,
  Shield,
  HelpCircle,
  Settings,
  Eye,
  History
} from "lucide-react";
import { useState, useEffect } from "react";
import { MLIntegrationCard } from "@/components/MLIntegrationCard";
import { IntegrationLogs } from "@/components/IntegrationLogs";
import { IntegrationHelpModal } from "@/components/IntegrationHelpModal";
import { SEO as Meta } from "@/components/SEO";

const Integrations = () => {
  const [mlStatus, setMlStatus] = useState<'disconnected' | 'connected' | 'expired' | 'error'>('disconnected');
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <Layout>
      <Meta 
        title="Integrações — Mercado Copilot" 
        description="Conecte Mercado Livre e outras plataformas para análises automatizadas."
        canonical="/integrations"
      />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Integrações</h1>
            <p className="text-muted-foreground">
              Conecte suas contas e plataformas para análise automatizada
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowHelp(true)}
              className="w-full sm:w-auto"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Ajuda
            </Button>
            <Button size="sm" variant="secondary" className="w-full sm:w-auto">
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>

        <Tabs defaultValue="platforms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="platforms" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Plataformas</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <History className="h-4 w-4" />
              <span>Histórico</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Segurança</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platforms" className="space-y-6">
            {/* Status Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Integrações Ativas</div>
                        <div className="text-xl font-bold">
                          {mlStatus === 'connected' ? '1' : '0'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <RefreshCw className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Última Sincronização</div>
                        <div className="text-xl font-bold">
                          {lastSync ? 'Há 5 min' : 'Nunca'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Produtos Sincronizados</div>
                        <div className="text-xl font-bold">
                          {mlStatus === 'connected' ? '247' : '0'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mercado Livre Integration */}
            <MLIntegrationCard 
              status={mlStatus}
              lastSync={lastSync}
              userInfo={userInfo}
              onStatusChange={setMlStatus}
              onSyncUpdate={setLastSync}
              onUserInfoUpdate={setUserInfo}
            />

            {/* Coming Soon */}
            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle>Shopee</CardTitle>
                      <CardDescription>Integração com marketplace Shopee</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Em Breve</Badge>
                </div>
              </CardHeader>
            </Card>

            <Card className="opacity-60">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle>Amazon</CardTitle>
                      <CardDescription>Integração com marketplace Amazon</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Em Breve</Badge>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <IntegrationLogs />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-success" />
                  Segurança e Privacidade
                </CardTitle>
                <CardDescription>
                  Como protegemos seus dados e acessos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Seus dados estão seguros:</strong> Usamos criptografia de ponta a ponta para armazenar seus tokens de acesso. 
                    Nunca fazemos alterações sem sua autorização explícita.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <h4 className="font-medium">O que acessamos:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <Eye className="mr-2 h-3 w-3" />
                      Leitura de informações de produtos e anúncios
                    </li>
                    <li className="flex items-center">
                      <Eye className="mr-2 h-3 w-3" />
                      Métricas de performance e vendas
                    </li>
                    <li className="flex items-center">
                      <Eye className="mr-2 h-3 w-3" />
                      Informações básicas da conta (nome, email)
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">O que NÃO fazemos:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Nunca alteramos preços sem sua confirmação
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Nunca publicamos ou pausamos anúncios automaticamente
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Nunca compartilhamos seus dados com terceiros
                    </li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Gerenciar Permissões
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <IntegrationHelpModal 
          open={showHelp} 
          onOpenChange={setShowHelp}
        />
      </div>
    </Layout>
  );
};

export default Integrations;