import fetch from 'node-fetch';

export async function getUsersData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}
