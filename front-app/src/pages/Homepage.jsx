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
			<Link to={url}>Aggiungi</Link>
			{user?.id && <h3>{user.user_name}</h3>}
			<PropertyCard />
		</>
	)
}
