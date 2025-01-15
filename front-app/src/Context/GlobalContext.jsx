import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext()

function GlobalContextProvider({ children }) {
    const [user, setUser] = useState('Guest')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Recuperare  user

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(user)
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', user)
        } else {
            localStorage.removeItem('user')
        }
    }, [user])

    const values = {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError
    }

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )

}
function useGlobalContext() {
    return useContext(GlobalContext)
}
export { GlobalContextProvider, useGlobalContext }



