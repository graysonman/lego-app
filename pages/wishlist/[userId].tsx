import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { LegoProps } from '../../components/Lego';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: { id: String(params?.userId) },
    include: { sets: true, user: true },
  });
  return { props: { wishlist } };
};

type Props = {
  wishlist: {
    sets: LegoProps[];
    user: { name: string };
  };
};

const WishlistPage: React.FC<Props> = ({ wishlist }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  if (!wishlist) {
    return (
      <Layout>
        <div className="page">
          <h1>Wishlist not found</h1>
        </div>
      </Layout>
    );
  }

  const filteredWishlist = wishlist.sets.filter(
    (lego) =>
      lego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lego.id.toString().includes(searchTerm)
  );

  return (
    <Layout>
      <div className="page">
        <h1>{wishlist.user.name}'s Wishlist</h1>
        <input
          type="text"
          placeholder="Search by ID or name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          {filteredWishlist.map((lego) => (
            <div key={Number(lego.id)} className="post">
              <h2>{lego.name}</h2>
              <p>Pieces: {lego.piece}</p>
              <img src={lego.img.toString()} alt={lego.name.toString()} />
            </div>
          ))}
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
      </div>
    </Layout>
  );
};

export default WishlistPage;