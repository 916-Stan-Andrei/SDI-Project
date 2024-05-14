import {create} from  'zustand';


interface UserState {
    role: string | null;
    setRole: (role: string) => void;
    userId: number | null;
    setUserId: (userId: number) => void;
  }
  
export const useUserStore = create<UserState>((set) => ({
    role: null, 
    setRole: (role) => set({ role }), 
    userId: null,
    setUserId: (userId) => set({userId})
  }));