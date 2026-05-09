import { create } from 'zustand';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const useAuthStore = create((set) => ({
  user: null,
  dbUser: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setDbUser: (dbUser) => set({ dbUser }),
  setLoading: (loading) => set({ loading }),

  loginWithGoogle: async () => {
    try {
      set({ loading: true, error: null });
      const result = await signInWithPopup(auth, googleProvider);
      
      // Get the Firebase ID token
      const token = await result.user.getIdToken();
      
      // Sync with our backend to create/get user in Firestore and get role
      // In a real scenario, replace with actual backend URL
      const response = await fetch('http://localhost:5000/api/users/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to sync user with backend');
      
      const dbUserData = await response.json();
      set({ user: result.user, dbUser: dbUserData, loading: false });
      
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await signOut(auth);
      set({ user: null, dbUser: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  initAuthListener: () => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const response = await fetch('http://localhost:5000/api/users/sync', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const dbUserData = await response.json();
          set({ user, dbUser: dbUserData, loading: false });
        } catch (error) {
          console.error("Error fetching db user details on load", error);
          set({ user, loading: false });
        }
      } else {
        set({ user: null, dbUser: null, loading: false });
      }
    });
  }
}));

export default useAuthStore;
