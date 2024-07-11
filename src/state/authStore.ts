import { create } from 'zustand';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabaseclient';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AuthError | null>;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signOut: () => Promise<AuthError | null>;
  fetchSession: () => void;
  resetPassword: (email: string) => Promise<AuthError | null>;
  updatePassword: (newPassword: string) => Promise<AuthError | null>;
  resendConfirmationEmail: (email: string) => Promise<AuthError | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: false,
  signUp: async (email: string, password: string) => {
    set({ loading: true });

    // Check if user with email exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      set({ loading: false });
      return { message: 'User with this email already exists.' } as AuthError;
    }

    if (checkError && checkError.code !== 'PGRST116') {
      set({ loading: false });
      console.log(checkError);
      return { message: 'Database Error, sorry for the inconvenience.' } as AuthError;
    }

    // If the user does not exist, proceed with sign up
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });

    const user = data?.user;
    const session = data?.session;
    set({ user, session, loading: false });
    return error;
  },
  signIn: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    const user = data?.user;
    set({ user, loading: false });
    return error;
  },
  signOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    set({ user: null, session: null, loading: false });
    return error;
  },
  fetchSession: async () => {
    set({ loading: true });
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      set({ session, user: session.user, loading: false });
    } else {
      set({ session: null, user: null, loading: false });
    }
  },
  resetPassword: async (email: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/resetpassword',
    });
    set({ loading: false });
    return error;
  },
  updatePassword: async (newPassword: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    set({ loading: false });
    return error;
  },
  resendConfirmationEmail: async (email: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: 'https://example.com/welcome',
      },
    });
    set({ loading: false });
    return error;
  },
}));

// To ensure the user state is updated when the session changes
supabase.auth.onAuthStateChange((_event, _) => {
  useAuthStore.getState().fetchSession();
});
