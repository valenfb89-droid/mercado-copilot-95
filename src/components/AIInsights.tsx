import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Eye,
  Zap,
  BarChart3,
  Users,
  ShoppingCart,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight
} from "lucide-react";

const InsightCard = ({ 
  title, 
  category, 
  priority, 
  confidence, 
  impact, 
  description, 
  reasoning, 
  actionable,
  timeframe 
}: {
  title: string;
  category: "SEO" | "Pricing" | "Market" | "Competition" | "Performance";
  priority: "low" | "medium" | "high" | "critical";
  confidence: number;
  impact: string;
  description: string;
  reasoning: string;
  actionable: boolean;
  timeframe: string;
}) => {
  const getCategoryColor = () => {
    switch (category) {
      case "SEO": return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "Pricing": return "bg-green-500/10 text-green-700 border-green-200";
      case "Market": return "bg-purple-500/10 text-purple-700 border-purple-200";
      case "Competition": return "bg-red-500/10 text-red-700 border-red-200";
      case "Performance": return "bg-orange-500/10 text-orange-700 border-orange-200";
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "critical": return "destructive";
      case "high": return "default";
      case "medium": return "secondary";
      case "low": return "outline";
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-accent" />
              <Badge className={getCategoryColor()}>{category}</Badge>
              <Badge variant={getPriorityColor() as any}>{priority}</Badge>
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Confiança IA</div>
            <div className="text-xl font-bold text-accent">{confidence}%</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <Target className="h-3 w-3 text-primary" />
            <span className="text-primary font-medium">Impacto Estimado: {impact}</span>
          </div>
        </div>

        {/* Reasoning */}
        <div className="border-l-2 border-accent/20 pl-3">
          <h5 className="text-sm font-medium text-accent mb-1">Por que a IA sugere isso:</h5>
          <p className="text-xs text-muted-foreground">{reasoning}</p>
        </div>

        {/* Confidence Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Nível de Confiança</span>
            <span>{confidence}%</span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>

        {/* Action Info */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-2">
            {actionable ? (
              <CheckCircle className="h-4 w-4 text-success" />
            ) : (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="text-sm text-muted-foreground">
              {actionable ? "Ação Disponível" : "Apenas Insight"}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeframe}</span>
          </div>
        </div>

        {actionable && (
          <Button size="sm" className="w-full">
            <Zap className="mr-2 h-3 w-3" />
            Aplicar Recomendação
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const QuickStat = ({ icon: Icon, label, value, trend, trendValue }: {
  icon: any;
  label: string;
  value: string;
  trend: "up" | "down" | "stable";
  trendValue: string;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="text-xl font-bold">{value}</div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
          {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
          {trend === "stable" && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
          <span className={`text-sm font-medium ${
            trend === "up" ? "text-success" : 
            trend === "down" ? "text-destructive" : 
            "text-muted-foreground"
          }`}>
            {trendValue}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const AIInsights = () => {
  const insights: any[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IA Insights</h1>
          <p className="text-muted-foreground">
            Análises inteligentes e recomendações explicadas • Última atualização: há 5 min
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Configurar IA
          </Button>
          <Button size="sm" variant="ai" onClick={() => window.location.assign('/insights')}>
            <Brain className="mr-2 h-4 w-4" />
            Central de Análise
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <QuickStat
          icon={Lightbulb}
          label="Insights Ativos"
          value="0"
          trend="stable"
          trendValue="0"
        />
        <QuickStat
          icon={Target}
          label="Ações Pendentes"
          value="0"
          trend="stable"
          trendValue="0"
        />
        <QuickStat
          icon={CheckCircle}
          label="Aplicadas Hoje"
          value="0"
          trend="stable"
          trendValue="0"
        />
        <QuickStat
          icon={BarChart3}
          label="Taxa Sucesso"
          value="--"
          trend="stable"
          trendValue="0"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="priority" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="priority">Por Prioridade</TabsTrigger>
          <TabsTrigger value="category">Por Categoria</TabsTrigger>
          <TabsTrigger value="actionable">Acionáveis</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="priority" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {insights
              .sort((a, b) => {
                const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
              })
              .map((insight, idx) => (
                <InsightCard key={idx} {...insight} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="category" className="space-y-6">
          {["SEO", "Pricing", "Market", "Competition", "Performance"].map(category => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                {category}
              </h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {insights
                  .filter(insight => insight.category === category)
                  .map((insight, idx) => (
                    <InsightCard key={idx} {...insight} />
                  ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="actionable" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {insights
              .filter(insight => insight.actionable)
              .map((insight, idx) => (
                <InsightCard key={idx} {...insight} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Insights Aplicados</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground text-center py-6">Nenhum insight aplicado ainda.</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};