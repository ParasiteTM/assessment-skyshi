import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="navHeader" data-cy="header-background">
      <h1 className="container" data-cy="header-title">
        <Link href="/">Todo list app</Link>
      </h1>
    </nav>
  );
};

export default Nav;
