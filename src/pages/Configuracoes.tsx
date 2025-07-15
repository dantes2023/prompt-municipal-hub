import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Save,
  Upload,
  Download,
  Shield,
  Bell,
  Palette,
  Database,
  Mail,
  Clock
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Configuracoes() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Estado das configurações
  const [config, setConfig] = useState({
    // Configurações Gerais
    nomeInstituicao: "Prefeitura Municipal",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Principal, 123 - Centro",
    telefone: "(11) 3333-4444",
    email: "contato@prefeitura.gov.br",
    site: "www.prefeitura.gov.br",
    
    // Configurações do Sistema
    horarioFuncionamento: "08:00-17:00",
    toleranciaPonto: 15,
    backupAutomatico: true,
    notificacoes: true,
    manterLogs: true,
    
    // Configurações de E-mail
    smtpHost: "",
    smtpPort: "587",
    smtpUser: "",
    smtpPassword: "",
    emailRemetente: "",
    
    // Configurações de Aparência
    tema: "system",
    corPrimaria: "#3b82f6",
    logoUrl: "",
    
    // Configurações de Segurança
    sessaoTimeout: 30,
    senhaComplexidade: true,
    autenticacaoDupla: false,
    auditoria: true
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar salvamento no Supabase
      console.log("Salvando configurações:", config)
      
      toast({
        title: "Configurações salvas!",
        description: "As configurações foram atualizadas com sucesso."
      })
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as configurações.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="w-8 h-8 text-primary" />
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Configure as preferências do sistema
          </p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {isLoading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configurações Gerais
            </CardTitle>
            <CardDescription>
              Informações básicas da instituição
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome da Instituição</Label>
              <Input
                id="nome"
                value={config.nomeInstituicao}
                onChange={(e) => handleInputChange('nomeInstituicao', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={config.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Textarea
                id="endereco"
                value={config.endereco}
                onChange={(e) => handleInputChange('endereco', e.target.value)}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={config.telefone}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={config.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site">Site</Label>
              <Input
                id="site"
                value={config.site}
                onChange={(e) => handleInputChange('site', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Sistema e Ponto
            </CardTitle>
            <CardDescription>
              Configurações de funcionamento do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="horario">Horário de Funcionamento</Label>
              <Input
                id="horario"
                value={config.horarioFuncionamento}
                onChange={(e) => handleInputChange('horarioFuncionamento', e.target.value)}
                placeholder="08:00-17:00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tolerancia">Tolerância de Ponto (minutos)</Label>
              <Input
                id="tolerancia"
                type="number"
                value={config.toleranciaPonto}
                onChange={(e) => handleInputChange('toleranciaPonto', parseInt(e.target.value))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">
                  Realizar backup diário dos dados
                </p>
              </div>
              <Switch
                checked={config.backupAutomatico}
                onCheckedChange={(checked) => handleInputChange('backupAutomatico', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações</Label>
                <p className="text-sm text-muted-foreground">
                  Receber notificações do sistema
                </p>
              </div>
              <Switch
                checked={config.notificacoes}
                onCheckedChange={(checked) => handleInputChange('notificacoes', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Manter Logs</Label>
                <p className="text-sm text-muted-foreground">
                  Armazenar logs de atividades
                </p>
              </div>
              <Switch
                checked={config.manterLogs}
                onCheckedChange={(checked) => handleInputChange('manterLogs', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de segurança e acesso
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="timeout">Timeout de Sessão (minutos)</Label>
              <Input
                id="timeout"
                type="number"
                value={config.sessaoTimeout}
                onChange={(e) => handleInputChange('sessaoTimeout', parseInt(e.target.value))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Senha Complexa</Label>
                <p className="text-sm text-muted-foreground">
                  Exigir senhas complexas dos usuários
                </p>
              </div>
              <Switch
                checked={config.senhaComplexidade}
                onCheckedChange={(checked) => handleInputChange('senhaComplexidade', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação Dupla</Label>
                <p className="text-sm text-muted-foreground">
                  Habilitar 2FA para administradores
                </p>
              </div>
              <Switch
                checked={config.autenticacaoDupla}
                onCheckedChange={(checked) => handleInputChange('autenticacaoDupla', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auditoria</Label>
                <p className="text-sm text-muted-foreground">
                  Registrar todas as ações dos usuários
                </p>
              </div>
              <Switch
                checked={config.auditoria}
                onCheckedChange={(checked) => handleInputChange('auditoria', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Aparência
            </CardTitle>
            <CardDescription>
              Personalização visual do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tema">Tema</Label>
              <Select value={config.tema} onValueChange={(value) => handleInputChange('tema', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cor">Cor Primária</Label>
              <Input
                id="cor"
                type="color"
                value={config.corPrimaria}
                onChange={(e) => handleInputChange('corPrimaria', e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">URL do Logo</Label>
              <Input
                id="logo"
                value={config.logoUrl}
                onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button variant="outline" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Fazer Upload do Logo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Configurações de E-mail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Configurações de E-mail
          </CardTitle>
          <CardDescription>
            Configure o servidor SMTP para envio de e-mails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="smtp-host">Servidor SMTP</Label>
              <Input
                id="smtp-host"
                value={config.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="smtp-port">Porta SMTP</Label>
              <Input
                id="smtp-port"
                value={config.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
                placeholder="587"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="smtp-user">Usuário</Label>
              <Input
                id="smtp-user"
                value={config.smtpUser}
                onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                placeholder="usuario@email.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="smtp-password">Senha</Label>
              <Input
                id="smtp-password"
                type="password"
                value={config.smtpPassword}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                placeholder="********"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="email-remetente">E-mail Remetente</Label>
              <Input
                id="email-remetente"
                value={config.emailRemetente}
                onChange={(e) => handleInputChange('emailRemetente', e.target.value)}
                placeholder="noreply@prefeitura.gov.br"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Backup e Restauração
          </CardTitle>
          <CardDescription>
            Gerencie backups e restauração dos dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Fazer Backup Agora
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Restaurar Backup
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Configurar Backup Automático
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}