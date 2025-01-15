import { Link } from "react-router-dom"
import { useGlobalContext } from "../Context/GlobalContext"
import { useState } from "react"
export default function LogInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { user, setUser, error, setError } = useGlobalContext()
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
                    setError(null)

                } else {
                    setError(data?.error)
                }
            }).catch(err => console.error(err))

    }


    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={HandleUser} >
                {error && <p>{error}</p>}
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                {!user?.id ? <button type="submit" className="btn btn-primary">LOG IN</button> :
                    <Link to={`/add/properties/${user.id}`} className="btn btn-primary">Go to Add</Link>}

            </form>

        </>
    )
}