import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Building, 
  Plus, 
  Search,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  MapPin
} from "lucide-react"

interface Setor {
  id: string
  nome: string
  descricao: string
  responsavel: string | null
  localizacao: string
  quantidadeFuncionarios: number
  quantidadeCargos: number
  ativo: boolean
  created_at: string
}

export default function Setores() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSetor, setEditingSetor] = useState<Setor | null>(null)

  // TODO: Dados virão do Supabase
  const setores: Setor[] = [
    {
      id: "1",
      nome: "Administração",
      descricao: "Setor responsável pela gestão administrativa geral",
      responsavel: "Maria Silva Santos",
      localizacao: "Prédio Central - 2º Andar",
      quantidadeFuncionarios: 15,
      quantidadeCargos: 5,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "2",
      nome: "Saúde",
      descricao: "Secretaria Municipal de Saúde",
      responsavel: "Dr. João Pedro Costa",
      localizacao: "Centro de Saúde Municipal",
      quantidadeFuncionarios: 42,
      quantidadeCargos: 8,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "3",
      nome: "Educação",
      descricao: "Secretaria Municipal de Educação",
      responsavel: "Profa. Ana Carolina Lima",
      localizacao: "Prédio da Educação",
      quantidadeFuncionarios: 68,
      quantidadeCargos: 12,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "4",
      nome: "Obras",
      descricao: "Secretaria de Obras e Serviços Públicos",
      responsavel: "Eng. Carlos Roberto",
      localizacao: "Almoxarifado Central",
      quantidadeFuncionarios: 25,
      quantidadeCargos: 6,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "5",
      nome: "Meio Ambiente",
      descricao: "Secretaria de Meio Ambiente e Sustentabilidade",
      responsavel: null,
      localizacao: "Anexo III",
      quantidadeFuncionarios: 8,
      quantidadeCargos: 3,
      ativo: true,
      created_at: "2024-01-15"
    },
    {
      id: "6",
      nome: "Cultura e Turismo",
      descricao: "Secretaria de Cultura e Turismo",
      responsavel: "Sandra Oliveira",
      localizacao: "Casa da Cultura",
      quantidadeFuncionarios: 12,
      quantidadeCargos: 4,
      ativo: false,
      created_at: "2024-01-15"
    }
  ]

  const filteredSetores = setores.filter(setor => {
    const matchesSearch = setor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         setor.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (setor.responsavel && setor.responsavel.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch
  })

  const handleEdit = (setor: Setor) => {
    setEditingSetor(setor)
    setIsDialogOpen(true)
  }

  const handleDelete = (setorId: string) => {
    // TODO: Implementar exclusão
    console.log("Excluir setor:", setorId)
  }

  const handleSave = () => {
    // TODO: Implementar salvamento
    setIsDialogOpen(false)
    setEditingSetor(null)
  }

  const totalFuncionarios = setores.reduce((acc, setor) => acc + setor.quantidadeFuncionarios, 0)
  const setoresAtivos = setores.filter(s => s.ativo).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building className="w-8 h-8 text-primary" />
            Setores
          </h1>
          <p className="text-muted-foreground">
            Gerencie os setores e departamentos da prefeitura
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Novo Setor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingSetor ? "Editar Setor" : "Novo Setor"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações do setor
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome do Setor</Label>
                <Input
                  id="nome"
                  defaultValue={editingSetor?.nome || ""}
                  placeholder="Ex: Secretaria de Saúde"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  defaultValue={editingSetor?.descricao || ""}
                  placeholder="Descreva as funções do setor"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input
                  id="responsavel"
                  defaultValue={editingSetor?.responsavel || ""}
                  placeholder="Nome do responsável pelo setor"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  defaultValue={editingSetor?.localizacao || ""}
                  placeholder="Ex: Prédio Central - 1º Andar"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                {editingSetor ? "Salvar Alterações" : "Criar Setor"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{setores.length}</div>
            <p className="text-sm text-muted-foreground">Total de Setores</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{setoresAtivos}</div>
            <p className="text-sm text-muted-foreground">Setores Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-info">{totalFuncionarios}</div>
            <p className="text-sm text-muted-foreground">Total Funcionários</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">
              {Math.round(totalFuncionarios / setoresAtivos)}
            </div>
            <p className="text-sm text-muted-foreground">Média por Setor</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Busque por nome, descrição ou responsável do setor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar setores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de setores */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista de Setores ({filteredSetores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setor</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Funcionários</TableHead>
                  <TableHead>Cargos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSetores.map((setor) => (
                  <TableRow key={setor.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{setor.nome}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {setor.descricao}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {setor.responsavel ? (
                        <span className="text-foreground">{setor.responsavel}</span>
                      ) : (
                        <span className="text-muted-foreground italic">Não definido</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{setor.localizacao}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{setor.quantidadeFuncionarios}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {setor.quantidadeCargos} cargos
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={setor.ativo ? "default" : "secondary"}>
                        {setor.ativo ? "Ativo" : "Inativo"}
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
                          <DropdownMenuItem onClick={() => handleEdit(setor)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDelete(setor.id)}
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

          {filteredSetores.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum setor encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}