import { Link } from "react-router-dom"
import { useGlobalContext } from "../Context/GlobalContext"
import { useState } from "react"
export default function LogInPage() {
    const [errorLog, setErrorLog] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, setUser } = useGlobalContext()
    const urlLogIn = "http://localhost:3000/api/user/logIn"

    function HandleUser(e) {
        e.preventDefault()
        const formLogIn = {
            email,
            password
        }

        fetch(urlLogIn, {
            method: "POST",
            body: JSON.stringify(formLogIn),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.user) {
                    setUser(data.user)
                    setErrorLog(null)

                } else {
                    setErrorLog(data?.error)
                }
            }).catch(err => console.error(err))

    }


    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="w-25">
                    <h2 className="mb-4">Effettua il log in:</h2>
                    <form onSubmit={HandleUser} >
                        {errorLog && <p>{errorLog}</p>}
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3" />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="form-control mb-5" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="text-center">
                            {!user?.id ? <button type="submit" className="btn btn-primary">LOG IN</button> :
                                <Link to={`/add/properties/${user.id}`} className="btn btn-primary">Aggiungi proprietà</Link>}
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}