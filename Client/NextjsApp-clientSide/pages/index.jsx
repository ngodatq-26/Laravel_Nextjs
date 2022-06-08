
import { useRouter } from 'next/router'
import React from 'react';
import HomePage from './Home';

export default function Home() {

  const router = useRouter();

  return (
    <HomePage />
  )
}

