import React, { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Camera, 
  User, 
  Briefcase, 
  UserCheck, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Upload,
  X
} from "lucide-react"
import Webcam from "react-webcam"
import { useToast } from "@/hooks/use-toast"

interface FuncionarioData {
  // Dados pessoais
  nome: string
  cpf: string
  rg: string
  dataNascimento: string
  sexo: string
  estadoCivil: string
  foto: string | null
  endereco: string
  telefoneCelular: string
  telefoneFixo: string
  email: string
  escolaridade: string
  pisPasep: string
  
  // Dados funcionais
  tipoContrato: string
  cargoId: string
  setorId: string
  localTrabalho: string
  horarioTrabalho: string
  salario: string
  dataAdmissao: string
  
  // Dados da indicação
  indicadorId: string
  dataIndicacao: string
  observacoesIndicacao: string
}

const initialData: FuncionarioData = {
  nome: "", cpf: "", rg: "", dataNascimento: "", sexo: "", estadoCivil: "",
  foto: null, endereco: "", telefoneCelular: "", telefoneFixo: "", email: "",
  escolaridade: "", pisPasep: "", tipoContrato: "", cargoId: "", setorId: "",
  localTrabalho: "", horarioTrabalho: "", salario: "", dataAdmissao: "",
  indicadorId: "", dataIndicacao: "", observacoesIndicacao: ""
}

export default function CadastroFuncionario() {
  const [currentStep, setCurrentStep] = useState(1)
  const [funcionario, setFuncionario] = useState<FuncionarioData>(initialData)
  const [showCamera, setShowCamera] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const webcamRef = useRef<Webcam>(null)
  const { toast } = useToast()

  // TODO: Dados virão do Supabase
  const cargos = [
    { id: "1", nome: "Assistente Administrativo" },
    { id: "2", nome: "Auxiliar de Serviços Gerais" },
    { id: "3", nome: "Enfermeiro" },
    { id: "4", nome: "Professor" }
  ]

  const setores = [
    { id: "1", nome: "Administração" },
    { id: "2", nome: "Saúde" },
    { id: "3", nome: "Educação" },
    { id: "4", nome: "Obras" }
  ]

  const indicadores = [
    { id: "1", nome: "Prefeito Municipal" },
    { id: "2", nome: "Vereador João Silva" },
    { id: "3", nome: "Vereadora Maria Santos" }
  ]

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setFuncionario(prev => ({ ...prev, foto: imageSrc }))
      setShowCamera(false)
      toast({
        title: "Foto capturada!",
        description: "A foto foi capturada com sucesso."
      })
    }
  }, [webcamRef, toast])

  const handleInputChange = (field: keyof FuncionarioData, value: string) => {
    setFuncionario(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return funcionario.nome && funcionario.cpf && funcionario.dataNascimento
      case 2:
        return funcionario.tipoContrato && funcionario.cargoId && funcionario.setorId
      case 3:
        return funcionario.indicadorId
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    } else {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios antes de continuar.",
        variant: "destructive"
      })
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar salvamento no Supabase
      console.log("Dados do funcionário:", funcionario)
      
      toast({
        title: "Funcionário cadastrado!",
        description: "O funcionário foi cadastrado com sucesso."
      })
      
      // Reset form
      setFuncionario(initialData)
      setCurrentStep(1)
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro ao cadastrar o funcionário.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Dados Pessoais", icon: User },
    { number: 2, title: "Dados Funcionais", icon: Briefcase },
    { number: 3, title: "Indicação Política", icon: UserCheck }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Cadastrar Funcionário</h1>
          <p className="text-muted-foreground">
            Preencha as informações do novo funcionário
          </p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep === step.number 
                ? 'bg-primary border-primary text-primary-foreground' 
                : currentStep > step.number
                ? 'bg-success border-success text-success-foreground'
                : 'border-muted-foreground text-muted-foreground'
            }`}>
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <div className="ml-3 hidden md:block">
              <p className={`text-sm font-medium ${
                currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                currentStep > step.number ? 'bg-success' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5 text-primary" })}
            {steps[currentStep - 1].title}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Informações pessoais do funcionário"}
            {currentStep === 2 && "Cargo, setor e dados funcionais"}
            {currentStep === 3 && "Informações sobre indicação política"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    value={funcionario.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    placeholder="Nome completo do funcionário"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={funcionario.cpf}
                    onChange={(e) => handleInputChange('cpf', e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={funcionario.rg}
                    onChange={(e) => handleInputChange('rg', e.target.value)}
                    placeholder="00.000.000-0"
                  />
                </div>
                <div>
                  <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
                  <Input
                    id="dataNascimento"
                    type="date"
                    value={funcionario.dataNascimento}
                    onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sexo">Sexo</Label>
                  <Select value={funcionario.sexo} onValueChange={(value) => handleInputChange('sexo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estadoCivil">Estado Civil</Label>
                  <Select value={funcionario.estadoCivil} onValueChange={(value) => handleInputChange('estadoCivil', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Foto */}
              <div>
                <Label>Foto do Funcionário</Label>
                <div className="mt-2">
                  {funcionario.foto ? (
                    <div className="flex items-center gap-4">
                      <img 
                        src={funcionario.foto} 
                        alt="Foto do funcionário" 
                        className="w-24 h-24 rounded-lg object-cover border"
                      />
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowCamera(true)}
                          className="flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Capturar Nova Foto
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setFuncionario(prev => ({ ...prev, foto: null }))}
                          className="flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Remover Foto
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCamera(true)}
                      className="flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" />
                      Capturar Foto
                    </Button>
                  )}
                </div>

                {showCamera && (
                  <div className="mt-4 space-y-4">
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      className="w-full max-w-md rounded-lg"
                    />
                    <div className="flex gap-2">
                      <Button onClick={capture} className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        Capturar
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowCamera(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="endereco">Endereço</Label>
                  <Textarea
                    id="endereco"
                    value={funcionario.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    placeholder="Endereço completo"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefoneCelular">Telefone Celular</Label>
                    <Input
                      id="telefoneCelular"
                      value={funcionario.telefoneCelular}
                      onChange={(e) => handleInputChange('telefoneCelular', e.target.value)}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
                    <Input
                      id="telefoneFixo"
                      value={funcionario.telefoneFixo}
                      onChange={(e) => handleInputChange('telefoneFixo', e.target.value)}
                      placeholder="(00) 0000-0000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={funcionario.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pisPasep">PIS/PASEP</Label>
                    <Input
                      id="pisPasep"
                      value={funcionario.pisPasep}
                      onChange={(e) => handleInputChange('pisPasep', e.target.value)}
                      placeholder="000.00000.00-0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="escolaridade">Escolaridade</Label>
                  <Select value={funcionario.escolaridade} onValueChange={(value) => handleInputChange('escolaridade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fundamental">Ensino Fundamental</SelectItem>
                      <SelectItem value="medio">Ensino Médio</SelectItem>
                      <SelectItem value="superior">Ensino Superior</SelectItem>
                      <SelectItem value="pos">Pós-graduação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Dados Funcionais */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoContrato">Tipo de Contrato *</Label>
                  <Select value={funcionario.tipoContrato} onValueChange={(value) => handleInputChange('tipoContrato', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efetivo">Efetivo</SelectItem>
                      <SelectItem value="comissionado">Comissionado</SelectItem>
                      <SelectItem value="temporario">Temporário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cargoId">Cargo *</Label>
                  <Select value={funcionario.cargoId} onValueChange={(value) => handleInputChange('cargoId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {cargos.map(cargo => (
                        <SelectItem key={cargo.id} value={cargo.id}>{cargo.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="setorId">Setor *</Label>
                  <Select value={funcionario.setorId} onValueChange={(value) => handleInputChange('setorId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores.map(setor => (
                        <SelectItem key={setor.id} value={setor.id}>{setor.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataAdmissao">Data de Admissão</Label>
                  <Input
                    id="dataAdmissao"
                    type="date"
                    value={funcionario.dataAdmissao}
                    onChange={(e) => handleInputChange('dataAdmissao', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="localTrabalho">Local de Trabalho</Label>
                  <Input
                    id="localTrabalho"
                    value={funcionario.localTrabalho}
                    onChange={(e) => handleInputChange('localTrabalho', e.target.value)}
                    placeholder="Ex: Secretaria de Saúde"
                  />
                </div>
                <div>
                  <Label htmlFor="horarioTrabalho">Horário de Trabalho</Label>
                  <Input
                    id="horarioTrabalho"
                    value={funcionario.horarioTrabalho}
                    onChange={(e) => handleInputChange('horarioTrabalho', e.target.value)}
                    placeholder="Ex: 08:00 às 17:00"
                  />
                </div>
                <div>
                  <Label htmlFor="salario">Salário</Label>
                  <Input
                    id="salario"
                    value={funcionario.salario}
                    onChange={(e) => handleInputChange('salario', e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Indicação Política */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="indicadorId">Indicador Político *</Label>
                  <Select value={funcionario.indicadorId} onValueChange={(value) => handleInputChange('indicadorId', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {indicadores.map(indicador => (
                        <SelectItem key={indicador.id} value={indicador.id}>{indicador.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dataIndicacao">Data da Indicação</Label>
                  <Input
                    id="dataIndicacao"
                    type="date"
                    value={funcionario.dataIndicacao}
                    onChange={(e) => handleInputChange('dataIndicacao', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="observacoesIndicacao">Observações da Indicação</Label>
                <Textarea
                  id="observacoesIndicacao"
                  value={funcionario.observacoesIndicacao}
                  onChange={(e) => handleInputChange('observacoesIndicacao', e.target.value)}
                  placeholder="Observações sobre a indicação política"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                disabled={!validateStep(3) || isLoading}
                className="bg-success hover:bg-success/90"
              >
                {isLoading ? "Salvando..." : "Finalizar Cadastro"}
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}