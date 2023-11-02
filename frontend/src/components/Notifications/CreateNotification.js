import { useEffect,useState } from "react";
import Forms from "../Inputform/Forms";
import getAllUserWithoutskip from "../../api_strings/admin/getallUserWithoutskip";
import Createnotification_api from "../../api_strings/admin/createNotification_api";
import Backbutton from "../Backbutton";

function CreateNotification({onCreateSuccess}){
    const[userArr,setuserArr] = useState([]);

    const onSubmit = (formData) => {
        const {title,content,data,recipients} = formData;
        const recipientsArray = Object.values(recipients);
        Createnotification_api(title,content,data,recipientsArray,(error,res) => {
            if(error){
                alert("Unable to push notification")
            }
            else{
                onCreateSuccess(res.data);
                alert("Successfully pushed notification")
            }
        })


    }

    useEffect(() => {
        getAllUserWithoutskip((error, res) => {
            if (error) {
              console.log("Error:", error);
            } else {
                const users = res.data.map((user) => ({
                    name: `${user.firstName} ${user.lastName}`,
                    id:user._id
                }))
                setuserArr(users);
            }
          });
    },[])

    return(
        <>
        <Backbutton />
        <div className="w-full">
            <Forms
                fields={
                    [
                        {
                            name:"title",
                            label:"Title",
                            type:"Input"
                        },
                        {
                            name:"content",
                            label:"Content",
                            type:"Input"
                        },
                        {
                            name:"data",
                            label:"Module",
                            type:"Select",
                            options:[
                                {name:"dashboard",id:"dashboard"},
                                {name:"users",id:"users"},
                                {name:"leads",id:"leads"},
                                {name:"roles",id:"roles"},
                                {name:"support",id:"support"},
                                {name:"notification",id:"notification"}
                            ],
                            
                            selectionMode: "single"
                        },
                        {
                            name:"recipients",
                            label:"Add Participants",
                            type:"Select",
                            options:userArr,
                            selectionMode: "multiple"
                        },
                        
                    ]}
                    
                    
                selectionModeProps= "multiple"
                onSubmit={onSubmit}
            />
        </div>
        </>
    )
}

export default CreateNotification;