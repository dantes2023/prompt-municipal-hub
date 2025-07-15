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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  UserCheck, 
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Phone,
  Mail
} from "lucide-react"

interface Indicador {
  id: string
  nome: string
  cargo: string
  tipo: 'prefeito' | 'vereador' | 'secretario'
  partido: string | null
  telefone: string | null
  email: string | null
  quantidadeIndicacoes: number
  quantidadeFuncionariosAtivos: number
  ativo: boolean
  created_at: string
}

export default function Indicadores() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFilter, setTipoFilter] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndicador, setEditingIndicador] = useState<Indicador | null>(null)

  // TODO: Dados virão do Supabase
  const indicadores: Indicador[] = [
    {
      id: "1",
      nome: "José Silva Prefeito",
      cargo: "Prefeito Municipal",
      tipo: "prefeito",
      partido: "PSDB",
      telefone: "(11) 99999-9999",
      email: "prefeito@cidade.gov.br",
      quantidadeIndicacoes: 45,
      quantidadeFuncionariosAtivos: 42,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "2",
      nome: "Maria Santos Vereadora",
      cargo: "Vereadora - Presidente da Câmara",
      tipo: "vereador",
      partido: "PT",
      telefone: "(11) 88888-8888",
      email: "maria.santos@camara.gov.br",
      quantidadeIndicacoes: 28,
      quantidadeFuncionariosAtivos: 25,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "3",
      nome: "João Pedro Costa",
      cargo: "Vereador",
      tipo: "vereador",
      partido: "PMDB",
      telefone: "(11) 77777-7777",
      email: "joao.costa@camara.gov.br",
      quantidadeIndicacoes: 15,
      quantidadeFuncionariosAtivos: 12,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "4",
      nome: "Ana Carolina Lima",
      cargo: "Secretária de Educação",
      tipo: "secretario",
      partido: null,
      telefone: "(11) 66666-6666",
      email: "ana.lima@educacao.gov.br",
      quantidadeIndicacoes: 8,
      quantidadeFuncionariosAtivos: 7,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "5",
      nome: "Carlos Roberto Engenheiro",
      cargo: "Ex-Vereador",
      tipo: "vereador",
      partido: "PDT",
      telefone: null,
      email: null,
      quantidadeIndicacoes: 3,
      quantidadeFuncionariosAtivos: 0,
      ativo: false,
      created_at: "2024-01-15"
    }
  ]

  const tipos = ["prefeito", "vereador", "secretario"]

  const filteredIndicadores = indicadores.filter(indicador => {
    const matchesSearch = indicador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         indicador.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (indicador.partido && indicador.partido.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTipo = !tipoFilter || tipoFilter === "all" || indicador.tipo === tipoFilter
    
    return matchesSearch && matchesTipo
  })

  const getTipoBadge = (tipo: string) => {
    const variants = {
      prefeito: { variant: "default" as const, label: "Prefeito" },
      vereador: { variant: "secondary" as const, label: "Vereador" },
      secretario: { variant: "outline" as const, label: "Secretário" }
    }
    
    const config = variants[tipo as keyof typeof variants] || variants.secretario
    
    return (
      <Badge variant={config.variant}>
        {config.label}
      </Badge>
    )
  }

  const handleEdit = (indicador: Indicador) => {
    setEditingIndicador(indicador)
    setIsDialogOpen(true)
  }

  const handleDelete = (indicadorId: string) => {
    // TODO: Implementar exclusão
    console.log("Excluir indicador:", indicadorId)
  }

  const handleSave = () => {
    // TODO: Implementar salvamento
    setIsDialogOpen(false)
    setEditingIndicador(null)
  }

  const totalIndicacoes = indicadores.reduce((acc, ind) => acc + ind.quantidadeIndicacoes, 0)
  const indicadoresAtivos = indicadores.filter(i => i.ativo).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <UserCheck className="w-8 h-8 text-primary" />
            Indicadores
          </h1>
          <p className="text-muted-foreground">
            Gerencie indicadores políticos e suas nomeações
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Indicador
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingIndicador ? "Editar Indicador" : "Novo Indicador"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do indicador político
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  defaultValue={editingIndicador?.nome || ""}
                  placeholder="Ex: João Silva Vereador"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cargo">Cargo</Label>
                <Input
                  id="cargo"
                  defaultValue={editingIndicador?.cargo || ""}
                  placeholder="Ex: Vereador, Prefeito, Secretário"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select defaultValue={editingIndicador?.tipo || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeito">Prefeito</SelectItem>
                      <SelectItem value="vereador">Vereador</SelectItem>
                      <SelectItem value="secretario">Secretário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="partido">Partido</Label>
                  <Input
                    id="partido"
                    defaultValue={editingIndicador?.partido || ""}
                    placeholder="Ex: PSDB, PT, PMDB"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  defaultValue={editingIndicador?.telefone || ""}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={editingIndicador?.email || ""}
                  placeholder="indicador@email.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                {editingIndicador ? "Salvar Alterações" : "Criar Indicador"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{indicadores.length}</div>
            <p className="text-sm text-muted-foreground">Total Indicadores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{indicadoresAtivos}</div>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-info">{totalIndicacoes}</div>
            <p className="text-sm text-muted-foreground">Total Indicações</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {Math.round(totalIndicacoes / indicadoresAtivos)}
            </div>
            <p className="text-sm text-muted-foreground">Média por Indicador</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Busque por nome, cargo ou partido do indicador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar indicadores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {tipos.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de indicadores */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Indicadores ({filteredIndicadores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Partido</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Indicações</TableHead>
                  <TableHead>Ativos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndicadores.map((indicador) => (
                  <TableRow key={indicador.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{indicador.nome}</p>
                        <p className="text-sm text-muted-foreground">
                          {indicador.cargo}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTipoBadge(indicador.tipo)}</TableCell>
                    <TableCell>
                      {indicador.partido ? (
                        <Badge variant="outline">{indicador.partido}</Badge>
                      ) : (
                        <span className="text-muted-foreground italic">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {indicador.telefone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="w-3 h-3 text-muted-foreground" />
                            <span>{indicador.telefone}</span>
                          </div>
                        )}
                        {indicador.email && (
                          <div className="flex items-center gap-1 text-sm">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{indicador.email}</span>
                          </div>
                        )}
                        {!indicador.telefone && !indicador.email && (
                          <span className="text-muted-foreground italic text-sm">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{indicador.quantidadeIndicacoes}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-success">
                        {indicador.quantidadeFuncionariosAtivos}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={indicador.ativo ? "default" : "secondary"}>
                        {indicador.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(indicador)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(indicador.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIndicadores.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum indicador encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}