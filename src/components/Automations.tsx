import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  Clock, 
  Target, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Settings,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  DollarSign,
  Eye,
  TrendingUp,
  Calendar
} from "lucide-react";

const AutomationCard = ({ 
  title, 
  description, 
  status, 
  trigger, 
  frequency, 
  lastRun, 
  success, 
  impact,
  actions 
}: {
  title: string;
  description: string;
  status: "active" | "paused" | "error";
  trigger: string;
  frequency: string;
  lastRun: string;
  success: number;
  impact: string;
  actions: number;
}) => {
  const [isActive, setIsActive] = useState(status === "active");

  const getStatusColor = () => {
    switch (status) {
      case "active": return "text-success";
      case "paused": return "text-warning"; 
      case "error": return "text-destructive";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4 text-success" />;
      case "paused": return <Pause className="h-4 w-4 text-warning" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <Card className="hover:shadow-card transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon()}
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
            <CardDescription>{description}</CardDescription>
          </div>
          <Switch 
            checked={isActive}
            onCheckedChange={setIsActive}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Trigger & Frequency */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Gatilho</div>
            <div className="text-sm font-medium">{trigger}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Frequência</div>
            <div className="text-sm font-medium">{frequency}</div>
          </div>
        </div>

        {/* Performance */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Taxa de Sucesso</span>
            <span>{success}%</span>
          </div>
          <Progress value={success} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold">{actions}</div>
            <div className="text-xs text-muted-foreground">Ações</div>
          </div>
          <div>
            <div className="text-lg font-bold text-primary">{impact}</div>
            <div className="text-xs text-muted-foreground">Impacto</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{lastRun}</div>
            <div className="text-xs text-muted-foreground">Última exec.</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="mr-2 h-3 w-3" />
            Editar
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <BarChart3 className="mr-2 h-3 w-3" />
            Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RuleBuilder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plus className="mr-2 h-5 w-5" />
          Criar Nova Automação
        </CardTitle>
        <CardDescription>
          Configure regras inteligentes para otimização automática
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nome da Automação</label>
            <Input placeholder="Ex: Ajuste de preço competitivo" className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Gatilho</label>
            <select className="w-full mt-1 p-2 border rounded-md bg-background">
              <option>Concorrente mudou preço</option>
              <option>Estoque baixo detectado</option>
              <option>Queda no ranking</option>
              <option>Meta de vendas não atingida</option>
              <option>Novo insight da IA</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Ação</label>
            <select className="w-full mt-1 p-2 border rounded-md bg-background">
              <option>Ajustar preço automaticamente</option>
              <option>Otimizar título do produto</option>
              <option>Enviar alerta</option>
              <option>Pausar anúncio</option>
              <option>Aumentar estoque</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Condição</label>
              <Input placeholder="Ex: Diferença > 5%" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Limite</label>
              <Input placeholder="Ex: Máx 3x por dia" className="mt-1" />
            </div>
          </div>
        </div>

        <Button className="w-full">
          <Zap className="mr-2 h-4 w-4" />
          Criar Automação
        </Button>
      </CardContent>
    </Card>
  );
};

export const Automations = () => {
  const automations: any[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automações Inteligentes</h1>
          <p className="text-muted-foreground">
            Regras de negócio e ações automáticas baseadas em IA • {automations.filter(a => a.status === "active").length} ativas
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:justify-end">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
          <Button size="sm" variant="ai" className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nova Automação
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">{automations.filter(a => a.status === "active").length}</div>
                <div className="text-xs text-muted-foreground">Automações Ativas</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-success" />
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-muted-foreground">Ações Executadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground">Taxa de Sucesso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <div className="text-2xl font-bold">--</div>
                <div className="text-xs text-muted-foreground">ROI Automações</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Ativas</TabsTrigger>
          <TabsTrigger value="create">Criar Nova</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {automations.map((automation, idx) => (
              <AutomationCard key={idx} {...automation} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <RuleBuilder />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="p-6 text-center text-sm text-muted-foreground">Nenhum template disponível.</div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log de Execuções</CardTitle>
              <CardDescription>Últimas 48 horas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground text-center py-6">Sem logs de automações ainda.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};