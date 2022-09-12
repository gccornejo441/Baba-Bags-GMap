import Link from 'next/link';
import * as React from 'react';

const EnterGiftWrap = () => {
    let [chgBtn, setChgBtn] = React.useState(true)
    const [zipcode, setZipcode] = React.useState("")
    const [giftwrap, setGiftwrap] = React.useState("")

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        switch (e.currentTarget.name) {
            case "giftwrap_id":
                setGiftwrap(e.currentTarget.value)
                break;
            case "zipcode":
                setZipcode(e.currentTarget.value)
                break;
            default:
                return
        }
    }

    const PostData = async () => {
        const res = await fetch('/api/zipcodes', {
            method: 'POST',
            body: JSON.stringify({
                zipcode,
                giftwrap
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    /**
     * Retrieves input data from a form and returns it as a JSON object.
     * @param  {HTMLFormControlsCollection} elements  the form elements
     * @return {Object}                               form data as an object literal
     */
    const submitData = () => {
        console.log("SUBMIT!!")
        PostData()
    }


    return (
        <div className="flex justify-center mt-10">
            <div className="flex flex-col p-12 border-2 border-black">
                <div className="flex flex-col text-center">
                    <label>Please enter the gift wrap serial number</label>
                    <input onChange={onChange} name="giftwrap_id" type="text" maxLength={9} />
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
                            <label>My current Zip Code is:</label>
                            <input onChange={onChange} name="zipcode" type="text" maxLength={5} />
                        </div>
                        <div className="flex flex-col text-center mx-auto">
                            <Link href="/">
                                <a className='border-2 border-blue-400 bg-blue-200 px-2  my-3 w-fit'>Continue {" >> "}</a>
                            </Link>
                        </div>
                        <div className="flex flex-col text-center mx-auto">
                            <button onClick={submitData} className='border-2 border-blue-400 bg-blue-200 px-2  my-3 w-fit'>Submit {" >^^< "}</button>
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
        </div>
    )
}

export default EnterGiftWrap