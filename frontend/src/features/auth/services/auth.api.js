import { createApiClient } from '../../../services/http/client.js'

// Create an axios instance with default configuration to interact with the authentication API
const api = createApiClient('/auth')

export async function register({username, email, password}){
    try{
        const response = await api.post("/register", {
        username,
        email,
        password
    }) 

    return response.data

    } catch(error){
        console.error("Registration failed:", error)
        throw error
    }
    
}

export async function login({email, password}){
    try{
        const response = await api.post("/login", {
        email,
        password
        })

        return response.data

    }catch(error){
        console.error("Login failed:", error)
        throw error
    }
}

export async function logout(){
    try{
        const response = await api.get("/logout")

        return response.data

    }catch(error){
        console.error("Logout failed:", error)
        throw error
    }
}

export async function getCurrentUser(){
    try{
        const response = await api.get("/profile")

        return response.data

    }catch(error){
        console.error("Failed to fetch current user:", error)
        throw error
    }
}