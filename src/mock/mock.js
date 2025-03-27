export const CLASSIFICATIONS = [
  { value: "finance", label: "Финансы" },
  { value: "food", label: "Продовольствие" },
  { value: "improvement", label: "Благоустройство" },
  { value: "transport", label: "Транспорт" },
  { value: "charity", label: "Благотворительность" },
  { value: "health_care", label: "Здравоохранение" },
  { value: "city_government", label: "Городское управление" },
  { value: "construction", label: "Строительство" },
  { value: "education", label: "Образование" },
  { value: "culture", label: "Культура" },
  { value: "industry", label: "Промышленность" },
  { value: "trading", label: "Торговля" },
  { value: "legal", label: "Юридический" },
];

export const PAGE_SIZE = 10;

export const MEETING_TYPES = [
  { value: "ongoing", label: "Текущее" },
  { value: "closed", label: "Закрытое" },
];

export const PRESIDING_LIST = [
  "Анфиногенов И.К.",
  "Сидоров П.П.",
  "Козлов В.Н.",
  "Иванов А.А.",
];

export const meetings = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  date: `2024-04-${String(i + 1).padStart(2, "0")}`,
  title: `Заседание №${i + 1}`,
  classification: CLASSIFICATIONS[i % CLASSIFICATIONS.length].value,
  protocolNumber: i + 1,
  meetingType: MEETING_TYPES[i % MEETING_TYPES.length].value,
  deputies: 10 + (i % 20),
  presiding: PRESIDING_LIST[i % PRESIDING_LIST.length],
}));
