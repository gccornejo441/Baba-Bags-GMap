import GMap from '../../../../components/GMap'
import * as React from 'react';
import { useRouter } from 'next/router'
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function Giftwrap() {
    const router = useRouter()

    const { data, error } = useSWR(
        router.query.id ? `/api/giftwrap/${router.query.id}` : null,
        fetcher
    )

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    return (
        <div>
            <div className="py-12 bg-white text-black">
                <Link href="/">
                    <Button variant="gradient">Back Home</Button>
                </Link>
                <GMap
                    mapData={data.mapData}
                />
            </div>
        </div>
    );
}

export default Giftwrap;
