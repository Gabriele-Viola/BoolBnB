import { createContext, useContext, useEffect, useState } from "react"

const GlobalContext = createContext()

function GlobalContextProvider({ children }) {
    const [user, setUser] = useState('Guest')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)



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



