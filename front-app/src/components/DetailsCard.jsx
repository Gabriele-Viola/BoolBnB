export default function DetailsCard({ property, services }) {
    return (
        <>
            <div className="card overflow-hidden">
                <div className="row">
                    <div className="col-4 ">
                        <img src={`/${property.image}` || 'https://placehold.co/300x250/EEE/31343C'}
                            alt={property.name} style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="col-8">
                        <div className="card-title my-2">
                            <h2>{property.name}</h2>
                        </div>
                        <div className="mt-5">
                            <h3>
                                Property Features:
                            </h3>
                            <div className="row mt-2 g-3 ">
                                <div className="col-4">
                                    <strong>Rooms: </strong>
                                    <span>{property.rooms}</span>
                                </div>
                                <div className="col-4">
                                    <strong>Beds: </strong>
                                    <span>{property.beds}</span>
                                </div>
                                <div className="col-4">
                                    <strong>Bathrooms: </strong>
                                    <span>{property.bathrooms}</span>
                                </div>
                                <div className="col-4">
                                    <i className="bi bi-rulers"> </i>
                                    {property.mq}
                                </div>
                                <div className="col-4">
                                    <i className="bi bi-geo-alt"> </i>
                                    {property.address}
                                </div>
                                <div className="col-4">
                                    <i className="bi bi-envelope"> </i>
                                    {property.email_owners}
                                </div>
                                <div className="col-4">
                                    <i className="bi bi-heart"> </i>
                                    {property.like}
                                </div>
                                <div className="col-4">
                                    <i className="bi bi-tools"> </i>
                                    {services.join(", ")}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}