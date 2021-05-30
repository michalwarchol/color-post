import React from 'react'

interface Props {
    text: string,
}

const NotificationBadge:React.FC<Props> = ({text}) => {
    return(
        <div className="notificationBadge">
            <span>{text}</span>
        </div>
    )
}
export default NotificationBadge;