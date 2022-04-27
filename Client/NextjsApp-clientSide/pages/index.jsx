import Head from 'next/head'
import Image from 'next/image'
import SignInPage from './Login'
import Register from './Register'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React from 'react';
import dynamic from 'next/dynamic'
import HomePage from './Home';

export default function Home() {

  const router = useRouter();

  return (
    <SignInPage />
  )
}
