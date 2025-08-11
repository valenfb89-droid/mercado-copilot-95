import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AIAnalysisService } from "@/services/aiAnalysisService";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  ShoppingCart, 
  Star,
  Target,
  AlertTriangle,
  Brain,
  Zap,
  Search,
  Filter,
  BarChart3,
  DollarSign
} from "lucide-react";

const CompetitorCard = ({ 
  name, 
  rating, 
  sales, 
  price, 
  ourPrice, 
  ranking, 
  gap, 
  strengths, 
  weaknesses,
  aiRecommendation 
}: {
  name: string;
  rating: number;
  sales: number;
  price: number;
  ourPrice: number;
  ranking: number;
  gap: string;
  strengths: string[];
  weaknesses: string[];
  aiRecommendation: string;
}) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getDefaultModel = () => (
    localStorage.getItem('ai_default_model_deepseek') ||
    localStorage.getItem('ai_default_model_openai') ||
    localStorage.getItem('ai_default_model_google') ||
    'deepseek-v2'
  );

  // Cálculo de vantagem de preço e diferença percentual
  const priceAdvantage = ourPrice < price;
  const priceDiffPercent = price > 0 ? Math.round(Math.abs(((price - ourPrice) / price) * 100)) : 0;

  // Ação de análise por concorrente
  const handleAnalyze = async () => {
    const model = getDefaultModel() as string;
    setIsAnalyzing(true);
    toast({ title: `Analisando ${name}...` });
    try {
      await AIAnalysisService.executeAnalysis({
        model,
        analysisType: 'benchmarking',
        prompt: `Analise o concorrente ${name} comparando com nosso produto atual. Foque em preço, reputação e oportunidades.`,
        productData: { competitor: name, price, ourPrice, ranking }
      });
      toast({ title: 'Análise concluída' });
    } catch (e: any) {
      toast({ title: 'Erro', description: e.message || 'Falha ao analisar concorrente', variant: 'destructive' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-warning fill-current" />
                <span className="font-medium">{rating}</span>
              </div>
              <Badge variant="outline">#{ranking}º posição</Badge>
            </div>
          </div>
          <Badge 
            variant={gap === "Oportunidade" ? "default" : gap === "Ameaça" ? "destructive" : "secondary"}
          >
            {gap}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Comparison */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-sm text-muted-foreground">Preço Concorrente</div>
            <div className="text-lg font-bold">R$ {price.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="text-sm text-muted-foreground">Nosso Preço</div>
            <div className="text-lg font-bold text-primary">R$ {ourPrice.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {priceAdvantage ? (
            <>
              <TrendingDown className="h-4 w-4 text-success" />
              <span className="text-sm text-success font-medium">
                {priceDiffPercent}% mais barato
              </span>
            </>
          ) : (
            <>
              <TrendingUp className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">
                {priceDiffPercent}% mais caro
              </span>
            </>
          )}
        </div>

        {/* Sales */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Vendas Estimadas</span>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{sales}/mês</span>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="space-y-3">
          <div>
            <h5 className="text-sm font-medium text-success mb-2">Pontos Fortes</h5>
            <div className="space-y-1">
              {strengths.map((strength, idx) => (
                <div key={idx} className="text-xs text-muted-foreground">• {strength}</div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-destructive mb-2">Pontos Fracos</h5>
            <div className="space-y-1">
              {weaknesses.map((weakness, idx) => (
                <div key={idx} className="text-xs text-muted-foreground">• {weakness}</div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="border-t pt-3">
          <div className="flex items-start space-x-2">
            <Brain className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs font-medium text-accent mb-1">IA Recomenda:</div>
              <div className="text-xs text-muted-foreground">{aiRecommendation}</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1" onClick={handleAnalyze} disabled={isAnalyzing}>
            <Eye className="mr-2 h-3 w-3" />
            {isAnalyzing ? 'Analisando...' : 'Analisar'}
          </Button>
          <Button size="sm" variant="ai" className="flex-1">
            <Target className="mr-2 h-3 w-3" />
            Contra-atacar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const MarketInsight = ({ title, value, trend, description }: {
  title: string;
  value: string;
  trend: "up" | "down" | "stable";
  description: string;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-sm">{title}</h4>
        {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
        {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
        {trend === "stable" && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </CardContent>
  </Card>
);

export const CompetitorAnalysis = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const competitors = [
    {
      name: "TechStore Premium",
      rating: 4.8,
      sales: 156,
      price: 1350,
      ourPrice: 1299,
      ranking: 1,
      gap: "Ameaça",
      strengths: ["Maior reputação", "Entrega mais rápida", "Melhor atendimento"],
      weaknesses: ["Preço mais alto", "Menos variedade", "Estoque limitado"],
      aiRecommendation: "Melhorar tempo de entrega e investir em atendimento. Manter vantagem de preço."
    },
    {
      name: "Galaxy Outlet",
      rating: 4.2,
      sales: 89,
      price: 1199,
      ourPrice: 1299,
      ranking: 5,
      gap: "Oportunidade",
      strengths: ["Preço agressivo", "Promoções frequentes"],
      weaknesses: ["Reputação baixa", "Qualidade questionável", "Atendimento ruim"],
      aiRecommendation: "Ajustar preço para R$ 1.249 e destacar qualidade superior nos anúncios."
    },
    {
      name: "SmartPhone Express",
      rating: 4.5,
      sales: 134,
      price: 1289,
      ourPrice: 1299,
      ranking: 2,
      gap: "Neutro",
      strengths: ["Boa reputação", "Preço competitivo", "Variedade"],
      weaknesses: ["Descrição básica", "Imagens fracas"],
      aiRecommendation: "Melhorar qualidade das imagens e descrição do produto para superar."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Análise de Concorrentes</h1>
          <p className="text-muted-foreground">
            Monitoramento inteligente da concorrência • Categoria: Smartphones
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button size="sm" variant="ai" className="w-full sm:w-auto" onClick={async () => {
            const model = localStorage.getItem('ai_default_model_deepseek') || localStorage.getItem('ai_default_model_openai') || 'deepseek-v2';
            toast({ title: 'Análise Geral iniciada' });
            try {
              await AIAnalysisService.executeAnalysis({
                model: model as string,
                analysisType: 'benchmarking',
                prompt: 'Execute uma análise competitiva geral da categoria atual.',
                productData: { scope: 'category' }
              });
              toast({ title: 'Análise Geral concluída' });
            } catch (e: any) {
              toast({ title: 'Erro', description: e.message || 'Falha na análise geral', variant: 'destructive' });
            }
          }}>
            <Brain className="mr-2 h-4 w-4" />
            Análise Geral
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar concorrentes, produtos..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Target className="mr-2 h-4 w-4" />
              Adicionar Concorrente
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analysis">Análise Detalhada</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Market Insights */}
          <div className="grid gap-4 md:grid-cols-4">
            <MarketInsight
              title="Preço Médio Mercado"
              value="R$ 1.279"
              trend="up"
              description="+3.2% vs mês anterior"
            />
            <MarketInsight
              title="Nosso Ranking"
              value="#3º"
              trend="stable"
              description="Mantido nas últimas 2 semanas"
            />
            <MarketInsight
              title="Concorrentes Ativos"
              value="12"
              trend="up"
              description="2 novos neste mês"
            />
            <MarketInsight
              title="Market Share"
              value="18.5%"
              trend="up"
              description="+2.1% de crescimento"
            />
          </div>

          {/* Competitors Grid */}
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {competitors.map((competitor, idx) => (
              <CompetitorCard key={idx} {...competitor} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Price Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Análise de Preços
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-48 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Gráfico de Distribuição de Preços</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Preço Mais Baixo</span>
                    <span className="font-medium">R$ 1.199 (Galaxy Outlet)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Preço Mais Alto</span>
                    <span className="font-medium">R$ 1.350 (TechStore)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Nosso Posicionamento</span>
                    <span className="font-medium text-primary">Médio-Alto</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reputation Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2 h-5 w-5" />
                  Análise de Reputação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {competitors.map((comp, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{comp.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-3 w-3 text-warning fill-current" />
                      <span className="text-sm font-medium">{comp.rating}</span>
                      <Progress value={comp.rating * 20} className="w-16" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI Strategic Recommendations */}
          <Card className="border-accent/20 bg-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center text-accent">
                <Brain className="mr-2 h-5 w-5" />
                Recomendações Estratégicas da IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Target className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Oportunidade Imediata</h4>
                    <p className="text-sm text-muted-foreground">
                      Ajustar preço para R$ 1.249 e melhorar tempo de entrega pode aumentar vendas em 23%
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="h-4 w-4 text-warning mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Ação Urgente</h4>
                    <p className="text-sm text-muted-foreground">
                      TechStore está ganhando market share. Investir em qualidade de atendimento imediatamente
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">Ameaça Detectada</h4>
                    <p className="text-sm text-muted-foreground">
                      Galaxy Outlet pode estar vendendo produtos não-originais. Destacar autenticidade dos nossos produtos
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendências do Mercado</CardTitle>
              <CardDescription>Últimos 90 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Gráfico de Tendências Temporais</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conecte ao Supabase para dados reais
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};