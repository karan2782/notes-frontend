import { createContext, useContext } from "react";

const Auth = createContext()

function AuthProvider({children}){
    
    if(!localStorage.getItem("token")){
        localStorage.setItem("token", "")
        window.location.href='/login'
        alert("You are not logged in")
    }
    return (
        <Auth.Provider value={{}}>
        {children}
        </Auth.Provider>
    )
}

function useAuth(){
    const context = useContext(Auth)
    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}

export {AuthProvider, useAuth}