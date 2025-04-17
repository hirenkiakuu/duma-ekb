import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Meeting } from "../models/meeting.interface";

export const useMeeting = (id: string | string[]) => {
  return useQuery({
    queryKey: ["meeting", id],
    queryFn: async () => {
      const res = await axios.get<Meeting>(
        `http://localhost:8000/api/meetings/${id}`
      );
      return res.data;
    },
    enabled: !!id, // запрос не будет выполнен, пока нет id
  });
};
