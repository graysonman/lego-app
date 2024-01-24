import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type LegoProps = {
    id: String;
    name: String;
    piece: number;
    img: String;
}

const legoSet: React.FC<{ lego: LegoProps }> = ({ lego }) => {
    const setName = lego.name ? lego.name : "Unknown Name";
    return (
      <div onClick={() => Router.push("/p/[id]", `/p/${lego.id}`)}>
        <h2>{lego.name}</h2>
        <h3>{lego.piece}</h3>
        <h3>{lego.id}</h3>
        <img>src={lego.img}</img>
        <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
      </div>
    );
  };
  
  export default legoSet;
