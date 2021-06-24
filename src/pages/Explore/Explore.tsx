import React, { useState, useEffect } from 'react';
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import BigCarousel from "../../components/BigCarousel/BigCarousel";

const Explore:React.FC = () => {
    const [focused, setFocused] = useState<number>(1);

    useEffect(()=>{
        const data = localStorage.getItem("user");
        if (!data) {
            location.assign("/login");
        }   
    }, [])

    const focus = (id: number) => {
        setFocused(id)
    }

    return(
        <div className="explore d-flex flex-column">
            <Topbar />
            <div className="content container d-flex flex-column flex-grow-1 justify-content-center">
                <h1>Explore</h1>
                <BigCarousel key="1" id={1} focused={focused} focus={focus} />
                <BigCarousel key="2" id={2} focused={focused} focus={focus} />
                <BigCarousel key="3" id={3} focused={focused} focus={focus} />
            </div>
            <Footer />
        </div>
    )
}
export default Explore;