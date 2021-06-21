import React, {useEffect, useState} from "react"
import {connect} from "react-redux"
import Button from "../Button/Button"
import CustomPattern from "../CustomPattern/CustomPattern"
import {ColorType, StateType} from "../../reducers/types"
import NotificationBadge from "../NotificationBadge/NotificationBadge"

interface Props {
	palette: ColorType[]
}

const ColorWheelButtons: React.FC<Props> = ({palette}) => {

    const [customVisible, setCustomVisible] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean|null>(null);
    const [notLoggedInNotification, setNotLoggedInNotification] = useState<boolean>(false);

    useEffect(()=>{
        if(typeof showNotification === "boolean"){
            setTimeout(()=>{
                setShowNotification(null);
            }, 3000)
        }
    }, [showNotification])

    useEffect(()=>{
        if(notLoggedInNotification === true){
            setTimeout(()=>{
                setNotLoggedInNotification(false);
            }, 3000)
        }
    }, [notLoggedInNotification])

    const createCustomPattern = () => {
        setCustomVisible(!customVisible);
    }

    const cancelCustomPattern = () => {
        setCustomVisible(false);
    }

    const savePattern = () => {
        fetch("/api/v1/palette/create", {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                palette: palette
            })
        }).then(response => {
            if (response.redirected == true) {
                setNotLoggedInNotification(true);
            }
            setShowNotification(!showNotification);
        }).catch(err => {
            console.log(err)
        })
    }

    const saveCustom = (palette: ColorType[]) => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				palette: palette
			})
		}).then(response => {
			if (response.redirected == true) {
				setNotLoggedInNotification(true);
                return;
			}
			setCustomVisible(false);
            setShowNotification(!showNotification);
		}).catch(err => {
			console.log(err)
		})
	}

    return (
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
            <Button text="SAVE" handleClick={savePattern} type="button" />
            <Button text="CREATE CUSTOM" handleClick={createCustomPattern} type="button" />
            {customVisible && <CustomPattern cancel={cancelCustomPattern} saveCustom={saveCustom} />}
            {(showNotification || !showNotification) && typeof(showNotification)==="boolean" && <NotificationBadge text="Pattern saved" />}
            {notLoggedInNotification && <NotificationBadge text="You must be logged in user!" />}
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
	palette: state.colors
})

export default connect(mapStateToProps)(ColorWheelButtons);