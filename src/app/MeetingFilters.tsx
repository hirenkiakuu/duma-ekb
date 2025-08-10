"use client";
import dayjs from "dayjs";
import React, { ChangeEvent, useCallback } from "react";
import { Typography, Select, Input, DatePicker } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./MeetingsPage.module.css";

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface CurrentFilters {
  classification?: string;
  tags?: string;
  presiding?: string;
  case?: string;
  protocol?: string;
  question_number?: string;
  date_from?: string;
  date_to?: string;
  page?: string;
  per_page?: string;
}

interface MeetingFiltersProps {
  currentFilters: CurrentFilters;
}

export default function MeetingFilters({
  currentFilters,
}: MeetingFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (value === "" || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }

      // При любом изменении фильтра сбрасываем страницу на 1
      newParams.set("page", "1");

      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Обработчик диапазона дат (date_from / date_to)
  const handleDateRange = useCallback(
    (dates: any /* [Moment, Moment] | null  поменять на dayjs */) => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (!dates || dates.length !== 2) {
        newParams.delete("date_from");
        newParams.delete("date_to");
      } else {
        const [from, to] = dates;
        newParams.set("date_from", from.format("YYYY-MM-DD"));
        newParams.set("date_to", to.format("YYYY-MM-DD"));
      }

      newParams.set("page", "1");
      router.replace(`${pathname}?${newParams.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <div className={styles["filter-panel"]}>
      <Title level={3}>Поиск заседаний</Title>
      {/* Авторская классификация */}
      <Select
        placeholder="Авторская классификация"
        allowClear
        defaultValue={currentFilters.classification || undefined}
        onChange={(v) => updateParam("classification", v)}
      >
        <Option value="finance">Финансы</Option>
        <Option value="charity">Благотворительность</Option>
        <Option value="food">Продовольствие</Option>
        <Option value="improvement">Благоустройство</Option>
        <Option value="industry">Промышленность</Option>
        <Option value="transport">Транспорт</Option>
        <Option value="health_care">Здравоохранение</Option>
        <Option value="city_government">Городское управление</Option>
        <Option value="education">Образование</Option>
        <Option value="culture">Культура</Option>
        <Option value="trading">Торговля</Option>
        <Option value="legal">Юридический</Option>
      </Select>

      {/* Ключевые слова */}
      <Input
        allowClear
        placeholder="Ключевые слова"
        defaultValue={currentFilters.tags || ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateParam("tags", e.target.value)
        }
      />
      {/* Председательствующий */}
      <Input
        allowClear
        placeholder="Председательствующий"
        defaultValue={currentFilters.presiding || undefined}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateParam("presiding", e.target.value)
        }
      />
      {/* Номера: дело, протокол, вопрос */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Input
          allowClear
          placeholder="Номер дела"
          defaultValue={currentFilters.case || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateParam("case", e.target.value)
          }
        />

        <Input
          allowClear
          placeholder="Номер протокола"
          defaultValue={currentFilters.protocol || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateParam("protocol", e.target.value)
          }
        />

        <Input
          allowClear
          placeholder="Номер вопроса"
          defaultValue={currentFilters.question_number || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateParam("question_number", e.target.value)
          }
        />
      </div>
      {/* Диапазон дат */}
      <RangePicker
        format="YYYY-MM-DD"
        // как будто это дело можно переделать
        // логика такая: если даты выбраны то календарь отображает их, если не выбраны, то отображает 1980 год
        defaultValue={
          currentFilters.date_from && currentFilters.date_to
            ? [
                dayjs(currentFilters.date_from, "YYYY-MM-DD"),
                dayjs(currentFilters.date_to, "YYYY-MM-DD"),
              ]
            : undefined
        }
        defaultPickerValue={
          currentFilters.date_from && currentFilters.date_to
            ? [
                dayjs(currentFilters.date_from, "YYYY-MM-DD"),
                dayjs(currentFilters.date_to, "YYYY-MM-DD"),
              ]
            : [
                dayjs("1895-01-01", "YYYY-MM-DD"),
                dayjs("1914-02-01", "YYYY-MM-DD"),
              ]
        }
        onChange={handleDateRange}
      />
    </div>
  );
}
