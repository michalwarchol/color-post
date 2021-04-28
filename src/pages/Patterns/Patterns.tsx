import React, { useEffect, useState } from 'react'
import {useLocation} from "react-router-dom";

import Topbar from "../../components/Topbar/Topbar";
import Pattern from "../../components/Pattern/Pattern";
import Spinner from "../../components/Spinner/Spinner";
import Footer from "../../components/Footer/Footer";
import {PatternType} from "../../reducers/types";

const Patterns = () => {
    const [patterns, setPatterns] = useState<PatternType[]|null>(null);
    const thisLocation=useLocation();

    useEffect(()=>{
        const query = new URLSearchParams(thisLocation.search);
        const name = query.get('name');
        if(name===undefined || name===null || name===""){
            location.assign("/");
        }
        getUserPatterns();
    }, [])

    const getUserPatterns = () => {
        const query = new URLSearchParams(thisLocation.search);
        const name = query.get('name');
        fetch("/api/v1/palette/findByUser?user="+name, {
			method: "get",
			headers: { 'Content-Type': 'application/json' },
		})
        .then(response=>response.json())
        .then(res=>{
            console.log(res)
            if(res.redirect){
                location.assign(res.url)
            }else{
                setPatterns(res.palettes);
            }
        })
    }

    const generatePatterns = () => {
        const query = new URLSearchParams(thisLocation.search);
        const name = query.get('name');
        if(patterns===null){
            return <div className="d-flex col-12 justify-content-center align-items-center"><Spinner /></div>
        }else if(patterns.length===0){
            return <div className="col-12">
                        <h2>Patterns created by {name}</h2>
                        <h3>This user doesn't created any pattern</h3>
                    </div>
        }else{
            return <div className="col-12">
                <h2>Patterns created by {name}</h2>
                <div className="d-flex flex-row justify-content-start flex-wrap">{
                    patterns.map((elem, i)=>(<Pattern key={i} id={elem._id} palette={elem.palette} user={elem.user} likes={elem.likes}/>))
                }</div>
                </div>
        }
    }

    return(
        <div className="patterns d-flex flex-column">
            <Topbar />
            <div className="content container d-flex flex-grow-1">
                {
                    generatePatterns()
                }
            </div>
            <Footer />
        </div>
    )
}

export default Patterns;