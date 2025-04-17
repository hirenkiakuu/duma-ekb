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

  return (
    <>
      {/* вынести стили */}
      <div
        style={{
          maxWidth: 1200,
          margin: "20px auto",
          padding: 20,
          minHeight: "100vh",
        }}
      >
        <div>
          <Title level={3}>Поиск заседаний</Title>

          {/* Классификация */}
          <Select
            placeholder="Авторская классификация"
            style={{ width: "100%", marginBottom: 10 }}
            allowClear
          >
            <Option value="">option</Option>
          </Select>

          {/* Ключевые слова - пока инпут */}
          <Input
            placeholder="Ключевые слова"
            style={{ width: "100%", marginBottom: 10 }}
          />

          {/* Фильтр по председательствующему */}
          <Select
            placeholder="Председательствующий"
            style={{ width: "100%", marginBottom: 10 }}
            allowClear
          >
            <Option value="">option</Option>
          </Select>

          {/* Поиск по вопросу */}
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              type="number"
              placeholder="Номер дела"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <Input
              type="number"
              placeholder="Номер протокола"
              style={{ width: "100%", marginBottom: 10 }}
            />
            <Input
              type="number"
              placeholder="Номер вопроса"
              style={{ width: "100%", marginBottom: 10 }}
            />
          </div>

          {/* Выбор диапазона дат */}
          <RangePicker
            format="YYYY-MM-DD"
            style={{ width: "100%", marginBottom: 10 }}
          />
        </div>
        {isLoading ? (
          <div className={styles["spin-container"]}>
            <Spin />
          </div>
        ) : (
          <List
            bordered
            dataSource={data}
            renderItem={(meeting) => (
              <MeetingCard meeting={meeting} key={meeting.id} />
            )}
          />
        )}
      </div>
    </>
  );
}
