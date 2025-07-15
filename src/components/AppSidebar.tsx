import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Clock, 
  FileText, 
  Settings, 
  Building,
  Award,
  UserCheck,
  BarChart3
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Visão geral do sistema"
  },
  {
    title: "Funcionários",
    url: "/funcionarios",
    icon: Users,
    description: "Lista de funcionários"
  },
  {
    title: "Cadastrar Funcionário",
    url: "/funcionarios/novo",
    icon: UserPlus,
    description: "Novo funcionário"
  },
  {
    title: "Registro de Ponto",
    url: "/ponto",
    icon: Clock,
    description: "Controle de ponto"
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: FileText,
    description: "Relatórios gerenciais"
  }
]

const configItems = [
  {
    title: "Cargos",
    url: "/cargos",
    icon: Award,
    description: "Gestão de cargos"
  },
  {
    title: "Setores",
    url: "/setores",
    icon: Building,
    description: "Gestão de setores"
  },
  {
    title: "Indicadores",
    url: "/indicadores",
    icon: UserCheck,
    description: "Indicadores políticos"
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
    description: "Configurações do sistema"
  }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/"
    }
    return currentPath.startsWith(path)
  }

  const getNavClasses = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
    if (isActive(path)) {
      return `${baseClasses} bg-sidebar-primary text-sidebar-primary-foreground font-medium`
    }
    return `${baseClasses} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        {/* Logo/Header */}
        <div className="px-4 py-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg text-sidebar-foreground">
                  SisFuncionários
                </h2>
                <p className="text-xs text-sidebar-foreground/60">
                  Sistema Municipal
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navegação Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-4">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Configurações */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 font-medium px-4">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {configItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses(item.url)}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}