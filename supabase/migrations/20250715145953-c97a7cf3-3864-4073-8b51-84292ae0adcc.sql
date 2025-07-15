-- Remover a política restritiva de INSERT e criar uma mais permissiva
DROP POLICY IF EXISTS "Apenas usuários autenticados podem inserir funcionários" ON public.funcionarios;

-- Criar nova política que permite inserção pública (temporária para testes)
CREATE POLICY "Permitir inserção pública de funcionários" 
ON public.funcionarios 
FOR INSERT 
WITH CHECK (true);