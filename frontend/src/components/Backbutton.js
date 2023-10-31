import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import {AiOutlineArrowLeft} from 'react-icons/ai'
function Backbutton(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    }
    return(
        <Button isIconOnly onClick={handleClick}>
            <AiOutlineArrowLeft />
        </Button>
    )
}
export default Backbutton;