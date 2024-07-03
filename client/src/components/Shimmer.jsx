import React from "react";
import { ShimmerPostItem } from "react-shimmer-effects";

export default function Shimmer() {
    return (
      <div className="h-[100%] w-[100%] flex flex-wrap p-2">
        <div className="shimDim"><ShimmerPostItem card title text cta imageType="thumbnail" /></div>
        <div className="shimDim"><ShimmerPostItem card title text cta imageType="thumbnail" /></div>
        <div className="shimDim"><ShimmerPostItem card title text cta imageType="thumbnail" /></div>
        <div className="shimDim"><ShimmerPostItem card title text cta imageType="thumbnail" /></div>  
      </div>
    );
  
}