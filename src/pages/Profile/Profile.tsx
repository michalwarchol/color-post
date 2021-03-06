import React, { useEffect, useState } from "react"
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import { PatternType } from "../../reducers/types";

const Profile: React.FC = () => {

    const [createdPatterns, setCreatedPatterns] = useState<PatternType[] | null>(null);
    const [likedPatterns, setLikedPatterns] = useState<PatternType[] | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("user");
        if (!data) {
            location.assign("/login");
        }

        fetch("/api/v1/palette/findCreatedByUser", {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(res => {
                if (res.palettes)
                    setCreatedPatterns(res.palettes.reverse())
            })
            .catch(err => console.log(err))


        fetch("/api/v1/palette/findLikedByUser", {
            method: "get",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(res => {
                setLikedPatterns(res.palettes.reverse())
            })
            .catch(err => console.log(err))

    }, [])

    const getUserName = () => {
        const data = localStorage.getItem("user");
        if (data) {
            const user = JSON.parse(data);
            return user.name;
        }
    }

    const getUserLikedPatternsLength = () => {
        const data = localStorage.getItem("user");
        if (data) {
            const user = JSON.parse(data);
            return user.likedPalettes.length;
        }
    }

    const getUserCreatedPatternsLength = () => {
        if (createdPatterns)
            return createdPatterns.length
        else return []
    }

    return (
        <div className="profile d-flex flex-column">
            <Topbar />
            <div className="content container d-flex flex-column flex-grow-1">
                <div className="information">
                    <div className="d-flex justify-content-center">
                        <h4>Name: {getUserName()}</h4>
                    </div>
                    <div className="d-flex flex-row justify-content-around">
                        <h4>Total patterns created: {getUserCreatedPatternsLength()}</h4>
                        <h4>Total patterns liked: {getUserLikedPatternsLength()}</h4>
                    </div>
                </div>
                <div className="carouselBox">
                    {createdPatterns && <div>
                        <Carousel name="Created patterns" patterns={createdPatterns} />
                    </div>}
                </div>
                <div className="carouselBox">
                    {likedPatterns && <div>
                        <Carousel name="Liked patterns" patterns={likedPatterns} />
                    </div>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;