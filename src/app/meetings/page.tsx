"use client"; // reconsider this page

import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { List, Pagination, Typography, Select, Input, DatePicker } from "antd";
import Link from "next/link";
import dayjs from "dayjs"; // временно установил, может быть нужды не будет
import styles from "./page.module.css";

import {
  PAGE_SIZE,
  CLASSIFICATIONS,
  MEETING_TYPES,
  PRESIDING_LIST,
  meetings,
} from "../../utils/mock";

const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRange, setSelectedRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);
  const [selectedClassification, setSelectedClassification] = useState<
    string | null
  >(null);
  const [selectedMeetingType, setSelectedMeetingType] = useState<string | null>(
    null
  );
  const [minDeputies, setMinDeputies] = useState<number | null>(null);
  const [selectedPresiding, setSelectedPresiding] = useState<string | null>(
    null
  );

  // Фильтруем заседания (надо будет переделать)
  const filteredMeetings = meetings.filter((meeting) => {
    const meetingDate = dayjs(meeting.date);
    return (
      (!selectedRange[0] ||
        !selectedRange[1] ||
        (meetingDate.isAfter(selectedRange[0].startOf("day")) &&
          meetingDate.isBefore(selectedRange[1].endOf("day")))) &&
      (!selectedClassification ||
        meeting.classification === selectedClassification) &&
      (!selectedMeetingType || meeting.meetingType === selectedMeetingType) &&
      (!minDeputies || meeting.deputies >= minDeputies) &&
      (!selectedPresiding || meeting.presiding === selectedPresiding) &&
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginatedMeetings = filteredMeetings.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  // раздробить на компоненты
  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}>
      <Title level={3}>Поиск заседаний</Title>

      <div className={styles.toolbar}>
        {/* Классификация вопроса */}
        <Select
          placeholder="Классификация"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(value) => setSelectedClassification(value)}
          allowClear
        >
          {CLASSIFICATIONS.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.label}
            </Option>
          ))}
        </Select>

        {/* Поле поиска */}
        <Input
          placeholder="Введите название заседания"
          style={{ width: "100%", marginBottom: 10 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Фильтр по типу заседания */}
      <Select
        placeholder="Тип заседания"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(value) => setSelectedMeetingType(value)}
        allowClear
      >
        {MEETING_TYPES.map((type) => (
          <Option key={type.value} value={type.value}>
            {type.label}
          </Option>
        ))}
      </Select>

      {/* Фильтр по количеству гласных */}
      <Input
        type="number"
        placeholder="Минимальное количество гласных"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(e) => setMinDeputies(Number(e.target.value) || null)}
      />

      {/* Фильтр по председательствующему */}
      <Select
        placeholder="Председательствующий"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(value) => setSelectedPresiding(value)}
        allowClear
      >
        {PRESIDING_LIST.map((name) => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>

      {/* Выбор диапазона дат */}
      <RangePicker
        format="YYYY-MM-DD"
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(dates) =>
          setSelectedRange(dates as [dayjs.Dayjs | null, dayjs.Dayjs | null])
        }
      />

      {/* 🔹 Список заседаний */}
      <List
        bordered
        dataSource={paginatedMeetings}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/meetings/${item.id}`}>
              {item.date} - {item.title} (
              {MEETING_TYPES.find((t) => t.value === item.meetingType)?.label},{" "}
              {item.deputies} гласных, председатель: {item.presiding})
            </Link>
          </List.Item>
        )}
      />

      {/* Пагинация */}
      {filteredMeetings.length > PAGE_SIZE && (
        <Pagination
          current={currentPage}
          total={filteredMeetings.length}
          pageSize={PAGE_SIZE}
          onChange={handlePageChange}
          style={{ marginTop: 20, textAlign: "center" }}
        />
      )}
    </div>
  );
}
