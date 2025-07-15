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
  Award, 
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  DollarSign
} from "lucide-react"

interface Cargo {
  id: string
  nome: string
  descricao: string
  salarioBase: number
  nivel: string
  setor: string
  quantidadeFuncionarios: number
  ativo: boolean
  created_at: string
}

export default function Cargos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [nivelFilter, setNivelFilter] = useState("")
  const [setorFilter, setSetorFilter] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCargo, setEditingCargo] = useState<Cargo | null>(null)

  // TODO: Dados virão do Supabase
  const cargos: Cargo[] = [
    {
      id: "1",
      nome: "Assistente Administrativo",
      descricao: "Responsável por atividades administrativas gerais",
      salarioBase: 2500.00,
      nivel: "médio",
      setor: "Administração",
      quantidadeFuncionarios: 5,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "2",
      nome: "Enfermeiro",
      descricao: "Prestação de cuidados de enfermagem",
      salarioBase: 4500.00,
      nivel: "superior",
      setor: "Saúde", 
      quantidadeFuncionarios: 8,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "3",
      nome: "Professor de Educação Infantil",
      descricao: "Ensino para crianças de 0 a 5 anos",
      salarioBase: 3200.00,
      nivel: "superior",
      setor: "Educação",
      quantidadeFuncionarios: 12,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "4",
      nome: "Auxiliar de Serviços Gerais",
      descricao: "Serviços de limpeza e manutenção",
      salarioBase: 1500.00,
      nivel: "fundamental",
      setor: "Administração",
      quantidadeFuncionarios: 3,
      ativo: true,
      created_at: "2024-01-15"
    }
  ]

  const niveis = ["fundamental", "médio", "superior"]
  const setores = ["Administração", "Saúde", "Educação", "Obras", "Meio Ambiente"]

  const filteredCargos = cargos.filter(cargo => {
    const matchesSearch = cargo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cargo.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNivel = !nivelFilter || nivelFilter === "all" || cargo.nivel === nivelFilter
    const matchesSetor = !setorFilter || setorFilter === "all" || cargo.setor === setorFilter
    
    return matchesSearch && matchesNivel && matchesSetor
  })

  const getNivelBadge = (nivel: string) => {
    const variants = {
      fundamental: "outline",
      médio: "secondary", 
      superior: "default"
    } as const
    
    return (
      <Badge variant={variants[nivel as keyof typeof variants] || "outline"}>
        {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
      </Badge>
    )
  }

  const handleEdit = (cargo: Cargo) => {
    setEditingCargo(cargo)
    setIsDialogOpen(true)
  }

  const handleDelete = (cargoId: string) => {
    // TODO: Implementar exclusão
    console.log("Excluir cargo:", cargoId)
  }

  const handleSave = () => {
    // TODO: Implementar salvamento
    setIsDialogOpen(false)
    setEditingCargo(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Award className="w-8 h-8 text-primary" />
            Cargos
          </h1>
          <p className="text-muted-foreground">
            Gerencie cargos e funções da prefeitura
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Cargo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingCargo ? "Editar Cargo" : "Novo Cargo"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do cargo
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Cargo</Label>
                <Input
                  id="nome"
                  defaultValue={editingCargo?.nome || ""}
                  placeholder="Ex: Assistente Administrativo"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  defaultValue={editingCargo?.descricao || ""}
                  placeholder="Descreva as responsabilidades do cargo"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="nivel">Nível</Label>
                  <Select defaultValue={editingCargo?.nivel || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fundamental">Fundamental</SelectItem>
                      <SelectItem value="médio">Médio</SelectItem>
                      <SelectItem value="superior">Superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="setor">Setor</Label>
                  <Select defaultValue={editingCargo?.setor || ""}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores.map(setor => (
                        <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="salario">Salário Base (R$)</Label>
                <Input
                  id="salario"
                  type="number"
                  step="0.01"
                  defaultValue={editingCargo?.salarioBase || ""}
                  placeholder="0,00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                {editingCargo ? "Salvar Alterações" : "Criar Cargo"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{cargos.length}</div>
            <p className="text-sm text-muted-foreground">Total de Cargos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">
              {cargos.filter(c => c.ativo).length}
            </div>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-info">
              {cargos.reduce((acc, cargo) => acc + cargo.quantidadeFuncionarios, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Funcionários</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              R$ {(cargos.reduce((acc, cargo) => acc + cargo.salarioBase, 0) / cargos.length).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </div>
            <p className="text-sm text-muted-foreground">Salário Médio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Use os filtros para encontrar cargos específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={nivelFilter} onValueChange={setNivelFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                {niveis.map(nivel => (
                  <SelectItem key={nivel} value={nivel}>
                    {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={setorFilter} onValueChange={setSetorFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os setores</SelectItem>
                {setores.map(setor => (
                  <SelectItem key={setor} value={setor}>{setor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de cargos */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Cargos ({filteredCargos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Salário Base</TableHead>
                  <TableHead>Funcionários</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCargos.map((cargo) => (
                  <TableRow key={cargo.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{cargo.nome}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {cargo.descricao}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getNivelBadge(cargo.nivel)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{cargo.setor}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">
                      R$ {cargo.salarioBase.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{cargo.quantidadeFuncionarios}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cargo.ativo ? "default" : "secondary"}>
                        {cargo.ativo ? "Ativo" : "Inativo"}
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
                          <DropdownMenuItem onClick={() => handleEdit(cargo)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(cargo.id)}
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

          {filteredCargos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum cargo encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}