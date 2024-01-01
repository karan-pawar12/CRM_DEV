import React,{useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import NotificationTable from './NotificationTable';
import CreateNotification from './CreateNotification';
import getAllNotification_api from '../../api_strings/admin/getAllNotification';

function Notification() {
    const query = useQuery();
    const [notifications,setNotifications] = useState([]);
    const [count,settotalCount] = useState(1)
    const skip = useRef(0);
    const limit = useRef(10);

    useEffect(() => {
        getAllNotification();
    },[]);

    function getAllNotification() {
        getAllNotification_api({skip:skip.current,limit:limit.current},(error,res) => {
            if(error){
                console.log("Error",error);
            }else{
                setNotifications(res.data.notifications);
                settotalCount(res.data.totalCount);
            }
        })
    }
    
    function onPageChange(pageNumber){
        skip.current = (pageNumber-1) * limit.current;
        getAllNotification();
      }
    
    
      function onCreateSuccess(newlyCreatedData){
        setNotifications(old=>[newlyCreatedData,...old]);
      }
    


    return (
        <>
            <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
                <NotificationTable notifications={notifications} setNotifications={setNotifications} count={count} onPageChange={onPageChange}/>
            </div>

            {(query.get("id") === "new") ?  <CreateNotification  onCreateSuccess={onCreateSuccess}/>: ""}
        </>
    )
}

export default Notification;

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}