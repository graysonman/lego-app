import React, { useState } from 'react';
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { LegoProps } from "../components/Lego";
import prisma from "../lib/prisma";

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

  const filteredFeed = props.feed.filter(
    (lego) =>
      lego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lego.id.toString().includes(searchTerm)
  );

  return (
    <Layout>
      <div className="page">
        <h1>Lego Star Wars Sets</h1>
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
            {/* Wishlist component goes here */}
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