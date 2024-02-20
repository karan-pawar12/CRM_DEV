import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import CreateTicket from './CreateTicket'
import TicketDeails from "./TicketDetails";
import TicketTable from './TicketTable';
import getAllTicket_api from "../../api_strings/admin/getAllTicket_api";

function Ticket() {
  const query = useQuery();
  const [tickets, setTickets] = useState([]);
  const [count, settotalCount] = useState(1)
  const [userNames, setUserNames] = useState([])
  const [filter, setFilter] = useState({
    searchQuery: undefined,
    type: undefined,
    priority:undefined,
    status: undefined,
    createdAt: [],

  });
  const skip = useRef(0);
  const limit = useRef(10);

  console.log(userNames);

  useEffect(() => {
    getAllTicket();
  }, [filter])


  function getAllTicket() {
    getAllTicket_api({ skip: skip.current, limit: limit.current, searchQuery: filter.searchQuery, type: filter.type, priority: filter.priority, status: filter.status, createdAt:filter.createdAt}, (error, res) => {
      if (error) {
        console.log("Error:", error);
      }
      else {
        setUserNames(res.data.users);
        setTickets(res.data.tickets);
        settotalCount(res.data.totalCount);
      }
    })
  }

  function onPageChange(pageNumber) {
    skip.current = (pageNumber - 1) * limit.current;
    getAllTicket();
  }

  function onCreateSuccess(newlyCreatedData) {
    setTickets(old => [newlyCreatedData, ...old]);
  }

  function onUpdateSuccess(data) {
    setTickets(old => {
      let temp = JSON.parse(JSON.stringify(old));
      for (let i = 0; i < temp.length; i++) {
        if (data._id == temp[i]._id) {
          temp[i] = data;
          break;
        }
      }
      return temp;

    });
  }

  return <>
    <div hidden={query.get("id") === "" || !query.get("id") ? false : true}>
      <TicketTable onPageChange={onPageChange} tickets={tickets} setTickets={setTickets} count={count} settotalCount={settotalCount} onUpdateSuccess={onUpdateSuccess} userNames={userNames} setUserNames={setUserNames} filter={filter} setFilter={setFilter} />
    </div>

    {(query.get("id") === "new") ? <CreateTicket onCreateSuccess={onCreateSuccess} /> : (query.get("id") !== null && query.get("id") !== "") && <TicketDeails onUpdateSuccess={onUpdateSuccess} />}

  </>

}

export default Ticket;

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}