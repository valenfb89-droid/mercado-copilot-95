import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eye, 
  ShoppingCart, 
  Brain,
  Target,
  Star,
  ArrowRight,
  Edit,
  BarChart3,
  Trash2,
  MoreVertical
} from "lucide-react";
import { AIAnalysisService } from "@/services/aiAnalysisService";
import galaxyA54 from "@/assets/smartphone-galaxy-a54.jpg";

const ProductCard = ({ 
  id, 
  title, 
  price, 
  sales, 
  views, 
  conversion, 
  ranking, 
  aiScore, 
  alerts, 
  image,
  onDelete,
  onAnalyze,
  onOpenStrategy,
  isAnalyzing
}: {
  id: string;
  title: string;
  price: number;
  sales: number;
  views: number;
  conversion: number;
  ranking: number;
  aiScore: number;
  alerts: number;
  image: string;
  onDelete: (id: string) => void;
  onAnalyze?: (product: { id: string; title: string; price: number }) => void;
  onOpenStrategy?: (id: string) => void;
  isAnalyzing?: boolean;
}) => {
  const { toast } = useToast();
  const getAIScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getAIScoreBadge = (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bom";
    return "Precisa Atenção";
  };

  const handleDelete = () => {
    onDelete(id);
    toast({
      title: "Produto removido",
      description: `${title} foi removido da sua lista de produtos.`,
    });
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={`Imagem do produto: ${title}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'
                  }}
                />
              ) : (
                <ShoppingCart className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-base sm:text-lg font-bold text-primary">R$ {price.toLocaleString()}</span>
                <Badge variant="outline" className="text-xs">#{ranking}º</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {alerts > 0 && (
              <Badge variant="destructive" className="text-xs">
                {alerts} alertas
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remover produto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* AI Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Score IA</span>
          </div>
          <div className="flex items-center space-x-2">
            <Progress value={aiScore} className="w-16" />
            <span className={`text-sm font-bold ${getAIScoreColor(aiScore)}`}>
              {aiScore}%
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          {getAIScoreBadge(aiScore)} - IA analisou título, preço, SEO e concorrência
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold">{sales}</div>
            <div className="text-xs text-muted-foreground">Vendas</div>
          </div>
          <div>
            <div className="text-lg font-bold">{views}</div>
            <div className="text-xs text-muted-foreground">Visitas</div>
          </div>
          <div>
            <div className="text-lg font-bold">{conversion}%</div>
            <div className="text-xs text-muted-foreground">Conversão</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1" aria-label={`Analisar ${title}`} onClick={() => onAnalyze?.({ id, title, price })} disabled={isAnalyzing}>
            <BarChart3 className="mr-2 h-3 w-3" />
            {isAnalyzing ? "Analisando..." : "Analisar"}
          </Button>
          <Button size="sm" variant="ai" className="flex-1" aria-label={`Abrir estratégia para ${title}`} onClick={() => onOpenStrategy?.(id)}>
            <Brain className="mr-2 h-3 w-3" />
            Estratégia
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: "1",
      title: "Smartphone Samsung Galaxy A54 128GB 5G Câmera Tripla",
      price: 1299,
      sales: 47,
      views: 2843,
      conversion: 1.7,
      ranking: 3,
      aiScore: 85,
      alerts: 0,
      image: galaxyA54
    },
    {
      id: "2", 
      title: "Fone de Ouvido Bluetooth JBL Tune 510BT Wireless",
      price: 199,
      sales: 23,
      views: 1205,
      conversion: 1.9,
      ranking: 7,
      aiScore: 72,
      alerts: 1,
      image: ""
    },
    {
      id: "3",
      title: "Notebook Lenovo IdeaPad 3i Intel Core i5 8GB 256GB SSD",
      price: 2499,
      sales: 12,
      views: 956,
      conversion: 1.3,
      ranking: 12,
      aiScore: 45,
      alerts: 3,
      image: ""
    }
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [executingId, setExecutingId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const getDefaultModel = () => {
    return (
      localStorage.getItem('ai_default_model_openai') ||
      localStorage.getItem('ai_default_model_deepseek') ||
      localStorage.getItem('ai_default_model_google') ||
      'gpt-4o'
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleAnalyze = async (product: { id: string; title: string; price: number }) => {
    const model = getDefaultModel() as string;
    setExecutingId(product.id);
    try {
      const result = await AIAnalysisService.executeAnalysis({
        model,
        analysisType: 'diagnosis',
        prompt: `Analise o produto para diagnóstico estratégico: ${product.title} por R$ ${product.price}.`,
        productData: product
      });
      if (result.success) {
        toast({ title: 'Análise concluída', description: `Modelo ${result.model}: ${result.analysisType}` });
      } else {
        throw new Error(result.error || 'Falha na análise');
      }
    } catch (e: any) {
      toast({ title: 'Erro ao analisar', description: e.message || 'Verifique as chaves de API/configuração.', variant: 'destructive' });
    } finally {
      setExecutingId(null);
    }
  };

  const handleAnalyzeAll = async () => {
    const model = getDefaultModel() as string;
    toast({ title: 'Análise em lote iniciada', description: `${products.length} produtos` });
    for (const p of products) {
      try {
        await AIAnalysisService.executeAnalysis({
          model,
          analysisType: 'diagnosis',
          prompt: `Diagnóstico em lote do produto: ${p.title}`,
          productData: p
        });
      } catch {}
    }
    toast({ title: 'Análise em lote concluída' });
  };

  const openStrategy = (id: string) => navigate('/strategy');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Seus Produtos</h1>
          <p className="text-muted-foreground">
            {products.length} produtos ativos • Última análise: há 2 min
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={handleAnalyzeAll}>
            <Target className="mr-2 h-4 w-4" />
            Analisar Todos
          </Button>
          <Button size="sm" variant="ai" className="w-full sm:w-auto" onClick={() => navigate('/strategy')}>
            <Brain className="mr-2 h-4 w-4" />
            Estratégia Geral
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs text-muted-foreground">Produtos Ativos</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground">Alertas Ativos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-accent" />
              <div>
                <div className="text-2xl font-bold">67%</div>
                <div className="text-xs text-muted-foreground">Score IA Médio</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <div>
                <div className="text-2xl font-bold">+23%</div>
                <div className="text-xs text-muted-foreground">Crescimento</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-muted rounded-full mx-auto flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Nenhum produto ainda</h2>
            <p className="text-sm text-muted-foreground">Conecte sua conta para importar produtos e começar.</p>
            <Button size="sm" className="mx-auto">Conectar Produto</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} onDelete={handleDeleteProduct} onAnalyze={handleAnalyze} onOpenStrategy={openStrategy} isAnalyzing={executingId === product.id} />
          ))}
        </div>
      )}

      {/* Add Product Card */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium mb-2">Adicionar Novo Produto</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Conecte novos produtos do Mercado Livre ou crie estratégias para produtos existentes
          </p>
          <Button size="sm" className="w-full sm:w-auto">
            Conectar Produto
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};