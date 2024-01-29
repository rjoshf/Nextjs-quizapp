import Link from 'next/link'

import Header from '@/components/Header'


export default function Home() {
  return (
    <>
    <Header></Header>
    <Link href="/about">About us</Link>
    </>
  );
}
