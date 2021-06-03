import React, { useEffect, useState } from "react"
import Topbar from "../../components/Topbar/Topbar";
import Footer from "../../components/Footer/Footer";
import Carousel from "../../components/Carousel/Carousel";
import Button from "../../components/Button/Button";
import PasswordReset from "../../components/PasswordReset/PasswordReset";
import NotificationBadge from "../../components/NotificationBadge/NotificationBadge";
import { PatternType } from "../../reducers/types";

const Profile: React.FC = () => {

    const [createdPatterns, setCreatedPatterns] = useState<PatternType[] | null>(null);
    const [likedPatterns, setLikedPatterns] = useState<PatternType[] | null>(null);
    const [passwordResetPanel, setPasswordResetPanel] = useState<boolean>(false);
    const [passwordChanged, setPasswordChanged] = useState<boolean|null>(null);

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

    useEffect(()=>{
        if(typeof passwordChanged === "boolean"){
            setTimeout(()=>{
                setPasswordChanged(null);
            }, 3000)
        }
    }, [passwordChanged])

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

    const passwordReset = () => {
        setPasswordResetPanel(true);
    }
    const passwordResetCancel = () => {
        setPasswordResetPanel(false);
    }

    const handlePasswordChanged = () => {
        setPasswordChanged(!passwordChanged);
    }

    return (
        <div className="profile d-flex flex-column">
            <Topbar />
            <div className="content container d-flex flex-column flex-grow-1">
                <div className="information">
                    <h1>{getUserName()}</h1>
                    <h4>Total patterns created: {getUserCreatedPatternsLength()}</h4>
                    <h4>Total patterns liked: {getUserLikedPatternsLength()}</h4>
                    <Button text="reset password" handleClick={passwordReset}/>
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
            {passwordResetPanel && <PasswordReset onSuccess={handlePasswordChanged} cancel={passwordResetCancel} />}
            <Footer />
            {(passwordChanged || !passwordChanged) && typeof passwordChanged === "boolean" && (
                <NotificationBadge text="Password has been reset" />
            )}
        </div>
    )
}

export default Profile;