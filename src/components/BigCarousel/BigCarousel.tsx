import React, { useEffect, useState } from 'react';
import {BsChevronLeft, BsChevronRight} from "react-icons/bs"
import {PatternType} from "../../reducers/types";
import BigPattern from "../BigPattern/BigPattern";

const BigCarousel:React.FC = () => {

    const [patterns, setPatterns] = useState<PatternType[]>([]);
    const [slide, setSlide] = useState<number>(0);
    const [leftVisible, setLeftVisible] = useState<boolean>(false);

    useEffect(()=>{
        getRandomPalette();
    },[])

    const getRandomPalette = () => {
        fetch("/api/v1/palette/findRandom", {
            method: "get",
			headers: { 'Content-Type': 'application/json' }
        })
        .then(response=>response.json())
        .then(res=>{
            const data = localStorage.getItem("user");
            if(data){
                const user = JSON.parse(data);
                let index = user.likedPalettes.indexOf(res.palette._id);
                if(index===-1){
                    let givenPatterns = patterns.concat();
                    givenPatterns.push(res.palette);
                    setPatterns(givenPatterns);
                    return;
                }
                getRandomPalette();
            }
            
        })
        .catch(err=>console.log(err))
    }

    const processPatterns = () => {
        return patterns.map((elem, i)=><BigPattern k={i} pattern={elem}/>)
    }

    const moveCarousel = (direction: boolean) => {
        if (direction) {
            setSlide(slide - 1);
            setLeftVisible(true);
            if(-slide>=patterns.length-1)
                getRandomPalette();
        } else {
            setSlide(slide + 1);
            if (-slide === 1) {
                setLeftVisible(false);
            }
        }
    }
    return(
        <div className="bigCarousel d-flex col-12 flex-nowrap align-items-center">
            <div className="arrow left d-flex align-items-center justify-content-center"
                onClick={() => moveCarousel(false)}
                style={{ visibility: leftVisible ? "visible" : "hidden" }}>
                <BsChevronLeft />
            </div>
            <div className="carouselWrapper d-flex col-12 flex-column">
                <div className="carouselInner d-flex col-12 justify-content-start" style={{transform: "translateX("+slide+"00%)"}}>
                    {processPatterns()}
                </div>
            </div>
            <div className="arrow right d-flex align-items-center justify-content-center"
                onClick={() => moveCarousel(true)}>
                <BsChevronRight />
            </div>
        </div>
    )
}
export default BigCarousel;