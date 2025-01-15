import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PropertyCard from '../components/PropertyCard'

import { useGlobalContext } from '../Context/GlobalContext'



export default function Homepage() {
	const [url, setUrl] = useState("/login")
	const { user } = useGlobalContext()
	useEffect(() => {

		if (user !== 'Guest') {
			setUrl(`/add/properties/${user.id}`)
		}
	}, [user])

	return (
		<>

			<div className="container py-3">
				<div className='d-flex justify-content-end mb-3'>
					<Link to={url} className="btn btn-primary mb-3">
					Aggiungi Proprietà
				</Link>
				</div>
				<div className='d-flex justify-content-end'>
					 {user?.id && <span>Accesso effettuato come: <h3>{user.user_name}</h3></span>} 
				</div>
			</div>
			<PropertyCard />
		</>
	)
}
