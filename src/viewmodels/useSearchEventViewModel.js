import { useState, useEffect } from "react";

export const useSearchEventViewModel = (events) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);

    useEffect(() =>{
        if (!search){
            setFilter(events)
            return;
        }

        const filter = events.filter((event) =>
            event.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilter(filter);
    }, [search, events]);


    return{
        search,
        setSearch,
        filter
    }
}