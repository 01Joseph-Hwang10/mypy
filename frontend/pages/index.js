import AppList from '@components/AppList';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header>
        <h1>MYPY: Python app everywhere!</h1>
        <h3>MYPY supports python console to make your IPO executable!</h3>
      </header>
      <section>
        <Link href='/create'>Create new app</Link>
        <br></br>
        <AppList />
      </section>
    </div>
  )
}
