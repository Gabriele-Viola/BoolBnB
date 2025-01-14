export default function ReviewsCard({ reviews }) {
    return (
        reviews.map(review =>
            <div className="col-sm-12 col-md-6 col-lg-4" key={review.id}>
                <div className="card h-100 my-3" >
                    <div className="card-body">
                        <div className="fs-5">{review.text_review}</div>
                        <div><span className="text-muted">Nights: </span>{review.nights}</div>
                        <span className="text-muted">By: </span>
                        {review.name === "" ? <span>Guest</span> : <span>{review.name}</span>}
                        <div><span className="text-muted">Date review: </span>{review.date_review.slice(0, 10)}</div>
                    </div>
                </div>
            </div>)

    )
}