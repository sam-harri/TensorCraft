import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../App';

interface AuthState {
    user: User | null;
    session: Session | null;
    error: string | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    // signInWithProvider: (provider: 'google' | 'github' | 'gitlab') => Promise<void>;
    fetchSession: () => void;
  }
  
  export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    error: null,
    loading: false,
    signUp: async (email: string, password: string) => {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: 'https://example.com/welcome',
        },
      });
      const user = data?.user;
      const session = data?.session;
      set({ user, session, error: error?.message ?? null, loading: false });
    },
    signIn: async (email: string, password: string) => {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      const user = data?.user;
      set({ user, error: error?.message ?? null, loading: false });
    },
    signOut: async () => {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      set({ user: null, session: null, error: error?.message ?? null, loading: false });
    },
    // signInWithProvider: async (provider: 'google' | 'github' | 'gitlab') => {
    //   set({ loading: true, error: null });
    //   const { user, error } = await supabase.auth.signIn({ provider });
    //   set({ user, error: error?.message ?? null, loading: false });
    // },
    fetchSession: async () => {
      set({ loading: true, error: null });
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
        set({ session, user: session.user, error: null, loading: false });
      } else {
        set({ session: null, user: null, error: error?.message ?? null, loading: false });
      }
    },
  }));
  
  // To ensure the user state is updated when the session changes
  supabase.auth.onAuthStateChange((_event, _) => {
    useAuthStore.getState().fetchSession();
  });
