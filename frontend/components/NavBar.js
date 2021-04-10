import Link from 'next/link'


function NavBar() {
    return (
      <nav>
        <Link href='/'>
          MYPY
        </Link>
        <div>
          <button>Login</button>
          <button>Profile</button>
        </div>
      </nav>
    )
}


export default NavBar;
