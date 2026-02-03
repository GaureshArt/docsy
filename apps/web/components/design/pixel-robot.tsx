"use client"
import React, { useState, useEffect } from 'react';

const PixelRobot = () => {
    const [isBlinking, setIsBlinking] = useState(false);

    const faceMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, 4000);

        return () => clearInterval(blinkInterval);
    }, []);

    return (
        <div className="flex items-center justify-center p-4 sm:p-6">
            <div className="relative flex items-center justify-center scale-75 sm:scale-90 md:scale-100">

                <div className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="h-2 sm:h-3 w-0.5 bg-black" />
                    <div className="h-1.5 w-2.5 bg-white border-2 border-black rounded-full" />
                </div>

                <div className="relative bg-white p-2 sm:p-3 border-2 sm:border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-lg">

                    <div className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 h-8 sm:h-10 w-3 sm:w-4 bg-white border-2 sm:border-3 border-black border-r-0 rounded-l-md shadow-[-2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-1/2 -translate-y-1/2 left-0.5 h-1 sm:h-1.5 w-1 sm:w-1.5 bg-black rounded-full" />
                    </div>
                    <div className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 h-8 sm:h-10 w-3 sm:w-4 bg-white border-2 sm:border-3 border-black border-l-0 rounded-r-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <div className="absolute top-1/2 -translate-y-1/2 right-0.5 h-1 sm:h-1.5 w-1 sm:w-1.5 bg-black rounded-full" />
                    </div>

                    <div className="relative bg-black p-2 sm:p-3 rounded-md border-2 border-black">
                        <div className="relative grid grid-cols-13 gap-[1px] sm:gap-[1.5px] bg-black p-1 sm:p-1.5 shadow-[inset_0_0_10px_rgba(50,50,50,1)] sm:shadow-[inset_0_0_12px_rgba(50,50,50,1)]">
                            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] sm:bg-[length:100%_2.5px] opacity-80" />

                            {faceMatrix.flat().map((val, i) => {
                                let pixelClass = "h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[1px] transition-all duration-75 ";

                                if (val === 0) {
                                    pixelClass += "bg-neutral-900 opacity-20";
                                } else if (val === 1) {
                                    pixelClass += isBlinking
                                        ? "bg-neutral-800"
                                        : "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9),0_0_12px_rgba(255,255,255,0.5)] sm:shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_16px_rgba(255,255,255,0.5)]";
                                } else if (val === 2) {
                                    pixelClass += "bg-white shadow-[0_0_4px_rgba(255,255,255,0.7)] sm:shadow-[0_0_6px_rgba(255,255,255,0.7)]";
                                }

                                return <div key={i} className={pixelClass} />;
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PixelRobot;