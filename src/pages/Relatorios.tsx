import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  BarChart3,
  Clock,
  DollarSign,
  Award,
  Building,
  Filter
} from "lucide-react"

interface RelatorioItem {
  id: string
  nome: string
  descricao: string
  categoria: string
  icon: React.ReactNode
  ultimaGeracao?: string
}

export default function Relatorios() {
  const [categoriaFilter, setCategoriaFilter] = useState("")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [setorFilter, setSetorFilter] = useState("")

  const relatorios: RelatorioItem[] = [
    {
      id: "funcionarios-ativos",
      nome: "Funcionários Ativos",
      descricao: "Lista completa de funcionários ativos por setor",
      categoria: "funcionarios",
      icon: <Users className="w-5 h-5" />,
      ultimaGeracao: "2024-01-15"
    },
    {
      id: "frequencia-mensal",
      nome: "Frequência Mensal",
      descricao: "Relatório de frequência e pontualidade dos funcionários",
      categoria: "ponto",
      icon: <Clock className="w-5 h-5" />,
      ultimaGeracao: "2024-01-10"
    },
    {
      id: "folha-pagamento",
      nome: "Folha de Pagamento",
      descricao: "Relatório consolidado da folha de pagamento",
      categoria: "financeiro",
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      id: "cargos-setor",
      nome: "Cargos por Setor",
      descricao: "Distribuição de cargos e funções por setor",
      categoria: "estrutura",
      icon: <Award className="w-5 h-5" />
    },
    {
      id: "lotacao-setor",
      nome: "Lotação por Setor",
      descricao: "Número de funcionários lotados em cada setor",
      categoria: "estrutura",
      icon: <Building className="w-5 h-5" />,
      ultimaGeracao: "2024-01-12"
    },
    {
      id: "admissoes-demissoes",
      nome: "Admissões e Demissões",
      descricao: "Movimentação de funcionários no período",
      categoria: "funcionarios",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: "indicadores-politicos",
      nome: "Funcionários por Indicador",
      descricao: "Relatório de funcionários agrupados por indicador político",
      categoria: "politicos",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "contratos-tipo",
      nome: "Tipos de Contrato",
      descricao: "Distribuição de funcionários por tipo de contrato",
      categoria: "funcionarios",
      icon: <FileText className="w-5 h-5" />
    }
  ]

  const categorias = [
    { value: "funcionarios", label: "Funcionários" },
    { value: "ponto", label: "Ponto" },
    { value: "financeiro", label: "Financeiro" },
    { value: "estrutura", label: "Estrutura" },
    { value: "politicos", label: "Políticos" }
  ]

  const setores = ["Administração", "Saúde", "Educação", "Obras", "Meio Ambiente"]

  const filteredRelatorios = relatorios.filter(relatorio => {
    const matchesCategoria = !categoriaFilter || categoriaFilter === "all" || relatorio.categoria === categoriaFilter
    return matchesCategoria
  })

  const gerarRelatorio = (relatorioId: string) => {
    // TODO: Implementar geração de relatório
    console.log("Gerando relatório:", relatorioId, {
      dataInicio,
      dataFim,
      setor: setorFilter
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8 text-primary" />
            Relatórios
          </h1>
          <p className="text-muted-foreground">
            Gere relatórios gerenciais e analíticos do sistema
          </p>
        </div>
      </div>

      {/* Filtros globais */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros Globais</CardTitle>
          <CardDescription>
            Configure os filtros que serão aplicados aos relatórios gerados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data-inicio">Data Início</Label>
              <Input
                id="data-inicio"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="data-fim">Data Fim</Label>
              <Input
                id="data-fim"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setor">Setor</Label>
              <Select value={setorFilter} onValueChange={setSetorFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os setores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os setores</SelectItem>
                  {setores.map(setor => (
                    <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria.value} value={categoria.value}>
                      {categoria.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRelatorios.map((relatorio) => (
          <Card key={relatorio.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {relatorio.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
                    <CardDescription className="text-sm">
                      {relatorio.descricao}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relatorio.ultimaGeracao && (
                  <div className="text-sm text-muted-foreground">
                    Última geração: {new Date(relatorio.ultimaGeracao).toLocaleDateString('pt-BR')}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => gerarRelatorio(relatorio.id)}
                    className="flex-1 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Gerar PDF
                  </Button>
                  <Button 
                    onClick={() => gerarRelatorio(relatorio.id)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRelatorios.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum relatório encontrado com os filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Relatórios rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Gere relatórios frequentemente utilizados com um clique
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Funcionários Ativos Hoje</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Clock className="w-6 h-6" />
              <span>Ponto da Semana</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span>Dashboard Executivo</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}