import React from "react"

import Topbar from "../../components/Topbar/Topbar"
import Footer from "../../components/Footer/Footer"
import Button from "../../components/Button/Button"

const NotFound = () => {

    const goHome = () => {
        location.assign("/");
    }

    return (
        <div className="notFound  d-flex flex-column">
            <Topbar />
            <div className="d-flex container flex-column flex-grow-1 justify-content-center align-items-center">
                    <h2>Oops! Something went wrong</h2>
                    <h2>Page not found</h2>
                    <h1>404</h1>
                    <Button text="Go home" handleClick={goHome} type="button" />
                
            </div>
            <Footer />
        </div>
    )
}

export default NotFound;