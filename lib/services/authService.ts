import { createClient } from "@/lib/supabase/client";
import { ROUTES } from "../constants/routes";

export class AuthService {
  private static instance: AuthService | null = null;
  private constructor() {}

  static getInstance(): AuthService {
    if (this.instance === null) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  async signUp(params: {
    email: string;
    password: string;
    redirectOrigin: string;
  }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        emailRedirectTo: `${params.redirectOrigin}/${ROUTES.protected}`,
      },
    });
    if (error) throw error;
    return data;
  }

  async signIn(params: { email: string; password: string }) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });
    if (error) throw error;
    return data;
  }
}

export const authService = AuthService.getInstance();
