export default function AppFooter() {
    return (
        <footer>
            <footer className="text-center text-lg-start" style={{ backgroundColor: '#29B6F6' }}>
                <div className="container d-flex justify-content-center py-5">
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: '#54456b' }}
                    >
                        <i className="bi bi-facebook"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: '#54456b' }}
                    >
                        <i className="bi bi-youtube"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: '#54456b' }}
                    >
                        <i className="bi bi-instagram"></i>
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-lg btn-floating mx-2"
                        style={{ backgroundColor: '#54456b' }}
                    >
                        <i className="bi bi-twitter-x"></i>
                    </button>
                </div>

                {/* Copyright */}
                <div
                    className="text-center text-white p-3"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                >
                    © 2025 Copyright

                </div>
                {/* Copyright */}
            </footer>
        </footer>
    )
}