import { useState, useEffect } from "react"
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
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Funcionario {
  id: string
  nome: string
  cpf: string
  rg?: string
  email?: string
  telefone?: string
  endereco?: string
  cargo: string
  departamento_id?: string
  departamento?: {
    nome: string
  }
  salario?: number
  data_admissao: string
  data_nascimento?: string
  status: string
  foto_url?: string
  observacoes?: string
  created_at: string
  updated_at: string
}

interface Departamento {
  id: string
  nome: string
  descricao?: string
}

export default function Funcionarios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [setorFilter, setSetorFilter] = useState("")
  const [tipoContratoFilter, setTipoContratoFilter] = useState("")
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

  // Buscar funcionários do Supabase
  const fetchFuncionarios = async () => {
    try {
      const { data, error } = await supabase
        .from('funcionarios')
        .select(`
          *,
          departamento:departamentos(nome)
        `)
        .order('nome')

      if (error) throw error
      setFuncionarios(data || [])
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar os funcionários.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Buscar departamentos
  const fetchDepartamentos = async () => {
    try {
      const { data, error } = await supabase
        .from('departamentos')
        .select('*')
        .order('nome')

      if (error) throw error
      setDepartamentos(data || [])
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error)
    }
  }

  // Carregar dados ao montar o componente
  useEffect(() => {
    fetchFuncionarios()
    fetchDepartamentos()
  }, [])
  // Atualizar a lógica de filtros para usar a nova estrutura do banco
  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.cpf.includes(searchTerm) ||
                         funcionario.id.includes(searchTerm)
    const matchesSetor = !setorFilter || setorFilter === "all" || funcionario.departamento?.nome === setorFilter
    const matchesTipo = !tipoContratoFilter || tipoContratoFilter === "all" || funcionario.status === tipoContratoFilter
    
    return matchesSearch && matchesSetor && matchesTipo
  })

  const getStatusBadge = (status: string) => (
    <Badge variant={status === 'ativo' ? "default" : "destructive"}>
      {status === 'ativo' ? "Ativo" : "Inativo"}
    </Badge>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Carregando funcionários...</p>
        </div>
      </div>
    )
  }

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
              {funcionarios.filter(f => f.status === 'ativo').length}
            </div>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">
              {funcionarios.filter(f => f.status === 'inativo').length}
            </div>
            <p className="text-sm text-muted-foreground">Inativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {funcionarios.filter(f => f.salario && f.salario > 0).length}
            </div>
            <p className="text-sm text-muted-foreground">Com Salário</p>
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
                  placeholder="Buscar por nome, CPF ou ID..."
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
                <SelectItem value="all">Todos os setores</SelectItem>
                {departamentos.map(departamento => (
                  <SelectItem key={departamento.id} value={departamento.nome}>
                    {departamento.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tipoContratoFilter} onValueChange={setTipoContratoFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
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
                  <TableHead>CPF</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Salário</TableHead>
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
                        {funcionario.foto_url ? (
                          <img 
                            src={funcionario.foto_url} 
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
                        <p className="text-sm text-muted-foreground">{funcionario.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">{funcionario.cpf}</TableCell>
                    <TableCell>{funcionario.cargo}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{funcionario.departamento?.nome || 'Sem departamento'}</Badge>
                    </TableCell>
                    <TableCell>
                      {funcionario.salario ? `R$ ${funcionario.salario.toLocaleString('pt-BR')}` : '-'}
                    </TableCell>
                    <TableCell>{getStatusBadge(funcionario.status)}</TableCell>
                    <TableCell>
                      {new Date(funcionario.data_admissao).toLocaleDateString('pt-BR')}
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