"use client";
import { useRef , useEffect} from "react";
import {useMedia} from 'react-use';

import "./Carousel.scss";
import Card from "@/app/components/Card";

export default function Carousel({ data }) {
  const refTrack = useRef();
  let curPos = 0;

  const isWide = useMedia('(min-width: 1280px)');

  useEffect(() => {
    refTrack.current.style.left = `0px`;
  }, [isWide]);

  const moveLeft = () => {
    let cardsOnScreen = isWide? 3 : 1;
    if (curPos + cardsOnScreen < data.length) {
      curPos++;
      if(isWide){
        const newLeft = curPos * -345;
        refTrack.current.style.left = `${newLeft}px`;
      }else{
        const newLeft = curPos * -322;
        refTrack.current.style.left = `${newLeft}px`;
      }
      
    }
  };
  const moveRight = () => {
    if (curPos != 0) {
      curPos--;
      if(isWide){
        const newLeft = curPos * -345;
        refTrack.current.style.left = `${newLeft}px`;
      }else{
        const newLeft = curPos * -322;
        refTrack.current.style.left = `${newLeft}px`;
      }
    }
  };
  return (
    <div className="carousel xl:w-[1035px]">
    
      <h2 className="font-bold text-2xl">{data.title}</h2>
           
      <div className="relative h-[440px] flex justify-center xl:block">
        <div className="mask xl:w-[1035px] w-[310px]">
          <div ref={refTrack} className="track">
            {data?.items?.map((seed) => (
              <Card
                key={seed.name}
                data={seed}
              />
            ))}
          </div>
        </div>
        <span className="material-symbols-outlined cursor-pointer left-[-100px] xl:left-[-75px] top-[150px]" onClick={moveRight}>
            arrow_left
        </span>
        <span className="material-symbols-outlined cursor-pointer left-[110px] xl:left-[857px] top-[150px]" onClick={moveLeft}>
            arrow_right
        </span>
      </div>
    </div>
  );
}
