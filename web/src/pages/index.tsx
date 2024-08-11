import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';

const Home = () => (
  <div className="App">
    <Link href='/login'>
      <Button type="primary">Login</Button>
    </Link>
  </div>
);

export default Home;