export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          client_name: string | null
          created_at: string | null
          id: string
          notes: string | null
          phone_number: string
          professional_name: string | null
          reminder_sent: boolean | null
          reminder_sent_at: string | null
          service_name: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          phone_number: string
          professional_name?: string | null
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          service_name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          client_name?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          phone_number?: string
          professional_name?: string | null
          reminder_sent?: boolean | null
          reminder_sent_at?: string | null
          service_name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      conversation_history: {
        Row: {
          created_at: string | null
          id: string
          is_audio: boolean | null
          message_content: string | null
          message_type: string | null
          phone_number: string
          user_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_audio?: boolean | null
          message_content?: string | null
          message_type?: string | null
          phone_number: string
          user_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_audio?: boolean | null
          message_content?: string | null
          message_type?: string | null
          phone_number?: string
          user_name?: string | null
        }
        Relationships: []
      }
      LeadsDesafioIA: {
        Row: {
          atendimentoFinalizado: boolean | null
          conversation_history: Json | null
          id: number
          remotejid: string | null
          response_id: string | null
          timestamp: string | null
          tokens: number | null
        }
        Insert: {
          atendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens?: number | null
        }
        Update: {
          atendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens?: number | null
        }
        Relationships: []
      }
      LeadsIA7D: {
        Row: {
          atendimentoFinalizado: boolean | null
          conversation_history: Json | null
          id: number
          nome: string | null
          remotejid: string | null
          response_id: string | null
          timestamp: string | null
          tokens: number | null
        }
        Insert: {
          atendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          nome?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens?: number | null
        }
        Update: {
          atendimentoFinalizado?: boolean | null
          conversation_history?: Json | null
          id?: number
          nome?: string | null
          remotejid?: string | null
          response_id?: string | null
          timestamp?: string | null
          tokens?: number | null
        }
        Relationships: []
      }
      Tools_DesafioIA: {
        Row: {
          descricao: string | null
          id: number
          nome: string | null
          tool: Json | null
          type: string | null
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Relationships: []
      }
      Tools_IA7D: {
        Row: {
          descricao: string | null
          id: number
          nome: string | null
          tool: Json | null
          type: string | null
        }
        Insert: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Update: {
          descricao?: string | null
          id?: number
          nome?: string | null
          tool?: Json | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
