import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Lightbulb,
  Sparkles
} from "lucide-react";

const DiagnosticCard = ({ 
  title, 
  status, 
  score, 
  description, 
  recommendation,
  impact 
}: {
  title: string;
  status: "excellent" | "good" | "warning" | "critical";
  score: number;
  description: string;
  recommendation: string;
  impact: string;
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "excellent":
        return "border-success/20 bg-success/5";
      case "good":
        return "border-primary/20 bg-primary/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "critical":
        return "border-destructive/20 bg-destructive/5";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "good":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Card className={`${getStatusStyles()}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <h4 className="font-medium">{title}</h4>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{score}%</div>
            <Progress value={score} className="w-16 mt-1" />
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Brain className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs"><strong>IA Recomenda:</strong> {recommendation}</p>
          </div>
          <div className="flex items-start space-x-2">
            <Target className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs"><strong>Impacto Estimado:</strong> {impact}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SimulationCard = ({
  title,
  currentValue,
  suggestedValue,
  estimatedImpact,
  confidence
}: {
  title: string;
  currentValue: string;
  suggestedValue: string;
  estimatedImpact: string;
  confidence: number;
}) => (
  <Card className="border-accent/20 bg-accent/5">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium flex items-center">
          <Sparkles className="mr-2 h-4 w-4 text-accent" />
          {title}
        </h4>
        <Badge variant="outline">
          {confidence}% confiança
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Atual</div>
          <div className="p-2 bg-muted/50 rounded text-sm">{currentValue}</div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground mb-1">IA Sugere</div>
          <div className="p-2 bg-accent/10 border border-accent/20 rounded text-sm">
            {suggestedValue}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs">
          <TrendingUp className="h-3 w-3 text-success" />
          <span className="text-success font-medium">{estimatedImpact}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StrategyBuilder = () => {
  const [activeTab, setActiveTab] = useState("diagnosis");
  const [reprocessing, setReprocessing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const getDefaultModel = () => (
    localStorage.getItem('ai_default_model_openai') ||
    localStorage.getItem('ai_default_model_deepseek') ||
    localStorage.getItem('ai_default_model_google') ||
    'gpt-4o'
  );

  const reprocessAI = async () => {
    const model = getDefaultModel() as string;
    setReprocessing(true);
    try {
      await AIAnalysisService.executeAnalysis({
        model,
        analysisType: 'diagnosis',
        prompt: 'Reprocessar diagnóstico estratégico do produto atual.',
        productData: { id: 'current' }
      });
      toast({ title: 'Reprocessamento concluído' });
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message || 'Falha ao reprocessar', variant: 'destructive' });
    } finally {
      setReprocessing(false);
    }
  };

  const generateCopy = async () => {
    const model = getDefaultModel() as string;
    setGenerating(true);
    try {
      await AIAnalysisService.executeAnalysis({
        model,
        analysisType: 'copywriting',
        prompt: 'Gerar copy/descrição otimizada para o produto atual.',
        productData: { id: 'current' }
      });
      toast({ title: 'Geração concluída' });
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message || 'Falha ao gerar com IA', variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estratégia: Smartphone Galaxy A54</h1>
          <p className="text-muted-foreground">
            Análise completa com IA • Última atualização: há 3 min
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Eye className="mr-2 h-4 w-4" />
            Ver no ML
          </Button>
          <Button variant="ai" size="sm" className="w-full sm:w-auto" onClick={reprocessAI} disabled={reprocessing}>
            <Brain className="mr-2 h-4 w-4" />
            {reprocessing ? 'Reprocessando...' : 'Reprocessar IA'}
          </Button>
        </div>
      </div>

      {/* Current Product Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
              <img 
                src="/placeholder.svg" 
                alt="Imagem do produto: Smartphone Samsung Galaxy A54 128GB 5G" 
                loading="lazy"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                Smartphone Samsung Galaxy A54 128GB 5G Câmera Tripla 50MP
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Preço Atual</div>
                  <div className="font-bold text-primary">R$ 1.299,00</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ranking</div>
                  <div className="font-bold">#3º na categoria</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Vendas (30d)</div>
                  <div className="font-bold">47 unidades</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Score IA</div>
                  <div className="font-bold text-warning">72%</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="simulation">Simulação</TabsTrigger>
          <TabsTrigger value="execution">Execução</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnosis" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <DiagnosticCard
              title="Título & SEO"
              status="warning"
              score={68}
              description="Título tem boa relevância mas pode ser otimizado para melhor ranking."
              recommendation="Adicionar palavras-chave de alta conversão: 'Original', 'Novo', posição das specs"
              impact="+15% visibilidade, +8% cliques"
            />
            
            <DiagnosticCard
              title="Preço Competitivo"
              status="excellent"
              score={92}
              description="Preço bem posicionado contra concorrentes diretos."
              recommendation="Manter preço atual, boa margem de lucro"
              impact="Posição competitiva mantida"
            />
            
            <DiagnosticCard
              title="Qualidade da Descrição"
              status="critical"
              score={35}
              description="Descrição muito básica, faltam informações técnicas importantes."
              recommendation="Expandir com especificações detalhadas, benefícios e casos de uso"
              impact="+25% taxa de conversão estimada"
            />
            
            <DiagnosticCard
              title="Imagens & Mídia"
              status="good"
              score={78}
              description="Boas imagens do produto mas pode incluir mais ângulos."
              recommendation="Adicionar imagens de uso, comparativos de tamanho, vídeo demonstrativo"
              impact="+12% engajamento, +5% conversão"
            />
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                Otimizações Sugeridas
              </h3>
              
              <SimulationCard
                title="Título Otimizado"
                currentValue="Smartphone Samsung Galaxy A54 128GB 5G Câmera Tripla"
                suggestedValue="Smartphone Samsung Galaxy A54 5G 128GB Original Novo Câmera 50MP Tripla Tela 6.4"
                estimatedImpact="+15% visibilidade"
                confidence={87}
              />
              
              <SimulationCard
                title="Preço Estratégico"
                currentValue="R$ 1.299,00"
                suggestedValue="R$ 1.259,00 (12x sem juros)"
                estimatedImpact="+22% conversão"
                confidence={73}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Ações Prioritárias
              </h3>
              
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">1. Atualizar título</span>
                    <Badge variant="destructive">Alta prioridade</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Impacto estimado: +15% visibilidade, +8% cliques
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Aplicar Sugestão
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">2. Expandir descrição</span>
                    <Badge variant="secondary">Média prioridade</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Impacto estimado: +25% taxa de conversão
                  </p>
                  <Button size="sm" variant="outline" className="w-full" onClick={generateCopy} disabled={generating}>
                    Gerar com IA
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Simulador de Cenários
              </CardTitle>
              <CardDescription>
                Teste diferentes combinações e veja o impacto estimado pela IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título</label>
                  <Textarea 
                    placeholder="Digite o novo título..."
                    className="min-h-[100px]"
                    defaultValue="Smartphone Samsung Galaxy A54 5G 128GB Original Novo Câmera 50MP Tripla Tela 6.4"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preço</label>
                  <Input type="number" placeholder="1259" />
                  <label className="text-sm font-medium">Estoque</label>
                  <Input type="number" placeholder="25" />
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Impacto Estimado pela IA</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-success/5 border-success/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-success">+28%</div>
                      <div className="text-sm text-muted-foreground">Visibilidade</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">+15%</div>
                      <div className="text-sm text-muted-foreground">Conversão</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5 border-accent/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">85%</div>
                      <div className="text-sm text-muted-foreground">Confiança IA</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Button className="w-full" size="lg">
                <Play className="mr-2 h-4 w-4" />
                Executar Simulação Avançada
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Publicação Automatizada
              </CardTitle>
              <CardDescription>
                Aplique todas as otimizações diretamente no Mercado Livre
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium">Atualizar Título</div>
                    <div className="text-sm text-muted-foreground">Aplicar título otimizado pela IA</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium">Ajustar Preço</div>
                    <div className="text-sm text-muted-foreground">R$ 1.299 → R$ 1.259</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <div className="font-medium">Expandir Descrição</div>
                    <div className="text-sm text-muted-foreground">Adicionar especificações detalhadas</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
              </div>

              <div className="border-t pt-6">
                <Button size="lg" className="w-full bg-gradient-success">
                  <Zap className="mr-2 h-4 w-4" />
                  Publicar Todas as Alterações
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  As alterações serão aplicadas imediatamente no Mercado Livre
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};