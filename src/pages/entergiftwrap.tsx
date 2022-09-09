import * as React from 'react';

const EnterGiftWrap = () => {
    let [ chgBtn, setChgBtn ] = React.useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!chgBtn) {
            setChgBtn(true)
        } else {
            setChgBtn(false)
        }
    }


    return (
        <div className="flex justify-center mt-10">
            <div className="flex flex-col p-12 border-2 border-black">
                <div className="flex flex-col text-center">
                    <label>Please enter the gift wrap serial number</label>
                    <input name="giftwrap_id" type="text" />
                </div>
                <div className="flex flex-col text-center">
                    <label>I have this gift wrap now:</label>
                    <div>
                        <button onClick={handleClick} className={chgBtn ? "bg-blue-200 p-2 m-2" : "bg-red-200 p-2 m-2"}>Yes</button>
                        <button onClick={handleClick} className="bg-blue-200 p-2 m-2">No</button>
                    </div>
                </div>
                { chgBtn ? (
                    <>
                        <div className="flex flex-col text-center">
                            <label>My current Zip Code is:</label>
                            <input name="zipcode" type="text" />
                        </div>
                    </>
                ) : (
                    <><div>dddddddddddddddd</div></>
                )}
            </div>
        </div>
    )
}

export default EnterGiftWrap