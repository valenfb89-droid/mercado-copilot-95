import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  HelpCircle,
  Zap,
  Brain,
  BarChart3
} from "lucide-react";

interface IntegrationHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const IntegrationHelpModal = ({ open, onOpenChange }: IntegrationHelpModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5" />
            Central de Ajuda - Integrações
          </DialogTitle>
          <DialogDescription>
            Tudo que você precisa saber sobre as integrações do StrategiML
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Como funciona */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Como funciona a integração?</CardTitle>
              <CardDescription>
                Processo seguro e automatizado para conectar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium">1. Autorização Segura</h4>
                  <p className="text-sm text-muted-foreground">
                    Clique em "Conectar" e autorize o acesso na página oficial do Mercado Livre
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-medium">2. Sincronização</h4>
                  <p className="text-sm text-muted-foreground">
                    Importamos seus produtos e dados automaticamente de forma segura
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <Brain className="h-6 w-6 text-success" />
                  </div>
                  <h4 className="font-medium">3. IA em Ação</h4>
                  <p className="text-sm text-muted-foreground">
                    Nossa IA analisa seus dados e gera insights e automações inteligentes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Shield className="mr-2 h-5 w-5 text-success" />
                Segurança e Privacidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-success flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    O que garantimos:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 text-success" />
                      Criptografia de ponta a ponta
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 text-success" />
                      Tokens seguros e renovação automática
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 text-success" />
                      Conformidade com LGPD
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 text-success" />
                      Acesso apenas de leitura por padrão
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-warning flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    O que NÃO fazemos:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Alterações sem sua aprovação
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Compartilhamento com terceiros
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Publicação automática de anúncios
                    </li>
                    <li className="flex items-center">
                      <AlertTriangle className="mr-2 h-3 w-3 text-warning" />
                      Alteração de preços sem confirmação
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissões */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Permissões de Acesso</CardTitle>
              <CardDescription>
                Detalhes sobre o que acessamos em sua conta do Mercado Livre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <Eye className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Leitura de Produtos</h4>
                    <p className="text-sm text-muted-foreground">
                      Títulos, descrições, preços, categorias, fotos e status dos anúncios
                    </p>
                  </div>
                  <Badge variant="secondary">Leitura</Badge>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Métricas de Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Visualizações, vendas, posicionamento e estatísticas dos anúncios
                    </p>
                  </div>
                  <Badge variant="secondary">Leitura</Badge>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Informações da Conta</h4>
                    <p className="text-sm text-muted-foreground">
                      Nome da loja, email, país e status básico da conta (apenas para identificação)
                    </p>
                  </div>
                  <Badge variant="secondary">Leitura</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">É seguro conectar minha conta do Mercado Livre?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sim, utilizamos o protocolo OAuth2 oficial do Mercado Livre. Nunca temos acesso à sua senha, 
                    apenas às informações que você autoriza.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Posso desconectar a qualquer momento?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sim, você pode desconectar sua conta a qualquer momento na página de integrações. 
                    Todos os dados serão removidos imediatamente.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Com que frequência os dados são sincronizados?</h4>
                  <p className="text-sm text-muted-foreground">
                    A sincronização ocorre automaticamente a cada 30 minutos. Você também pode forçar 
                    uma sincronização manual a qualquer momento.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Meus concorrentes podem ver que uso o StrategiML?</h4>
                  <p className="text-sm text-muted-foreground">
                    Não, nossa análise é completamente invisível. Utilizamos técnicas de web scraping 
                    éticas e respeitamos os limites das APIs públicas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};