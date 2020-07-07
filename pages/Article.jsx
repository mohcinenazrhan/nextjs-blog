import useSWR from 'swr';
import axios from 'axios';
import React, { useState } from 'react';

export default function Article() {
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
      <button type="button" onClick={handleToggle}>
        Toggle display
      </button>

      {isHide && (
        <article>
          <h3>{data.data.title}</h3>
          <p>{data.data.body}</p>
        </article>
      )}
    </>
  );
}
