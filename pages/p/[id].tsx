import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import prisma from '../../lib/prisma';
import { LegoProps } from "../../components/Lego"

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const lego = await prisma.lego.findUnique({
    where: {
      id: String(params?.id),
    },
    select: {
      id: true,
      name: true,
      piece: true,
      img: true,
    }
  });
  return {
    props: lego,
  };
};

const lego: React.FC<LegoProps> = (props) => {
  let title = lego.name
  let setImage = lego.img
  let setPieces = lego.piece
  let setId = lego.id

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <h3>{setPieces}</h3>
        <h3>{setId}</h3>
        <img>src={setImage}</img>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default lego
