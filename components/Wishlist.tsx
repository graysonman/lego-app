import React, { useState, useEffect } from 'react';
import { LegoProps } from './Lego';

type WishlistProps = {
  userId: string;
};

const Wishlist: React.FC<WishlistProps> = ({ userId }) => {
  const [wishlist, setWishlist] = useState<LegoProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await fetch(`/api/wishlist/${userId}`);
      const data = await res.json();
      setWishlist(data.sets);
    };
    fetchWishlist();
  }, [userId]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredWishlist = wishlist.filter(
    (lego) =>
      lego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lego.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <h2>Your Wishlist</h2>
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
  );
};

export default Wishlist;