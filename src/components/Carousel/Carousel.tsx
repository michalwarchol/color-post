import React, { useState } from "react"
import {BsChevronRight, BsChevronLeft} from "react-icons/bs";
import Pattern from "../Pattern/Pattern";
import { PatternType } from "../../reducers/types";

interface Props {
    name: string,
    patterns: PatternType[]
}

const Carousel: React.FC<Props> = ({ name, patterns }) => {
    const [slide, setSlide] = useState<number>(0);
    const [leftVisible, setLeftVisible] = useState<boolean>(false);
    const [rightVisible, setRightVisible] = useState<boolean>(patterns.length > 4 ? true : false);

    const processPatterns = () => {
        let carouselItems = [];
        let i = 0;
        while (i < patterns.length) {
            let itemPatterns = patterns.slice(i, i + 4);
            carouselItems.push(
                <div className="myCarouselItem col-12 d-flex flex-row" key={i}>
                    {itemPatterns.map((elem) => <Pattern key={elem._id} id={elem._id} user={elem.user} palette={elem.palette} likes={elem.likes} />)}
                </div>
            )
            i += 4;
        }
        return carouselItems;
    }

    const moveCarousel = (direction: boolean) => {
        if (direction) {
            setSlide(slide - 1);
            if (-slide + 3 > patterns.length / 4) {
                setRightVisible(false);
            }
            setLeftVisible(true);
        } else {
            setSlide(slide + 1);
            if (-slide === 1) {
                setLeftVisible(false);
            }
            setRightVisible(true);
        }
    }
    return (
        <div className="myCarousel d-flex col-12 flex-nowrap align-items-center">
            
            <div className="arrow left d-flex align-items-center justify-content-center"
                onClick={() => moveCarousel(false)}
                style={{ visibility: leftVisible ? "visible" : "hidden" }}>
                <BsChevronLeft />
            </div>
            <div className="carouselWrapper d-flex col-12 flex-column">
            <h1>{name}</h1>
                <div className="carouselInner d-flex col-12" style={{ transform: "translateX(" + slide + "00%)" }}>
                    {processPatterns()}
                </div>
            </div>
            <div className="arrow right d-flex align-items-center justify-content-center"
                onClick={() => moveCarousel(true)}
                style={{ visibility: rightVisible ? "visible" : "hidden" }}>
                <BsChevronRight />
            </div>
        </div>
    )
}

export default Carousel;