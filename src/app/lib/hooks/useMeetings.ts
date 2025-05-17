import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Meeting } from "../models/meeting.interface";

interface ServerResponse {
  items: Meeting[];
  total: number;
}

export const useMeetings = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ["meetings", page, perPage],
    queryFn: async () => {
      const res = await axios.get<ServerResponse>(
        `http://localhost:8000/api/meetings/?page=${page}&per_page=${perPage}`
      );
      return res.data;
    },
  });
};
