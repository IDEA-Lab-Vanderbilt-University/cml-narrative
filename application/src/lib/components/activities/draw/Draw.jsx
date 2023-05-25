/*
 * /src/lib/components/activities/draw/Draw.jsx
 * Draw.jsx
 * cml-narrative
 * 
 * Created by Ian Thompson on May 22nd 2023
 * icthomp@g.clemson.edu
 * 
 * https://idealab.sites.clemson.edu
 * 
 */

import { Excalidraw, exportToSvg } from "@excalidraw/excalidraw";

import React from "react";
import { useState } from "react";

/** 
 * Defines the Draw React component  
 * 
 * This component houses the Exalidraw "whiteboard" which will allow users to draw and type on a canvas.
 * This tool provides a simple API to allow us to convert the drawing to an SVG which we can then upload to the server
 * for data collection later.
 * 
 * This project is mostly written in Svelte, however this library was written in React. This does add a little bit 
 * of overhead, but it is well worth it for the addition of the canvas drawing.
 * 
 * Documentation for the conversion to SVG can be found here: 
 * https://docs.excalidraw.com/docs/@excalidraw/excalidraw/api/utils/export
*/
export function Draw() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

    return (
      <>
        <div style={{ height: "500px", backgroundColor: "green" }}>
          <Excalidraw ref={(api) => setExcalidrawAPI(api)}/>
        </div>
        
        <div className="flex items-center justify-center mt-9">
          <button className="text-xl px-8 text-white bg-lapiz-blue rounded-md" onClick={async () => {
            const elements = excalidrawAPI.getSceneElements();
            const svg = await exportToSvg({
              elements,
              appState: {
                exportWithDarkMode: false
              },
              files: excalidrawAPI.getFiles()
            })
            console.log(svg);
          }}>SUBMIT!</button>
        </div>
        
      </>
    );
  }