import React, {useState} from "react"
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
            console.log(response)
            if (response.redirected == true) {
                location.assign(response.url)
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
				location.assign(response.url)
			}
			setCustomVisible(false);
            setShowNotification(!showNotification);
		}).catch(err => {
			console.log(err)
		})
	}

    return (
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center">
            <Button text="save pattern" handleClick={savePattern} />
            <Button text="create custom" handleClick={createCustomPattern} />
            {customVisible && <CustomPattern cancel={cancelCustomPattern} saveCustom={saveCustom} />}
            {(showNotification || !showNotification) && typeof(showNotification)==="boolean" && <NotificationBadge text="Pattern saved" />}
        </div>
    )
}

const mapStateToProps = (state: StateType) => ({
	palette: state.colors
})

export default connect(mapStateToProps)(ColorWheelButtons);