import Link from 'next/link';
import * as React from 'react';
import { getDocs, setDoc, doc } from 'firebase/firestore';
import { createCollection } from 'firebaseConfig';
import { Inputs } from '@/types';
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from "react-hook-form";

const EnterGiftWrap = () => {
    let [chgBtn, setChgBtn] = React.useState(true)
    const [zipcode, setZipcode] = React.useState("")
    const [giftwrap, setGiftwrap] = React.useState("")
    const [memo, setMemo] = React.useState("")
    let [point, setPoints] = React.useState(1)
    const [nextPanel, setNextPanel] = React.useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>();


    const intialValues = {
        giftwrap_id: "",
        zipcode: "",
        memo: "Leave a nice note...",
        coordinates: {
            lat: 0,
            lng: 0
        }
    };

    const router = useRouter()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        if (event.currentTarget.id == "yesBTN" && chgBtn == false) {
            if (chgBtn) {
                setChgBtn(false)
            } else {
                setChgBtn(true)
            }
        } else if (event.currentTarget.id == "noBTN" && chgBtn == true) {
            if (chgBtn) {
                setChgBtn(false)
            } else {
                setChgBtn(true)
            }
        }

    }

    // const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //     switch (e.currentTarget.name) {
    //         case "giftwrap_id":
    //             setGiftwrap(e.currentTarget.value)
    //             break;
    //         case "zipcode":
    //             setZipcode(e.currentTarget.value)
    //             break;
    //         case "memo":
    //             setMemo(e.currentTarget.value)
    //         default:
    //             return
    //     }
    // }

    /**
     * Retrieves input data from a form and returns it as a JSON object.
     * @param  {HTMLFormControlsCollection} elements  the form elements
     * @return {Object}                               form data as an object literal
     */
    const submitData = () => {
        console.log("SUBMIT!!")

    }


    // Sets form data into Firestore
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(JSON.stringify(data))
        
        // fetch('/api/giftwrap', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         zipcode,
        //         giftwrap,
        //         memo,
        //         point
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then((res) => {
        //     if (res.ok) router.push({
        //         pathname: "/giftwrap/[id]/",
        //         query: { id: giftwrap }
        //     })
        // })
    }



    const changePanel = () => {
        { nextPanel ? setNextPanel(false) : setNextPanel(true) }
    }

    return (
        <div className="flex justify-center mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                {!nextPanel ? (
                    <div className="flex flex-col p-12 border-2 border-black">
                        <div className="flex flex-col text-center">
                            <label htmlFor="giftwrap_id">Please enter the gift wrap serial number</label>
                            <input
                                maxLength={15}
                                type="text"
                                defaultValue={intialValues.giftwrap_id}
                                {...register("giftwrap_id")}
                            />
                        </div>
                        <div className="flex flex-col text-center">
                            <label>I have this gift wrap now:</label>
                            <div>
                                <button id="yesBTN" onClick={handleClick} className={chgBtn ? "bg-blue-200 p-2 m-2 border-2 border-blue-400" : "bg-white p-2 m-2 border-2 border-black"}>Yes</button>
                                <button id="noBTN" onClick={handleClick} className={chgBtn ? "bg-white p-2 m-2 border-2 border-black" : "bg-blue-200 p-2 m-2 border-2 border-blue-400"}>No</button>
                            </div>
                        </div>
                        {chgBtn ? (
                            <>
                                <div className="flex flex-col text-center">
                                    <label htmlFor="zipcode">My current Zip Code is:</label>
                                    <input
                                        defaultValue={intialValues.zipcode}
                                        type="text"
                                        maxLength={5}
                                        {...register("zipcode", {
                                            validate: {
                                                fiveLng: (value) => value.length === 5
                                            }
                                        })}
                                    />
                                    {errors.zipcode && errors.zipcode.type === "fiveLng" && (
                                        <p>You're zipcode should be 5 digits long</p>
                                    )}
                                </div>


                                <div className="flex flex-col text-center mx-auto">
                                    <button className='border-2 border-green-400 bg-green-200 px-2 my-3 w-fit' onClick={changePanel}>Continue {" >> "}</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p>GO GET YOURSELF A GET-A-GIFTWRAP:{" "}
                                        <a className="underline text-blue-500" href="https://www.baba-bags.com/product-page/gold-baba-gift-wrap-gold" target="_blank">GET-A-GIFTWRAP</a>
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col p-12 border-2 border-black">
                        <div className="flex flex-col text-center">
                            <label htmlFor="memo">Leave A Short Message For The Recipient:</label>
                            <input
                                maxLength={60}
                                type="text"
                                defaultValue={intialValues.memo}
                                {...register("memo")}
                            />
                        </div>
                        <div className="flex flex-col text-center mx-auto">
                            <button className='border-2 border-red-400 bg-red-200 px-2  my-3 w-fit' onClick={changePanel}>Back {" << "}</button>
                        </div>
                        <div className="flex flex-col text-center mx-auto">
                            <input value="Submit" type="submit" className='border-2 border-green-400 bg-green-200 px-2 my-3 w-[70px]' />
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default EnterGiftWrap