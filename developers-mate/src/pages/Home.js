import React from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
      <main>
          <p>hello</p>
         <Outlet/>
      </main>
  )
}

export default Home;
