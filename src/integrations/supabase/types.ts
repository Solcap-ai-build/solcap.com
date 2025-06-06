export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_onboarding: {
        Row: {
          address: string
          business_description: string | null
          business_email: string
          business_name: string
          bvn: string | null
          cac_document_url: string | null
          city: string | null
          company_type: string | null
          created_at: string
          director_address: string | null
          director_bvn: string | null
          director_date_of_birth: string | null
          director_email: string | null
          director_full_name: string | null
          director_gender: string | null
          director_phone: string | null
          id: string
          nin: string | null
          phone_number: string
          rc_number: string | null
          state: string | null
          status: string
          tin: string | null
          updated_at: string
          user_id: string
          year_of_incorporation: number | null
        }
        Insert: {
          address: string
          business_description?: string | null
          business_email: string
          business_name: string
          bvn?: string | null
          cac_document_url?: string | null
          city?: string | null
          company_type?: string | null
          created_at?: string
          director_address?: string | null
          director_bvn?: string | null
          director_date_of_birth?: string | null
          director_email?: string | null
          director_full_name?: string | null
          director_gender?: string | null
          director_phone?: string | null
          id?: string
          nin?: string | null
          phone_number: string
          rc_number?: string | null
          state?: string | null
          status?: string
          tin?: string | null
          updated_at?: string
          user_id: string
          year_of_incorporation?: number | null
        }
        Update: {
          address?: string
          business_description?: string | null
          business_email?: string
          business_name?: string
          bvn?: string | null
          cac_document_url?: string | null
          city?: string | null
          company_type?: string | null
          created_at?: string
          director_address?: string | null
          director_bvn?: string | null
          director_date_of_birth?: string | null
          director_email?: string | null
          director_full_name?: string | null
          director_gender?: string | null
          director_phone?: string | null
          id?: string
          nin?: string | null
          phone_number?: string
          rc_number?: string | null
          state?: string | null
          status?: string
          tin?: string | null
          updated_at?: string
          user_id?: string
          year_of_incorporation?: number | null
        }
        Relationships: []
      }
      credit_evaluations: {
        Row: {
          avg_monthly_revenue: number
          credit_limit: number
          credit_score: number
          id: string
          indicina_report_id: string | null
          last_evaluation_date: string
          notes: string | null
          okra_report_id: string | null
          status: string
          user_id: string
        }
        Insert: {
          avg_monthly_revenue: number
          credit_limit: number
          credit_score: number
          id?: string
          indicina_report_id?: string | null
          last_evaluation_date?: string
          notes?: string | null
          okra_report_id?: string | null
          status?: string
          user_id: string
        }
        Update: {
          avg_monthly_revenue?: number
          credit_limit?: number
          credit_score?: number
          id?: string
          indicina_report_id?: string | null
          last_evaluation_date?: string
          notes?: string | null
          okra_report_id?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          business_type: string | null
          company_name: string | null
          created_at: string
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          business_type?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          business_type?: string | null
          company_name?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          payment_provider: string | null
          payment_reference: string | null
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          available_balance: number
          created_at: string
          credit_balance: number
          id: string
          pending_balance: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance?: number
          created_at?: string
          credit_balance?: number
          id?: string
          pending_balance?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance?: number
          created_at?: string
          credit_balance?: number
          id?: string
          pending_balance?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      inventories: {
        Row: {
          amount: number
          created_at: string
          id: string
          supplier_name: string
          description: string
          term: string
          updated_at: string
          user_id: string
          status: string
          invoice_number: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          supplier_name?: string
          description?: string
          term?: string
          updated_at?: string
          user_id?: string
          status?: string
          invoice_number?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          supplier_name?: string
          description?: string
          term?: string
          updated_at?: string
          user_id?: string
          status?: string
          invoice_number?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          name: string
          email: string
          id: string
          phone_number: string
          parent_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name?: string
          created_at?: string
          id?: string
          email?: string
          parent_id?: string
          updated_at?: string
          phone_number?: string
        }
        Update: {
          name?: string
          created_at?: string
          id?: string
          email?: string
          parent_id?: string
          updated_at?: string
          phone_number?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          name: string
          description: string
          id: string
          status: string
          owner_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name?: string
          created_at?: string
          id?: string
          description?: string
          owner_id?: string
          updated_at?: string
          status?: string
        }
        Update: {
          name?: string
          created_at?: string
          id?: string
          description?: string
          owner_id?: string
          updated_at?: string
          status?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          name: string
          email: string
          id: string
          phone_number: string
          parent_id: string
          project_id: string
          position: string
          created_at: string
          updated_at: string
        }
        Insert: {
          name?: string
          created_at?: string
          id?: string
          email?: string
          parent_id?: string
          updated_at?: string
          project_id?: string
          phone_number?: string
          position?: string
        }
        Update: {
          name?: string
          created_at?: string
          id?: string
          email?: string
          parent_id?: string
          updated_at?: string
          project_id?: string
          phone_number?: string
          position?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      app_role: "admin" | "super-admin" | "user" | "technician"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "super-admin", "user", "technician"],
    },
  },
} as const
