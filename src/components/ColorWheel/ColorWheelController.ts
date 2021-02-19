import React from 'react'
import store from "../../reducers/colorStore"

export type Coordinates = {
    x: number,
    y: number,
    type: string
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
        var pivotPointerAfter = (pivotPointer + 3 + 1) % 3;
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
    let x = store.getState().x;
    let y = store.getState().y;
    let pointToCircleCenterLength = Math.sqrt(Math.pow(x - 257, 2) + Math.pow(y - 257, 2));
    if (radius > pointToCircleCenterLength) {  //is point in circle
        point.style.left = x - 10 + "px";
        point.style.top = y - 10 + "px";
    }
}


export const getPointerColor = (context: CanvasRenderingContext2D) => {
    let x = store.getState().x;
    let y = store.getState().y;
    let pointToCircleCenterLength = Math.floor(Math.sqrt(Math.pow(x - 255, 2) + Math.pow(y - 255, 2)));
    if (radius >= pointToCircleCenterLength) {
        let color;
        if (x <= 255 && y <= 255) color = context.getImageData(x, y, 1, 1).data;
        else if (x >= 255 && y <= 255) color = context.getImageData(x, y, -1, 1).data;
        else if (x <= 255 && y >= 255) color = context.getImageData(x, y, 1, -1).data;
        else color = context.getImageData(x, y, -1, -1).data;
        let red = color[0];
        let green = color[1];
        let blue = color[2];
        return "rgb(" + red + "," + green + "," + blue + ")";
    } else {
        return null;
    }
}

export const setPointerColor = (context: CanvasRenderingContext2D, id: number, x: number, y: number) => {
    let pointToCircleCenterLength = Math.floor(Math.sqrt(Math.pow(x - 255, 2) + Math.pow(y - 255, 2)));
    if (radius >= pointToCircleCenterLength) {
        let color;
        if (x <= 255 && y <= 255) color = context.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        else if (x >= 255 && y <= 255) color = context.getImageData(Math.floor(x), Math.floor(y), -1, 1).data;
        else if (x <= 255 && y >= 255) color = context.getImageData(Math.floor(x), Math.floor(y), 1, -1).data;
        else color = context.getImageData(Math.floor(x), Math.floor(y), -1, -1).data;
        let red = color[0];
        let green = color[1];
        let blue = color[2];

        store.dispatch({
            type: "SET_COLOR",
            index: id,
            color: "rgb(" + red + "," + green + "," + blue + ")"
        })
        return "rgb(" + red + "," + green + "," + blue + ")";
    } else {
        return null;
    }
}