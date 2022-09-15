import * as React from 'react';
import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function Home() {

  return (
    <div>
      <div className="py-12 bg-white text-black ">
        <div className="mt-5 md:mt-0 md:col-span-2 mx-auto  w-1/2 flex justify-center">
          <Card className='m-10 text-center'>
            <CardHeader
              variant="gradient"
              color="green"
              className="mb-4 grid h-28 place-items-center">
              <Typography variant="p" color="white">I have a Baba Gift Wrap, and I want to see where it has been.</Typography>
            </CardHeader>
            <Link href="/entergiftwrap">
              <Button color="amber" ripple={true} size="lg">Click Me</Button>
            </Link>
          </Card>
          <Card className='m-10 text-center'>
            <CardHeader
              variant="gradient"
              color="green"
              className="mb-4 grid h-28 place-items-center">
              <Typography variant="p" color="white">I want to enter and track my own Baba Gift Wrap.</Typography>
            </CardHeader>
            <Link href="/getmap">
              <Button color="amber" ripple={true} size="lg">Click Me</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
