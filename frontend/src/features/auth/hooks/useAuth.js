import { useContext } from "react";
import { AuthContext } from "../state/auth.context.jsx";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const userData = await login({ email, password })
            setUser(userData.user)
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
            setUser(userData.user)
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

    return {user, loading, handleLogin, handleRegister, handleLogout}
}