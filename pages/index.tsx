import React, { useState } from 'react';
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { LegoProps } from "../components/Lego";
import prisma from "../lib/prisma";
import Link from 'next/link';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.lego.findMany({
    where: { id: { not: undefined } },
    orderBy: { id: 'asc' },
    select: { id: true, name: true, piece: true, img: true },
  });
  return { props: { feed }, revalidate: 10 };
};

type Props = { feed: LegoProps[] };

const LegosList: React.FC<Props> = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setUser(data);
  };

  const handleRegister = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await res.json();
    setUser(data);
  };

  const handleCreateWishlist = async () => {
    if (!user) return;
  
    const res = await fetch('/api/wishlist/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id }),
    });
  
    if (res.ok) {
      alert('Wishlist created successfully!');
    } else {
      alert('Failed to create wishlist.');
    }
  };

  const handleAddToWishlist = async (setId) => {
    if (!user) return;
  
    const res = await fetch(`/api/wishlist/${user.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ setId }),
    });
  
    if (res.ok) {
      alert('Lego set added to wishlist!');
    } else {
      alert('Failed to add Lego set to wishlist.');
    }
  };

  const filteredFeed = props.feed.filter(
    (lego) =>
      lego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lego.id.toString().includes(searchTerm)
  );

  return (
    <Layout>
      <div className="page">
        <h1>Lego Star Wars Sets Wishlist</h1>
        {!user ? (
          <div>
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        ) : (
          <div>
              <h2>Welcome, {user.name}</h2>
              <button onClick={() => setUser(null)}>Logout</button>
              <h2>Your Wishlist</h2>
              <button onClick={handleCreateWishlist}>Create Wishlist</button>
              <Link href={`/wishlist/${user.id}`}>
                <a>Go to Wishlist</a>
              </Link>
          </div>
        )}
        <div>
          <h2>Search for Lego Sets</h2>
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
              <button onClick={() => handleAddToWishlist(lego.id)}>Add to Wishlist</button>
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
  );
};

export default LegosList;