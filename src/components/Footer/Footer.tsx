import React from "react"

const Footer:React.FC = () => {

    return (
        <div className="footer">
            <div className="innerFooter container">
                <p>You can find code of this project at <a href="https://github.com/michalwarchol/color-post">Github</a></p>
                <p>Copyright &copy; {new Date().getFullYear()} Michał Warchoł. All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;