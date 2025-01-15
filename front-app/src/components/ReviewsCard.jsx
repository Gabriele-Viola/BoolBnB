import { useEffect, useState } from "react";

export default function ReviewsCard({ reviews }) {
    // Stato per il caricamento
    const [loading, setLoading] = useState(true);

    // Funzione per formattare la data
    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d)) {
            return 'Data non disponibile';
        }
        return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
    };

    useEffect(() => {
        // Quando le recensioni sono caricate, imposta lo stato di caricamento a false
        if (reviews && reviews.length > 0) {
            setLoading(false);
        }
    }, [reviews]);

    if (loading) {
        return <div>Caricamento recensioni...</div>;
    }

    return (
        reviews.map((review) => (
            <div className="col-sm-12 col-md-6 col-lg-4" key={review.id}>
                <div className="card h-100 my-3">
                    <div className="card-body">
                        <div className="fs-5">{review.text_review}</div>
                        <div><span className="text-muted">Notti: </span>{review.nights}</div>
                        <span className="text-muted">Lasciata da: </span>
                        {review.name === "" || !review.name ? <span>Guest</span> : <span>{review.name}</span>}
                        <div>
                            <span className="text-muted">Data recensione: </span>
                            {review.date_review ? formatDate(review.date_review) : "Data non disponibile"}
                        </div>
                    </div>
                </div>
            </div>
        ))
    );
}


