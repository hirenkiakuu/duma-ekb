"use client"; // надо подумать как компоненты серверные выстроить, если это вообще возможно

// children will be removed in next version, check items

// разбить на компоненты?

import {
  Typography,
  Select,
  Input,
  DatePicker,
  List,
  Spin,
  Pagination,
} from "antd";
import MeetingCard from "./ui/MeetingCard/MeetingCard";
import { useMeetings } from "./lib/hooks/useMeetings";
import styles from "./MeetingsPage.module.css";
import { useEffect, useState } from "react";

const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const LOCAL_STORAGE_KEY = "meetings_current_page";

export default function MeetingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isFetching } = useMeetings(currentPage, pageSize);

  console.log(data);

  // возможно стоит переделать логику добавления в localstorage
  useEffect(() => {
    const savedPage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem(LOCAL_STORAGE_KEY, String(page));
  };

  return (
    <>
      <div className={styles["meetings-page-container"]}>
        {/* вынести в отдельный компонент  */}
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
          <>
            {/* Можно добавить spin */}
            <div className={styles["meetings-list-container"]}>
              <List
                bordered
                dataSource={data?.items}
                renderItem={(meeting) => (
                  <MeetingCard meeting={meeting} key={meeting.id} />
                )}
              />
            </div>
            {/* поменять модель Question  */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.totalPages * pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </>
        )}
      </div>
    </>
  );
}
