import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/profile">
        <a>Profile</a>
      </Link>
      <Link href="/signup">
        <a>회원가입</a>
      </Link>
    </header>
  );
}

export default Header;
