import React, { useEffect, useState } from "react"
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import { PatternType } from "../../reducers/types";

const Profile: React.FC = () => {

    const [createdPatterns, setCreatedPatterns] = useState<PatternType[] | null>(null)
    const [likedPatterns, setLikedPatterns] = useState<PatternType[] | null>(null)

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
                    <h1>{getUserName()}</h1>
                    <h4>Total patterns created: {getUserCreatedPatternsLength()}</h4>
                    <h4>Total patterns liked: {getUserLikedPatternsLength()}</h4>
                </div>
                <div className="carouselBox">
                    <h2>Created patterns</h2>
                    {createdPatterns && <div className="d-flex flex-row">
                        <Carousel patterns={createdPatterns} />
                    </div>}
                </div>
                <div className="carouselBox">
                    <h2>Liked Pattterns</h2>
                    {likedPatterns && <div>
                        <Carousel patterns={likedPatterns} />
                    </div>}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;