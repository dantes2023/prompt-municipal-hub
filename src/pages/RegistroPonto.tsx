import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Clock, 
  LogIn, 
  LogOut, 
  Search,
  Filter,
  Calendar,
  Download,
  CheckCircle,
  XCircle
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface RegistroPonto {
  id: string
  funcionarioId: string
  funcionarioNome: string
  data: string
  entrada: string | null
  saidaAlmoco: string | null
  voltaAlmoco: string | null
  saida: string | null
  horasTrabalhadas: string
  status: 'completo' | 'incompleto' | 'falta'
}

export default function RegistroPonto() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dataFilter, setDataFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // TODO: Dados virão do Supabase
  const registros: RegistroPonto[] = [
    {
      id: "1",
      funcionarioId: "1",
      funcionarioNome: "João Silva Santos",
      data: "2024-01-15",
      entrada: "08:00",
      saidaAlmoco: "12:00",
      voltaAlmoco: "13:00",
      saida: "17:00",
      horasTrabalhadas: "08:00",
      status: "completo"
    },
    {
      id: "2", 
      funcionarioId: "2",
      funcionarioNome: "Maria Oliveira Costa",
      data: "2024-01-15",
      entrada: "08:30",
      saidaAlmoco: "12:30",
      voltaAlmoco: "13:30",
      saida: null,
      horasTrabalhadas: "04:00",
      status: "incompleto"
    },
    {
      id: "3",
      funcionarioId: "3", 
      funcionarioNome: "Carlos Pereira Lima",
      data: "2024-01-15",
      entrada: null,
      saidaAlmoco: null,
      voltaAlmoco: null,
      saida: null,
      horasTrabalhadas: "00:00",
      status: "falta"
    }
  ]

  const filteredRegistros = registros.filter(registro => {
    const matchesSearch = registro.funcionarioNome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesData = !dataFilter || registro.data === dataFilter
    const matchesStatus = !statusFilter || statusFilter === "all" || registro.status === statusFilter
    
    return matchesSearch && matchesData && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      completo: { variant: "default" as const, label: "Completo", icon: CheckCircle },
      incompleto: { variant: "secondary" as const, label: "Incompleto", icon: Clock },
      falta: { variant: "destructive" as const, label: "Falta", icon: XCircle }
    }
    
    const config = variants[status as keyof typeof variants] || variants.incompleto
    const Icon = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-8 h-8 text-primary" />
            Registro de Ponto
          </h1>
          <p className="text-muted-foreground">
            Controle de horários e frequência dos funcionários
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          Registrar Ponto
        </Button>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{registros.length}</div>
            <p className="text-sm text-muted-foreground">Total de Registros</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {registros.filter(r => r.status === 'completo').length}
            </div>
            <p className="text-sm text-muted-foreground">Completos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {registros.filter(r => r.status === 'incompleto').length}
            </div>
            <p className="text-sm text-muted-foreground">Incompletos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">
              {registros.filter(r => r.status === 'falta').length}
            </div>
            <p className="text-sm text-muted-foreground">Faltas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre os registros de ponto por funcionário, data ou status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por funcionário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Input
              type="date"
              value={dataFilter}
              onChange={(e) => setDataFilter(e.target.value)}
              className="w-full md:w-[200px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completo">Completo</SelectItem>
                <SelectItem value="incompleto">Incompleto</SelectItem>
                <SelectItem value="falta">Falta</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de registros */}
      <Card>
        <CardHeader>
          <CardTitle>
            Registros de Ponto ({filteredRegistros.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Funcionário</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead>Saída Almoço</TableHead>
                  <TableHead>Volta Almoço</TableHead>
                  <TableHead>Saída</TableHead>
                  <TableHead>Horas Trabalhadas</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistros.map((registro) => (
                  <TableRow key={registro.id}>
                    <TableCell className="font-medium">
                      {registro.funcionarioNome}
                    </TableCell>
                    <TableCell>
                      {format(new Date(registro.data), "dd/MM/yyyy", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <span className={registro.entrada ? "text-foreground" : "text-muted-foreground"}>
                        {registro.entrada || "--:--"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={registro.saidaAlmoco ? "text-foreground" : "text-muted-foreground"}>
                        {registro.saidaAlmoco || "--:--"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={registro.voltaAlmoco ? "text-foreground" : "text-muted-foreground"}>
                        {registro.voltaAlmoco || "--:--"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={registro.saida ? "text-foreground" : "text-muted-foreground"}>
                        {registro.saida || "--:--"}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono">
                      {registro.horasTrabalhadas}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(registro.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRegistros.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum registro de ponto encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}