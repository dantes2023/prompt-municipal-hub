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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Eye, 
  UserX,
  Download,
  Users
} from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Funcionario {
  id: string
  nome: string
  cpf: string
  matricula: string
  cargo: string
  setor: string
  indicador: string
  tipoContrato: string
  dataAdmissao: string
  ativo: boolean
  foto?: string
}

export default function Funcionarios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [setorFilter, setSetorFilter] = useState("")
  const [tipoContratoFilter, setTipoContratoFilter] = useState("")
  const navigate = useNavigate()

  // TODO: Dados virão do Supabase
  const funcionarios: Funcionario[] = [
    {
      id: "1",
      nome: "João Silva Santos",
      cpf: "123.456.789-00",
      matricula: "2024001",
      cargo: "Assistente Administrativo",
      setor: "Administração",
      indicador: "Prefeito Municipal",
      tipoContrato: "efetivo",
      dataAdmissao: "2024-01-15",
      ativo: true
    },
    {
      id: "2",
      nome: "Maria Oliveira Costa",
      cpf: "987.654.321-00",
      matricula: "2024002",
      cargo: "Enfermeira",
      setor: "Saúde",
      indicador: "Vereador João Silva",
      tipoContrato: "comissionado",
      dataAdmissao: "2024-02-01",
      ativo: true
    },
    {
      id: "3",
      nome: "Carlos Pereira Lima",
      cpf: "456.789.123-00",
      matricula: "2024003",
      cargo: "Professor",
      setor: "Educação",
      indicador: "Vereadora Maria Santos",
      tipoContrato: "temporario",
      dataAdmissao: "2024-03-10",
      ativo: false
    }
  ]

  const setores = ["Administração", "Saúde", "Educação", "Obras", "Meio Ambiente"]
  const tiposContrato = ["efetivo", "comissionado", "temporario"]

  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.cpf.includes(searchTerm) ||
                         funcionario.matricula.includes(searchTerm)
    const matchesSetor = !setorFilter || funcionario.setor === setorFilter
    const matchesTipo = !tipoContratoFilter || funcionario.tipoContrato === tipoContratoFilter
    
    return matchesSearch && matchesSetor && matchesTipo
  })

  const getTipoContratoBadge = (tipo: string) => {
    const variants = {
      efetivo: "default",
      comissionado: "secondary", 
      temporario: "outline"
    } as const
    
    return (
      <Badge variant={variants[tipo as keyof typeof variants] || "default"}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (ativo: boolean) => (
    <Badge variant={ativo ? "default" : "destructive"}>
      {ativo ? "Ativo" : "Inativo"}
    </Badge>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="w-8 h-8 text-primary" />
            Funcionários
          </h1>
          <p className="text-muted-foreground">
            Gerencie todos os funcionários da prefeitura
          </p>
        </div>
        <Button onClick={() => navigate('/funcionarios/novo')} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Funcionário
        </Button>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{funcionarios.length}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {funcionarios.filter(f => f.ativo).length}
            </div>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">
              {funcionarios.filter(f => !f.ativo).length}
            </div>
            <p className="text-sm text-muted-foreground">Inativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {funcionarios.filter(f => f.tipoContrato === 'temporario').length}
            </div>
            <p className="text-sm text-muted-foreground">Temporários</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar funcionários específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, CPF ou matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={setorFilter} onValueChange={setSetorFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os setores</SelectItem>
                {setores.map(setor => (
                  <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tipoContratoFilter} onValueChange={setTipoContratoFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo de contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                {tiposContrato.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de funcionários */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Lista de Funcionários ({filteredFuncionarios.length})
            </CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros avançados
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Foto</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Matrícula</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admissão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFuncionarios.map((funcionario) => (
                  <TableRow key={funcionario.id}>
                    <TableCell>
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        {funcionario.foto ? (
                          <img 
                            src={funcionario.foto} 
                            alt={funcionario.nome}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-medium">
                            {funcionario.nome.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{funcionario.nome}</p>
                        <p className="text-sm text-muted-foreground">{funcionario.cpf}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{funcionario.matricula}</TableCell>
                    <TableCell>{funcionario.cargo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{funcionario.setor}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{funcionario.indicador}</TableCell>
                    <TableCell>{getTipoContratoBadge(funcionario.tipoContrato)}</TableCell>
                    <TableCell>{getStatusBadge(funcionario.ativo)}</TableCell>
                    <TableCell>
                      {new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="mr-2 h-4 w-4" />
                            Desativar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFuncionarios.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum funcionário encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}