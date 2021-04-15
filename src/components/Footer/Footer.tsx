import React from "react"

const Footer:React.FC = () => {

    return (
        <div className="footer">
            <div className="innerFooter container">
                <p>Copyright &copy; {new Date().getFullYear()} Michał Warchoł. All rights reserved</p>
            </div>
            
        </div>
    )
}

export default Footer;