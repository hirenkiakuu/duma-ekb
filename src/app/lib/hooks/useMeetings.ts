import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Meeting } from "../models/meeting.interface";

export const useMeetings = () => {
  return useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      const res = await axios.get<Meeting[]>(
        "http://localhost:8000/api/meetings/"
      );
      console.log(res);
      return res.data;
    },
  });
};
