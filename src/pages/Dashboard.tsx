import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  Building,
  Award
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

export default function Dashboard() {
  // TODO: Dados virão do Supabase
  const metrics = {
    totalFuncionarios: 847,
    presentesHoje: 782,
    ausentesHoje: 65,
    substituicoes: 12
  }

  const funcionariosPorSetor = [
    { name: 'Administração', funcionarios: 120 },
    { name: 'Saúde', funcionarios: 200 },
    { name: 'Educação', funcionarios: 300 },
    { name: 'Obras', funcionarios: 80 },
    { name: 'Meio Ambiente', funcionarios: 60 },
    { name: 'Assistência Social', funcionarios: 87 }
  ]

  const funcionariosPorIndicador = [
    { name: 'Prefeito', funcionarios: 250, color: '#1e40af' },
    { name: 'Vereador João', funcionarios: 180, color: '#3b82f6' },
    { name: 'Vereadora Maria', funcionarios: 150, color: '#60a5fa' },
    { name: 'Vereador Carlos', funcionarios: 120, color: '#93c5fd' },
    { name: 'Outros', funcionarios: 147, color: '#dbeafe' }
  ]

  const alertas = [
    { id: 1, tipo: 'ausencia', funcionario: 'João Silva', dias: 2, setor: 'Administração' },
    { id: 2, tipo: 'substituicao', funcionario: 'Maria Santos', observacao: 'Substituição não autorizada', setor: 'Saúde' },
    { id: 3, tipo: 'ausencia', funcionario: 'Carlos Oliveira', dias: 3, setor: 'Educação' }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema de funcionários municipais
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            Última atualização
          </p>
          <p className="text-sm font-medium">
            {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{metrics.totalFuncionarios}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +12 este mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presentes Hoje</CardTitle>
            <UserCheck className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{metrics.presentesHoje}</div>
            <p className="text-xs text-muted-foreground">
              {((metrics.presentesHoje / metrics.totalFuncionarios) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausentes Hoje</CardTitle>
            <UserX className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{metrics.ausentesHoje}</div>
            <p className="text-xs text-muted-foreground">
              {((metrics.ausentesHoje / metrics.totalFuncionarios) * 100).toFixed(1)}% do total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Substituições</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{metrics.substituicoes}</div>
            <p className="text-xs text-muted-foreground">
              Hoje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Funcionários por Setor */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-primary" />
              Funcionários por Setor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={funcionariosPorSetor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="funcionarios" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Funcionários por Indicador Político */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Funcionários por Indicador
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={funcionariosPorIndicador}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="funcionarios"
                >
                  {funcionariosPorIndicador.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Alertas e Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div 
                key={alerta.id} 
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    alerta.tipo === 'ausencia' ? 'bg-destructive' : 'bg-warning'
                  }`} />
                  <div>
                    <p className="font-medium">{alerta.funcionario}</p>
                    <p className="text-sm text-muted-foreground">
                      {alerta.tipo === 'ausencia' 
                        ? `Ausente há ${alerta.dias} dias consecutivos` 
                        : alerta.observacao
                      } - {alerta.setor}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant={alerta.tipo === 'ausencia' ? 'destructive' : 'secondary'}>
                    {alerta.tipo === 'ausencia' ? 'Ausência' : 'Substituição'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}