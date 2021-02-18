import React from 'react'

import ColorWheel from "../../components/ColorWheel/ColorWheel";
import Square from '../../components/colorSquare/Square';

const Main = () => {

    const api_create = () => {
		fetch("/api/v1/palette/create", {
			method: "post",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				user: "601318fb9dc5587d645a220f",
				palette: ["#123321", "#ABABAB"]
			})
		})
	}

	const api_findById = () => {
		fetch("/api/v1/palette/findById", {
			method: "post",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: "60134419e04eca5c30051ae4"
			})
		})
		.then(response=>response.json())
		.then(res=>console.log(res))
		.catch(err=>{
			console.log(err)
		})
	}

	const api_findAll = () => {
		fetch("/api/v1/palette/findAll", {
			method: "get",
			headers: {'Content-Type': 'application/json'},
		})
		.then(response=>response.json())
		.then(res=>console.log(res));
    }
    
    return(
        <div className="main">
            <button onClick={api_create}>create</button>
			<button onClick={api_findAll}>findAll</button>
			<button onClick={api_findById}>findById</button>
			<ColorWheel />
			<Square />
        </div>
    )
}

export default Main;