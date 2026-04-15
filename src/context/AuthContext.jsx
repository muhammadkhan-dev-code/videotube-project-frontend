import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { getCurrentUser } from '../api/userApi'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateUser = useCallback(updatedUser => {
    setUser(updatedUser)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, setUser, updateUser, logout, loading }),
    [user, updateUser, logout, loading]
  )

  useEffect(() => {
    async function fetchUser () {
      try {
        const res = await getCurrentUser()
        setUser(res.data.data)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
export { AuthContext }
