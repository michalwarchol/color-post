import React from 'react'
import store from "../../reducers/colorStore"

export type Coordinates = {
    x: number,
    y: number,
}

export const radius: number = 255;

export const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
}

export const generateColorWheel = (ctx: any) => {
    var size = 512;
    var centerColor = "white";
    //Generate main canvas to return
    var canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    //Generate canvas clone to draw increments on
    var canvasClone = document.createElement("canvas");
    canvasClone.width = canvasClone.height = size;
    var canvasCloneCtx: any = canvasClone.getContext("2d");
    //Initiate variables
    var angle = 0;
    var hexCode = [255, 0, 0];
    var pivotPointer = 0;
    var colorOffsetByDegree = 4.322;
    //For each degree in circle, perform operation
    while (angle++ < 360) {
        //find index immediately before and after our pivot
        var pivotPointerbefore = (pivotPointer + 3 - 1) % 3;
        //Modify colors
        if (hexCode[pivotPointer] < 255) {
            //If main points isn't full, add to main pointer
            hexCode[pivotPointer] = (hexCode[pivotPointer] + colorOffsetByDegree > 255 ? 255 : hexCode[pivotPointer] + colorOffsetByDegree);
        }
        else if (hexCode[pivotPointerbefore] > 0) {
            //If color before main isn't zero, subtract
            hexCode[pivotPointerbefore] = (hexCode[pivotPointerbefore] > colorOffsetByDegree ? hexCode[pivotPointerbefore] - colorOffsetByDegree : 0);
        }
        else if (hexCode[pivotPointer] >= 255) {
            //If main color is full, move pivot
            hexCode[pivotPointer] = 255;
            pivotPointer = (pivotPointer + 1) % 3;
        }
        //clear clone
        canvasCloneCtx.clearRect(0, 0, size, size);
        //Generate gradient and set as fillstyle
        var grad = canvasCloneCtx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grad.addColorStop(0, centerColor);
        grad.addColorStop(1, "rgb(" + hexCode.map(function (h) { return Math.floor(h); }).join(",") + ")");
        canvasCloneCtx.fillStyle = grad;
        //draw full circle with new gradient
        canvasCloneCtx.globalCompositeOperation = "source-over";
        canvasCloneCtx.beginPath();
        canvasCloneCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        canvasCloneCtx.closePath();
        canvasCloneCtx.fill();
        //Switch to "Erase mode"
        canvasCloneCtx.globalCompositeOperation = "destination-out";
        //Carve out the piece of the circle we need for this angle
        canvasCloneCtx.beginPath();
        canvasCloneCtx.arc(size / 2, size / 2, 0, degreesToRadians(angle + 1), degreesToRadians(angle + 1));
        canvasCloneCtx.arc(size / 2, size / 2, size / 2 + 1, degreesToRadians(angle + 1), degreesToRadians(angle + 1));
        canvasCloneCtx.arc(size / 2, size / 2, size / 2 + 1, degreesToRadians(angle + 1), degreesToRadians(angle - 1));
        canvasCloneCtx.arc(size / 2, size / 2, 0, degreesToRadians(angle + 1), degreesToRadians(angle - 1));
        canvasCloneCtx.closePath();
        canvasCloneCtx.fill();
        //Draw carved-put piece on main canvas
        ctx.drawImage(canvasClone, 0, 0);
    }
}

export const updatePointerPosition = (e: React.MouseEvent, canvas: HTMLCanvasElement) => {
    let x = e.pageX - canvas.getBoundingClientRect().x;
    let y = e.pageY - canvas.getBoundingClientRect().y;
    store.dispatch({
        type: "MOVE_MAIN_POINTER",
        x: x,
        y: y
    })
}

export const movePointInCircle = (point: HTMLDivElement) => {
    let { x, y } = store.getState();
    let pointToCircleCenterLength = Math.sqrt(Math.pow(x - 257, 2) + Math.pow(y - 257, 2));
    if (radius > pointToCircleCenterLength) {  //is point in circle
        point.style.left = x - 10 + "px";
        point.style.top = y - 10 + "px";
    }
}

export const setPointerColor = (context: CanvasRenderingContext2D, id: number, x: number, y: number) => {
    let pointToCircleCenterLength = Math.floor(Math.sqrt(Math.pow(x - 255, 2) + Math.pow(y - 255, 2)));
    if (radius >= pointToCircleCenterLength) {
        let color;
        if (x <= 255 && y <= 255)
            color = context.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        else if (x >= 255 && y <= 255)
            color = context.getImageData(Math.floor(x), Math.floor(y), -1, 1).data;
        else if (x <= 255 && y >= 255)
            color = context.getImageData(Math.floor(x), Math.floor(y), 1, -1).data;
        else
            color = context.getImageData(Math.floor(x), Math.floor(y), -1, -1).data;

        let red = color[0];
        let green = color[1];
        let blue = color[2];

        store.dispatch({
            type: "SET_COLOR",
            index: id,
            color: "rgb(" + red + "," + green + "," + blue + ")"
        })
    }
}

const positionMode = (mode: string, id: number): Coordinates => {
    let mainX = store.getState().x - radius;
    let mainY = store.getState().y - radius;
    let degrees;
    let x, y;
    switch (mode) {
        case "primary":
            degrees = id % 2 == 0
                ? -30 * id / 2
                : 30 * (id + 1) / 2;
            x = mainX * Math.cos(degreesToRadians(degrees)) - mainY * Math.sin(degreesToRadians(degrees)) + radius;
            y = mainX * Math.sin(degreesToRadians(degrees)) + mainY * Math.cos(degreesToRadians(degrees)) + radius;
            return { x, y } as Coordinates;

        case "secondary":
            degrees = id % 2 == 0
                ? -72 * id / 2
                : 72 * (id + 1) / 2;
            x = mainX * Math.cos(degreesToRadians(degrees)) - mainY * Math.sin(degreesToRadians(degrees)) + radius;
            y = mainX * Math.sin(degreesToRadians(degrees)) + mainY * Math.cos(degreesToRadians(degrees)) + radius;
            return { x, y } as Coordinates;

        case "triad":
            degrees = id % 2 == 0
                ? -120 * id / 2
                : 120 * (id + 1) / 2;

            x = (mainX * Math.cos(degreesToRadians(degrees)) - mainY * Math.sin(degreesToRadians(degrees)));
            y = (mainX * Math.sin(degreesToRadians(degrees)) + mainY * Math.cos(degreesToRadians(degrees)));
            if (id > 2) {
                let length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                x *= (length / (length + 30));
                y *= (length / (length + 30));
            }
            x += radius;
            y += radius;
            return { x, y } as Coordinates;
        default:
            degrees = id % 2 == 0
                ? -30 * id / 2
                : 30 * (id + 1) / 2;
            x = mainX * Math.cos(degreesToRadians(degrees)) - mainY * Math.sin(degreesToRadians(degrees)) + radius;
            y = mainX * Math.sin(degreesToRadians(degrees)) + mainY * Math.cos(degreesToRadians(degrees)) + radius;
            return { x, y } as Coordinates;
    }
}

export const moveByVector = (mode: string, id: number, pointer: HTMLDivElement, setColor: (x: number, y: number, id: number) => void) => {
    let {x, y} = positionMode(mode, id);
    let pointToCircleCenterLength = Math.sqrt(Math.pow(x - 257, 2) + Math.pow(y - 257, 2));
    if(radius>pointToCircleCenterLength){
        pointer.style.left = x - 10 + "px";
        pointer.style.top = y - 10 + "px";
        setColor(x, y, id);
    }
}