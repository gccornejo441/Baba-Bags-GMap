import * as React from 'react';
import { Inputs } from '@/types';
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const GetMap = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();
    const intialValues = { giftwrap_id: "" };

    const router = useRouter()

    // Sets form data into Firestore
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { giftwrap_id } = data

        fetch(`/api/giftwrap/${giftwrap_id}`, {
            method: 'POST',
            body: JSON.stringify({
                giftwrap_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) router.push({
                pathname: "/giftwrap/[id]/",
                query: { id: giftwrap_id }
            })
        })
    }


    return (
        <>
          <Link href="/">
                <Button variant="gradient">Back Home</Button>
            </Link>
            <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col text-center">
                    <label htmlFor="giftwrap_id">Please enter the gift wrap serial number</label>
                    <input
                        maxLength={15}
                        type="text"
                        defaultValue={intialValues.giftwrap_id}
                        {...register("giftwrap_id", {
                            validate: {
                                noLessThanthree: (value) => value.length > 3
                            }
                        })}
                    />
                    {errors.giftwrap_id && errors.giftwrap_id.type === "noLessThanthree" && (
                        <p
                            className="text-red-500"
                        >
                            Serial number should be __ long.
                        </p>
                    )}
                </div>
                <div className="flex flex-col text-center mx-auto">
                    <input value="Submit" type="submit" className='border-2 border-green-400 bg-green-200 px-2 my-3 w-[70px]' />
                </div>
            </form>
        </div>
        </>
    )
}

export default GetMap;