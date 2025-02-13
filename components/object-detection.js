"use client";
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import {load as cocossdLoad} from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs';
import { renderPredictions } from '@/utils/render-prediction';

let detectInterval;

const ObjectDetection = () => {
    const [loading, setLoading] = useState(true);

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runCoco = async ()=>{
        setLoading(true);
       const net=  await cocossdLoad();
       setLoading(false);

         detectInterval = setInterval(()=>{
            runObjectDetection(net);
         },10);

    }

    async function runObjectDetection(net){
        if(
            canvasRef.current && 
            webcamRef.current !== null && 
            webcamRef.current.video.readyState === 4
        ){
            canvasRef.current.width = webcamRef.current.video.videoWidth;
            canvasRef.current.height = webcamRef.current.video.videoHeight;

            // find objects

            // just it {net.detect(x,y ,z)} takes 3 input (img, maxNumBoxes=>no of object detect, minScore=>(o to 1)) 

            const detectedObjects= await net.detect(webcamRef.current.video,undefined,0.6)

            // console.log('detectedObjects:', detectedObjects);

            const context = canvasRef.current.getContext("2d");
            renderPredictions(detectedObjects, context);
        }
    } 

    const showmyVideo = ()=>{
        if(webcamRef.current !== null && webcamRef.current.video?.readyState === 4){
            const myVideoWidth= webcamRef.current.video.videoWidth;
            const myVideoHeight= webcamRef.current.video.videoHeight;
            
  

            webcamRef.current.video.width = myVideoWidth;
            webcamRef.current.video.height = myVideoHeight;
        }
    };

    useEffect(()=>{
        runCoco();
        showmyVideo();
    },[]);
  return (
    <div className='mt-8'>{
        loading ? (
            <div>Loading COCO-SSD model...</div>
        ):
        <div className='relative flex justify-center items-center gradient p-1.5 rounded-md'>

            <Webcam 
            ref={webcamRef}
            className='rounded-md w-full lg:h-[720px]' muted/>
        
            <canvas
            ref={canvasRef}
            className='absolute top-0 left-0 z-999 w-full lg:h-[720px]'
            />

        </div>}
    </div>
  )
}

export default ObjectDetection