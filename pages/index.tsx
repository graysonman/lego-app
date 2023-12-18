import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Lego, { LegoProps } from "../components/Lego"
import prisma from "../lib/prisma"
import lego from "../components/Lego"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.lego.findMany({
    where: { 
      id:{not: undefined}
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
  let legoIdInt = Number(lego.id)
  return (
    <Layout>
      <div className="page">
        <h1>List of Sets</h1>
        <main>
          {props.feed.map((lego) => (
            <div key={legoIdInt} className="post">
              <Lego lego={lego} />
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
      `}</style>
    </Layout>
  )
}

export default LegosList
