import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="navHeader">
      <h1 className="container">
        <Link href="/">Todo list app</Link>
      </h1>
    </nav>
  );
};

export default Nav;
