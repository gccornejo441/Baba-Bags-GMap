import * as React from 'react';
import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <div className="py-12 bg-white text-black ">
        <div className="mt-5 md:mt-0 md:col-span-2 mx-auto  w-1/2 flex justify-center">
          <div className='border-2 border-black m-10 text-center'>
            <p>I have a Baba Gift Wrap, and I want to see where it has been.</p>
            <Link href="/entergiftwrap">
              <button className='bg-yellow-500 p-3'>Click Me</button>
            </Link>
          </div>
          <div className='border-2 border-black m-10 text-center'>
            <p>I want to enter and track my own Baba Gift Wrap.</p>
            <Link href="/">
              <button className='bg-yellow-500 p-3'>Click Me</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
