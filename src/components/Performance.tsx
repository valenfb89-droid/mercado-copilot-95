import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  DollarSign, 
  ShoppingCart, 
  Eye, 
  Target,
  Calendar,
  Download,
  Filter,
  Star,
  Users,
  Clock,
  Zap
} from "lucide-react";

const MetricCard = ({ 
  title, 
  current, 
  previous, 
  change, 
  changePercent, 
  trend, 
  icon: Icon 
}: {
  title: string;
  current: string;
  previous: string;
  change: string;
  changePercent: string;
  trend: "up" | "down" | "stable";
  icon: any;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{current}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1">
            {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
            {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
            {trend === "stable" && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
            <span className={`text-sm font-medium ${
              trend === "up" ? "text-success" : 
              trend === "down" ? "text-destructive" : 
              "text-muted-foreground"
            }`}>
              {changePercent}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">vs período anterior</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Período Anterior: {previous}</span>
          <span>{change}</span>
        </div>
        <Progress 
          value={trend === "up" ? 75 : trend === "down" ? 25 : 50} 
          className="h-2"
        />
      </div>
    </CardContent>
  </Card>
);

const ProductPerformanceCard = ({ 
  name, 
  revenue, 
  sales, 
  views, 
  conversion, 
  growth, 
  ranking 
}: {
  name: string;
  revenue: number;
  sales: number;
  views: number;
  conversion: number;
  growth: number;
  ranking: number;
}) => (
  <Card className="hover:shadow-card transition-all duration-200">
    <CardContent className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-sm line-clamp-2">{name}</h4>
          <Badge variant="outline" className="mt-1">#{ranking}º</Badge>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">R$ {revenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Receita 30d</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div>
          <div className="font-bold">{sales}</div>
          <div className="text-muted-foreground">Vendas</div>
        </div>
        <div>
          <div className="font-bold">{views.toLocaleString()}</div>
          <div className="text-muted-foreground">Visitas</div>
        </div>
        <div>
          <div className="font-bold">{conversion}%</div>
          <div className="text-muted-foreground">Conversão</div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-3 pt-3 border-t">
        {growth > 0 ? (
          <div className="flex items-center space-x-1 text-success">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs font-medium">+{growth}% crescimento</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 text-destructive">
            <TrendingDown className="h-3 w-3" />
            <span className="text-xs font-medium">{growth}% decréscimo</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export const Performance = () => {
  const topProducts = [
    {
      name: "Smartphone Samsung Galaxy A54 128GB 5G",
      revenue: 61203,
      sales: 47,
      views: 2847,
      conversion: 1.7,
      growth: 12.3,
      ranking: 3
    },
    {
      name: "Fone de Ouvido Bluetooth JBL Tune 510BT",
      revenue: 4577,
      sales: 23,
      views: 1205,
      conversion: 1.9,
      growth: 8.7,
      ranking: 7
    },
    {
      name: "Notebook Lenovo IdeaPad 3i Intel Core i5",
      revenue: 29988,
      sales: 12,
      views: 956,
      conversion: 1.3,
      growth: -5.2,
      ranking: 12
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance & Analytics</h1>
          <p className="text-muted-foreground">
            Métricas detalhadas e evolução temporal • Últimos 30 dias
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Calendar className="mr-2 h-4 w-4" />
            Período
          </Button>
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" variant="ai" className="w-full sm:w-auto">
            <BarChart3 className="mr-2 h-4 w-4" />
            Relatório IA
          </Button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Receita Total"
          current="R$ 95.768"
          previous="R$ 78.234"
          change="+R$ 17.534"
          changePercent="+22.4%"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          title="Total de Vendas"
          current="82"
          previous="71"
          change="+11"
          changePercent="+15.5%"
          trend="up"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Visitas Totais"
          current="5.008"
          previous="4.203"
          change="+805"
          changePercent="+19.1%"
          trend="up"
          icon={Eye}
        />
        <MetricCard
          title="Taxa Conversão Média"
          current="1.64%"
          previous="1.69%"
          change="-0.05%"
          changePercent="-3.0%"
          trend="down"
          icon={Target}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Por Produto</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Temporal</CardTitle>
              <CardDescription>Receita, vendas e visitas dos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">Gráfico de Performance Temporal</p>
                  <p className="text-sm text-muted-foreground">
                    Conecte ao Supabase para visualizar dados reais
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <div>
                    <h4 className="font-medium text-sm">Melhor Semana</h4>
                    <p className="text-xs text-muted-foreground">Semana passada: +34% vs média</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-primary" />
                  <div>
                    <h4 className="font-medium text-sm">Produto Star</h4>
                    <p className="text-xs text-muted-foreground">Galaxy A54: 64% da receita</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <div>
                    <h4 className="font-medium text-sm">Oportunidade</h4>
                    <p className="text-xs text-muted-foreground">Melhorar conversão em 0.3%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Product Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Top Produtos - Performance</CardTitle>
              <CardDescription>Ordenado por receita nos últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 lg:grid-cols-3">
                {topProducts.map((product, idx) => (
                  <ProductPerformanceCard key={idx} {...product} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Product Table */}
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada por Produto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Produto</th>
                      <th className="text-right p-2">Receita</th>
                      <th className="text-right p-2">Vendas</th>
                      <th className="text-right p-2">Visitas</th>
                      <th className="text-right p-2">Conversão</th>
                      <th className="text-right p-2">Ranking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted/20">
                        <td className="p-2">
                          <div>
                            <div className="font-medium line-clamp-1">{product.name}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              {product.growth > 0 ? (
                                <TrendingUp className="h-3 w-3 text-success" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-destructive" />
                              )}
                              <span className={`text-xs ${product.growth > 0 ? 'text-success' : 'text-destructive'}`}>
                                {product.growth > 0 ? '+' : ''}{product.growth}%
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="text-right p-2 font-medium">R$ {product.revenue.toLocaleString()}</td>
                        <td className="text-right p-2">{product.sales}</td>
                        <td className="text-right p-2">{product.views.toLocaleString()}</td>
                        <td className="text-right p-2">{product.conversion}%</td>
                        <td className="text-right p-2">
                          <Badge variant="outline">#{product.ranking}º</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Vendas</CardTitle>
                <CardDescription>Últimos 90 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Gráfico de Tendência de Vendas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sazonalidade</CardTitle>
                <CardDescription>Padrões por dia da semana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Análise de Sazonalidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Metas do Mês</CardTitle>
                <CardDescription>Progresso das metas estabelecidas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Receita", target: 120000, current: 95768, unit: "R$" },
                  { name: "Vendas", target: 100, current: 82, unit: "" },
                  { name: "Novos Clientes", target: 50, current: 34, unit: "" },
                  { name: "Taxa Conversão", target: 2.0, current: 1.64, unit: "%" }
                ].map((goal, idx) => {
                  const progress = (goal.current / goal.target) * 100;
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {goal.unit === "R$" ? `R$ ${goal.current.toLocaleString()}` : `${goal.current}${goal.unit}`} / {goal.unit === "R$" ? `R$ ${goal.target.toLocaleString()}` : `${goal.target}${goal.unit}`}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Progress value={Math.min(progress, 100)} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{progress.toFixed(1)}% concluído</span>
                          <span>{Math.max(0, goal.target - goal.current)} restante</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Performance Score */}
            <Card>
              <CardHeader>
                <CardTitle>Score de Performance</CardTitle>
                <CardDescription>Avaliação geral baseada em múltiplas métricas</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <div className="text-6xl font-bold text-primary mb-2">8.7</div>
                  <div className="text-sm text-muted-foreground">de 10.0</div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { metric: "Vendas", score: 9.2 },
                    { metric: "Crescimento", score: 8.8 },
                    { metric: "Eficiência", score: 7.9 },
                    { metric: "Competitividade", score: 8.9 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm">{item.metric}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.score * 10} className="w-20" />
                        <span className="text-sm font-medium w-8">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};