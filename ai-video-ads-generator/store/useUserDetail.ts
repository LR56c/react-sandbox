import { create } from 'zustand'

type UserDetailState = {
  user: any | null
  setUser: (user: any) => void
}

export const useUserDetailStore = create<UserDetailState>(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
  })
)

