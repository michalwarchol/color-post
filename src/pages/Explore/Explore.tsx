import React from 'react';
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import BigCarousel from "../../components/BigCarousel/BigCarousel";

const Explore:React.FC = () => {
    return(
        <div className="explore d-flex flex-column">
            <Topbar />
            <div className="content container d-flex flex-column flex-grow-1 justify-content-center">
                <h1>Explore</h1>
                <BigCarousel />
                <BigCarousel />
                <BigCarousel />
            </div>
            <Footer />
        </div>
    )
}
export default Explore;