import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eye, 
  ShoppingCart, 
  DollarSign,
  Brain,
  Target,
  Zap,
  ArrowRight
} from "lucide-react";

const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "up",
  description 
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend?: "up" | "down";
  description?: string;
}) => (
  <Card className="relative overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <div className="flex items-center text-xs">
        {trend === "up" ? (
          <TrendingUp className="mr-1 h-3 w-3 text-success" />
        ) : (
          <TrendingDown className="mr-1 h-3 w-3 text-destructive" />
        )}
        <span className={trend === "up" ? "text-success" : "text-destructive"}>
          {change}
        </span>
        {description && <span className="text-muted-foreground ml-1">{description}</span>}
      </div>
    </CardContent>
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
  </Card>
);

const AlertCard = ({ 
  type, 
  title, 
  description, 
  priority = "medium",
  action 
}: {
  type: "opportunity" | "warning" | "insight";
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
  action: string;
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "opportunity":
        return "border-success/20 bg-success/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "insight":
        return "border-accent/20 bg-accent/5";
      default:
        return "border-border";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "opportunity":
        return <Target className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "insight":
        return <Brain className="h-4 w-4 text-accent" />;
    }
  };

  return (
    <Card className={`${getTypeStyles()} transition-all hover:shadow-card cursor-pointer`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {getIcon()}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-sm">{title}</h4>
                <Badge 
                  variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {priority === "high" ? "Alta" : priority === "medium" ? "Média" : "Baixa"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="ml-2">
            {action}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Estratégico</h1>
          <p className="text-muted-foreground">
            Últimas 24h • Próxima atualização em 5 min
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Zap className="mr-2 h-4 w-4" />
            Executar Análise
          </Button>
          <Button size="sm" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
            <Brain className="mr-2 h-4 w-4" />
            Nova Estratégia
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita Total"
          value="R$ 24.567"
          change="+12.5%"
          icon={DollarSign}
          description="vs mês anterior"
        />
        <MetricCard
          title="Vendas"
          value="189"
          change="+8.2%"
          icon={ShoppingCart}
          description="esta semana"
        />
        <MetricCard
          title="Visitas"
          value="2.847"
          change="+23.1%"
          icon={Eye}
          description="últimos 7 dias"
        />
        <MetricCard
          title="Taxa Conversão"
          value="6.8%"
          change="-2.1%"
          icon={Target}
          trend="down"
          description="precisa atenção"
        />
      </div>

      {/* Alerts and Opportunities */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
            Alertas Inteligentes
          </h2>
          <div className="space-y-3">
            <AlertCard
              type="warning"
              title="Estoque Baixo Detectado"
              description="3 produtos com estoque crítico. Risco de perder vendas."
              priority="high"
              action="Revisar"
            />
            <AlertCard
              type="insight"
              title="Oportunidade de Preço"
              description="IA detectou espaço para aumento de 8% sem perder competitividade."
              priority="medium"
              action="Simular"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Target className="mr-2 h-5 w-5 text-success" />
            Oportunidades de Crescimento
          </h2>
          <div className="space-y-3">
            <AlertCard
              type="opportunity"
              title="Novo Nicho Identificado"
              description="Categoria 'Eletrônicos Gaming' com 340% de crescimento no seu nicho."
              priority="high"
              action="Explorar"
            />
            <AlertCard
              type="opportunity"
              title="Otimização de SEO"
              description="23 produtos podem melhorar ranking com ajustes de título sugeridos pela IA."
              priority="medium"
              action="Aplicar"
            />
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance dos Últimos 30 Dias</CardTitle>
          <CardDescription>
            Vendas, visitas e receita com insights de IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="text-muted-foreground">Gráfico de Performance</p>
              <p className="text-sm text-muted-foreground">
                Conecte ao Supabase para visualizar dados reais
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};