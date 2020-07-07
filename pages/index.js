import Head from 'next/head';
import React, { useEffect } from 'react';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getUsersData } from '../lib/users';
import Date from '../components/date';
import Article from './Article';

export default function Home({ allPostsData, allUsersData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>
          .)
        </p>
      </section>
      <Article />
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                {title}
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
