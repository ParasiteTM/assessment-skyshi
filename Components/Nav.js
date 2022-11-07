import Link from 'next/link';

const Nav = () => {
  return (
    <nav className="navHeader" data-cy="header-background">
      <h1 className="container">
        <Link href="/" data-cy="header-title">
          TO DO LIST APP
        </Link>
      </h1>
    </nav>
  );
};

export default Nav;
