import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getUsersData } from '../lib/users';
import useSWR from 'swr';
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import Date from '../components/date';

function Article() {
  const [isHide, setIsHide] = useState(false);
  const handleToggle = () => {
    setIsHide(!isHide);
  };
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/posts/1',
    axios
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <button onClick={handleToggle}>Toggle display</button>

      {isHide && (
        <article>
          <h3>{data.data.title}</h3>
          <p>{data.data.body}</p>
        </article>
      )}
    </>
  );
}

export default function Home({ allPostsData, allUsersData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <Article />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Users</h2>
        <ul className={utilStyles.list}>
          {allUsersData.map(({ id, name, username }) => (
            <li className={utilStyles.listItem} key={id}>
              {name}
              <br />
              {id}
              <br />
              {username}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allUsersData = await getUsersData();

  return {
    props: {
      allPostsData,
      allUsersData,
    },
  };
}
