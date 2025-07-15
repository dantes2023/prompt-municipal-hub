import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Funcionarios from "./pages/Funcionarios";
import CadastroFuncionario from "./pages/CadastroFuncionario";
import RegistroPonto from "./pages/RegistroPonto";
import Relatorios from "./pages/Relatorios";
import Cargos from "./pages/Cargos";
import Setores from "./pages/Setores";
import Indicadores from "./pages/Indicadores";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/funcionarios" element={
            <Layout>
              <Funcionarios />
            </Layout>
          } />
          <Route path="/funcionarios/novo" element={
            <Layout>
              <CadastroFuncionario />
            </Layout>
          } />
          <Route path="/ponto" element={
            <Layout>
              <RegistroPonto />
            </Layout>
          } />
          <Route path="/relatorios" element={
            <Layout>
              <Relatorios />
            </Layout>
          } />
          <Route path="/cargos" element={
            <Layout>
              <Cargos />
            </Layout>
          } />
          <Route path="/setores" element={
            <Layout>
              <Setores />
            </Layout>
          } />
          <Route path="/indicadores" element={
            <Layout>
              <Indicadores />
            </Layout>
          } />
          <Route path="/configuracoes" element={
            <Layout>
              <Configuracoes />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;