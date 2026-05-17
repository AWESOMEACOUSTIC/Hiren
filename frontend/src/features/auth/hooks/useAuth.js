import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../state/auth.context.jsx";
import { login, register, logout, getCurrentUser } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context
    const location = useLocation()
    const isAuthScreen =
        location.pathname === "/auth/login" ||
        location.pathname === "/auth/register"

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const userData = await login({ email, password })
            try {
                const profileData = await getCurrentUser()
                setUser(profileData.user || userData.user || null)
            } catch (error) {
                setUser(userData.user || null)
            }
        } catch (error) {
            console.error("Login error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const userData = await register({ username, email, password })
            try {
                const profileData = await getCurrentUser()
                setUser(profileData.user || userData.user || null)
            } catch (error) {
                setUser(userData.user || null)
            }
        } catch (error) {
            console.error("Registration error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error("Logout error:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let isMounted = true

        if (isAuthScreen) {
            setLoading(false)
            return () => {
                isMounted = false
            }
        }

        if (user) {
            setLoading(false)
            return () => {
                isMounted = false
            }
        }

        const fetchUser = async () => {
            setLoading(true)
            try {
                const userData = await getCurrentUser()
                if (isMounted) {
                    setUser(userData.user)
                }
            } catch (error) {
                if (isMounted) {
                    setUser(null)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchUser()

        return () => {
            isMounted = false
        }
    }, [isAuthScreen, setLoading, setUser, user])

    return {user, loading, handleLogin, handleRegister, handleLogout}
}