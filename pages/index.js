import Head from 'next/head';

import withAuthContext, { useAuthContext, SET_USER } from '../contexts/AuthContext'

const Home = () => {

  return (
    <div className="container">
      <Head>
        <title>Budget Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          BudgetTracker
        </h1>
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </main>

      <style jsx>{`
        .title {
          text-align: center;
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  )
};

export default Home;
