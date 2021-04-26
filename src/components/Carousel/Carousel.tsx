import React, { useState } from "react"
import Pattern from "../Pattern/Pattern";
import { PatternType } from "../../reducers/types";

interface Props {
    patterns: PatternType[]
}

const Carousel: React.FC<Props> = ({ patterns }) => {
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
            if (-slide+2 > patterns.length / 4) {
                setRightVisible(false);
            }
            setLeftVisible(true);
        } else {
            setSlide(slide + 1);
            if (-slide===1) {
                setLeftVisible(false);
            }
            setRightVisible(true);
        }
    }
    return (
        <div className="myCarousel d-flex col-12 flex-nowrap">
            {leftVisible
                && <div className="arrow left d-flex align-items-center justify-content-center"
                    onClick={() => moveCarousel(false)}>
                    &#10096;
                    </div>}
            <div className="carouselWrapper d-flex col-12" style={{ transform: "translateX(" + slide + "00%)" }}>
                {processPatterns()}
            </div>
            {rightVisible
                && <div className="arrow right d-flex align-items-center justify-content-center"
                    onClick={() => moveCarousel(true)}>
                    &#10097;
                    </div>}

        </div>
    )
}

export default Carousel;