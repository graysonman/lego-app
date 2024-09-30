import React, { useState } from 'react';
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import { LegoProps } from "../components/Lego"
import prisma from "../lib/prisma"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.lego.findMany({
    where: { 
      id:{not: undefined}
     },
     orderBy: {
      id: 'asc', 
    },
    select: {
      id: true,
      name: true,
      piece: true,
      img: true,
    }
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: LegoProps[]
}

const LegosList: React.FC<Props> = (props) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFeed = props.feed.filter(
    (lego) =>
      lego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lego.id.toString().includes(searchTerm)
  );

  return (
    <Layout>
      <div className="page">
        <h1>Lego Star Wars Sets</h1>
        <div>
          <input
            type="text"
            placeholder="Search by ID or name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <main>
          {filteredFeed.map((lego) => (
            <div key={Number(lego.id)} className="post">
              <h2>{lego.name}</h2>
              <p>Pieces: {lego.piece}</p>
              <img src={lego.img.toString()} alt={lego.name.toString()} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        img {
          max-width: 20%;
          height: auto;
        }
      `}</style>
    </Layout>
  )
}

export default LegosList
