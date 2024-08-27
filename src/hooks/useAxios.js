import axios from "axios";
import { useContext } from "react";
import useSWR from "swr";
import { AuthContext } from "../context/AuthContext";

export function useAxios(url) {
    const { authState } = useContext(AuthContext);

    const {data} = useSWR(url, async url => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        });

        return response.data;
    })

    return { data }
}