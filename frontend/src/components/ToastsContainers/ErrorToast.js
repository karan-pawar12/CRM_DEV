import { Button } from "@nextui-org/react";
import { InfoIcon,CloseIcon } from "../../resources/icons/icons"
export default function ErrorToast({ msg, onClose, timer = 3000 }) {

    return (
        <>
            <div class="fixed bottom-[24px] right-[24px] box-border flex space-x-3 max-w-[600px] min-w-[400px] rounded-lg">

                <div class="absolute flex items-center mx-2 my-7 pr-28 pl-6 text-red-600">
                    <InfoIcon />
                </div>

                <div class="w-full flex bg-red-50 m-30 pt-6 pb-6 pr-7 pl-16 rounded-lg">
                    <h1 class="text-red-600 font-semibold flex-grow">{msg}</h1>
                    {/* <div class="text-red-600 flex items-center"> */}

                     <Button isIconOnly className="text-red-600 flex items-center" onClick={() => {onClose()}} ><CloseIcon className=""/></Button>
                    {/* </div> */}
                </div>

            </div>
        </>
    )
}