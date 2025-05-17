"use client"; // надо подумать как компоненты серверные выстроить, если это вообще возможно

// children will be removed in next version, check items

// разбить на компоненты?

import { Typography, Select, Input, DatePicker, List, Spin } from "antd";
import MeetingCard from "./ui/MeetingCard/MeetingCard";
import { useMeetings } from "./lib/hooks/useMeetings";
import styles from "./MeetingsPage.module.css";

const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function MeetingsPage() {
  const { data, isLoading } = useMeetings();
  console.log(data);

  return (
    <>
      <div className={styles["meetings-page-container"]}>
        <div className={styles["filter-panel"]}>
          <Title level={3}>Поиск заседаний</Title>

          {/* Классификация */}

          <Select placeholder="Авторская классификация" allowClear>
            <Option value="">option</Option>
          </Select>

          {/* Ключевые слова - пока инпут */}
          <Input placeholder="Ключевые слова" className={styles["filter"]} />

          {/* Фильтр по председательствующему */}
          <Select placeholder="Председательствующий" allowClear>
            <Option value="">option</Option>
          </Select>

          {/* Поиск по вопросу */}
          <div style={{ display: "flex", gap: "10px" }}>
            <Input type="number" placeholder="Номер дела" />
            <Input type="number" placeholder="Номер протокола" />
            <Input type="number" placeholder="Номер вопроса" />
          </div>

          {/* Выбор диапазона дат */}
          <RangePicker format="YYYY-MM-DD" />
        </div>
        {isLoading ? (
          <div className={styles["spin-container"]}>
            <Spin />
          </div>
        ) : (
          <List
            bordered
            dataSource={data.items}
            renderItem={(meeting) => (
              <MeetingCard meeting={meeting} key={meeting.id} />
            )}
          />
        )}
      </div>
    </>
  );
}
