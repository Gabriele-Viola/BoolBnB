import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
    const [user, setUser] = useState('Guest');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recupera l'utente da localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false); // Imposta loading su false una volta che i dati sono stati caricati
    }, []);

    // Salva l'utente in localStorage quando cambia
    useEffect(() => {
        if (user && user !== 'Guest') {
            localStorage.setItem('user', user);
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    // Funzione per il logout
    const logout = () => {
        setUser('Guest');  // Resetta l'utente a "Guest"
        localStorage.removeItem('user');  // Rimuove l'utente da localStorage
    };

    const values = {
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        logout // Aggiungi logout nel contesto
    };

    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    );
}

function useGlobalContext() {
    return useContext(GlobalContext);
}

export { GlobalContextProvider, useGlobalContext };
