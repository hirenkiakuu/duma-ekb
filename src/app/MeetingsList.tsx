import React from "react";
import MeetingCard from "./ui/MeetingCard/MeetingCard";
import { List } from "antd";
interface Props {
  meetings: MeetingItem[]; // изменить модель
}

export default function MeetingsList({ meetings }: Props) {
  if (!meetings || meetings.length === 0) {
    return <p>Ничего не найдено по выбранным фильтрам.</p>;
  }

  return (
    <div>
      <List bordered>
        {meetings.map((meeting) => (
          <MeetingCard meeting={meeting} key={meeting.id} />
        ))}
      </List>
    </div>
  );
}
