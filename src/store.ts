import { create } from 'zustand';
import { Message, ViewType, AtomSpaceData } from './types';
import { GitHubUser } from './types/github';

interface State {
  messages: Message[];
  currentView: ViewType;
  atomSpace: AtomSpaceData | null;
  githubUser: GitHubUser | null;
  isLoading: boolean;
  error: string | null;
  addMessage: (message: Message) => void;
  setView: (view: ViewType) => void;
  setAtomSpace: (data: AtomSpaceData) => void;
  setGitHubUser: (user: GitHubUser | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useStore = create<State>((set) => ({
  messages: [],
  currentView: 'chat',
  atomSpace: null,
  githubUser: null,
  isLoading: false,
  error: null,
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  setView: (view) => set({ currentView: view }),
  setAtomSpace: (data) => set({ atomSpace: data }),
  setGitHubUser: (user) => set({ githubUser: user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));