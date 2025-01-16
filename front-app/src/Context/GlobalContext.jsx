import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext()

function GlobalContextProvider({ children }) {
    const [user, setUser] = useState('Guest')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [logged, setLogged] = useState(false)

    // Recuperare  user

    useEffect(() => {
        const user = localStorage.getItem('user')
        const logIn = localStorage.getItem('logged')
        if (user) {
            setUser(user)
        }
        if (logged) {
            setLogged(logged)
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', user)
        } else {
            localStorage.removeItem('user')
        }
        if (logged) {
            localStorage.setItem('logged', logged)
        } else {
            localStorage.removeItem('logged')
        }
    }, [user, logged])



    const values = {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        logged,
        setLogged
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



