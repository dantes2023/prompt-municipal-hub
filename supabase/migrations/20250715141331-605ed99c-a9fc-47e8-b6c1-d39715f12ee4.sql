-- Limpar tabelas existentes que não são relevantes para o projeto
DROP TABLE IF EXISTS public."LeadsIA7D" CASCADE;
DROP TABLE IF EXISTS public."LeadsDesafioIA" CASCADE;
DROP TABLE IF EXISTS public."Tools_IA7D" CASCADE;
DROP TABLE IF EXISTS public."Tools_DesafioIA" CASCADE;
DROP TABLE IF EXISTS public.conversation_history CASCADE;
DROP TABLE IF EXISTS public.appointments CASCADE;

-- Criar tabela de departamentos
CREATE TABLE public.departamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de funcionários
CREATE TABLE public.funcionarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  rg TEXT,
  email TEXT UNIQUE,
  telefone TEXT,
  endereco TEXT,
  data_nascimento DATE,
  data_admissao DATE NOT NULL DEFAULT CURRENT_DATE,
  cargo TEXT NOT NULL,
  departamento_id UUID REFERENCES public.departamentos(id),
  salario DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo', 'licenca', 'demitido')),
  foto_url TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de profiles para usuários autenticados
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nome TEXT,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir alguns departamentos padrão
INSERT INTO public.departamentos (nome, descricao) VALUES
  ('Recursos Humanos', 'Gestão de pessoas e processos administrativos'),
  ('Tecnologia da Informação', 'Desenvolvimento e manutenção de sistemas'),
  ('Financeiro', 'Controle financeiro e contábil'),
  ('Vendas', 'Comercialização de produtos e serviços'),
  ('Marketing', 'Promoção e comunicação da empresa'),
  ('Operações', 'Atividades operacionais da empresa');

-- Habilitar RLS nas tabelas
ALTER TABLE public.departamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS para departamentos
CREATE POLICY "Todos podem visualizar departamentos" 
ON public.departamentos 
FOR SELECT 
USING (true);

CREATE POLICY "Apenas usuários autenticados podem inserir departamentos" 
ON public.departamentos 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas usuários autenticados podem atualizar departamentos" 
ON public.departamentos 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- Criar políticas RLS para funcionários
CREATE POLICY "Todos podem visualizar funcionários" 
ON public.funcionarios 
FOR SELECT 
USING (true);

CREATE POLICY "Apenas usuários autenticados podem inserir funcionários" 
ON public.funcionarios 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas usuários autenticados podem atualizar funcionários" 
ON public.funcionarios 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas usuários autenticados podem deletar funcionários" 
ON public.funcionarios 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Criar políticas RLS para profiles
CREATE POLICY "Usuários podem ver todos os profiles" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Usuários podem inserir seu próprio profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

-- Criar função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar triggers para atualização automática de timestamps
CREATE TRIGGER update_departamentos_updated_at
  BEFORE UPDATE ON public.departamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_funcionarios_updated_at
  BEFORE UPDATE ON public.funcionarios
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar função para criar profile automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'nome', NEW.email);
  RETURN NEW;
END;
$$;

-- Criar trigger para criar profile automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();