import { InfoIcon,CloseIcon } from "../../resources/icons/icons"
function InfoToast({msg,onClose,timer=3000}) {
    return (
        <>
            <div class="fixed bottom-[24px] right-[24px] box-border flex space-x-3 max-w-[600px] min-w-[400px] rounded-lg">

                <div class="absolute mx-2 my-7 pr-28 pl-6 text-blue-400">
                    <InfoIcon />
                </div>

                <div class="w-full flex bg-blue-50 m-30 pt-6 pb-6 pr-7 pl-16 rounded-lg">
                    <h1 class="text-blue-700 font-semibold flex-grow">{msg}</h1>
                    <div class="text-blue-400 flex items-center">

                        <CloseIcon onClick={onClose}/>
                    </div>
                </div>

            </div>
        </>
    )
}

export default InfoToast;