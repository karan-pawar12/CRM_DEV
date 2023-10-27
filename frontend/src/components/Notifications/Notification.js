import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import NotificationTable from './NotificationTable';
import CreateNotification from './CreateNotification';
import getAllNotification_api from '../../api_strings/admin/getAllNotification';

function Notification() {
    const query = useQuery();
    const [notification,setNotification] = useState([]);

    useEffect(() => {
        getAllNotification();
    },[]);

    function getAllNotification() {
        getAllNotification_api((error,res) => {
            if(error){
                console.log("Error",error);
            }else{
                setNotification(res.data);
            }
        })
    }   


    return (
        <>
            <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
                <NotificationTable notification={notification} setNotification={setNotification}/>
            </div>

            {(query.get("id") === "new") ?  <CreateNotification  notification={notification} setNotification={setNotification} />: (query.get("id") !== null && query.get("id") !== "") && ""}
        </>
    )
}

export default Notification;

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}