export default function PropertiesCard({ property, services }) {
    return (
        <>
            <div className="card">
                <div className="card-img-top"></div>
                <div className="card-body">
                    <div className="card-title mb-2 text-center">
                        <h2>{property.name}</h2>
                    </div>
                    <div>
                        <h4>
                            Property Features:
                        </h4>
                        <div className="row mt-2 g-3">
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
        </>
    )
}