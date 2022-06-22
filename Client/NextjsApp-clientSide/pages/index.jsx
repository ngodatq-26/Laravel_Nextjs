
import { useRouter } from 'next/router'
import React from 'react';
import HomePage from './Home';

export default function Home() {

  const router = useRouter();

  return (
    <div>redirect...</div>
  )
}

export async function getServerSideProps(context) {
    return {
      redirect: {
        destination: '/Home',
        permanent: false,
      },
    }
}


