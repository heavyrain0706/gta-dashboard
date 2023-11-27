import Head from 'next/head'
import ManagementPage from './management'

export default function Home() {
  return (
    <>
      <Head>
        <title>Test</title>
        <meta name="description" content="test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ManagementPage />
    </>
  )
}
