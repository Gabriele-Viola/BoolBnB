import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import { useGlobalContext } from '../Context/GlobalContext';


export default function FinderPage() {
    const { fetchReviews } = useGlobalContext()

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        // Costruisci l'URL della query per il backend
        const apiUrl = `http://127.0.0.1:3000/api/search?${searchParams.toString()}`;

        // Effettua la richiesta
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei dati');
                }
                return response.json();
            })
            .then((data) => {
                setProperties(data.properties); // Supponendo che il backend restituisca `properties`
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Caricamento...</p>;
    }

    if (error) {
        return <p>Errore: {error}</p>;
    }

    return (
        <>
            <section>
                <div className="container-fluid">
                    <Jumbotron title={'Spero tu abbia trovato ciò che cercavi'} />
                </div>
                <div className="container-fluid">
                    <h1 className={`text-${properties.length ? 'success' : 'danger'}`}>{properties.length} Risultati trovati </h1>
                    {properties.length > 0 ?
                        <>
                            {properties.map(property =>



                                <div className="card overflow-hidden shadow mb-3" key={property?.id}>
                                    <div className="row">

                                        <div className="col-12 col-md-12 col-lg-4">
                                            <img
                                                src={property?.image ? `http://localhost:3000/uploads/${property?.image}` : 'https://placehold.co/300x250/EEE/31343C'}
                                                alt={property.name}
                                                style={{ width: '100%', maxHeight: '270px' }}
                                                className="object-fit-cover"

                                            />
                                        </div>
                                        {/* Colonna destra con i dettagli */}
                                        <div className="col-md-12 col-lg-8">
                                            {/* Intestazione con il nome della proprietà */}
                                            <div className="card-title my-4 d-flex justify-content-between px-2 ">
                                                <h2>{property.name}</h2>
                                                <div className='px-2'>

                                                    <Link to={`/properties/${property.slug}`} className="text-decoration-none text-light btn btn-primary">Dettagli</Link>
                                                </div>
                                            </div>
                                            {/* Griglia delle caratteristiche della proprietà */}
                                            <div className="mt-3 px-2">
                                                <h3>Caratteristiche della proprietà:</h3>
                                                <div className="row mt-2 g-3 ">
                                                    <div className="col-6">
                                                        <strong>Stanze: </strong>
                                                        <span>{property.rooms}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <strong>Letti: </strong>
                                                        <span>{property.beds}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <strong>Bagni: </strong>
                                                        <span>{property.bathrooms}</span>
                                                    </div>
                                                    <div className="col-6">
                                                        <i className="bi bi-rulers"> </i>
                                                        {property.mq}
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <i className="bi bi-geo-alt"> </i>
                                                        {property.address}
                                                    </div>
                                                    <div className="col-12 col-lg-6">
                                                        <i className="bi bi-envelope"> </i>
                                                        {property.email_owners}
                                                    </div>
                                                    <div className="col-6 pb-2">
                                                        <i className="bi bi-heart-fill"> </i>
                                                        <span className='mb-2'> indice di gradimento: {property.like}
                                                        </span>
                                                    </div>
                                                    {/* <div className="col-4">
									<i className="bi bi-tools"> </i>
									{services.join(', ')}
								</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}
                        </> : (
                            <Link to={'/search'} className='bg-danger btn text-light'><span>Mi spiace non abbiamo trovato nulla effettua una nuova ricerca</span> <i className="bi bi-emoji-frown-fill"></i></Link>
                        )}
                </div>

            </section>
        </>
    );
};

