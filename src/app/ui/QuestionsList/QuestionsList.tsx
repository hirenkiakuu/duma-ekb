"use client";

import { List, Card, Typography, Tag } from "antd";
import { Question } from "@/app/lib/models/meeting.interface";
import { solutionTranslations } from "@/app/lib/constants/constants";

const { Text } = Typography;

const classificationsTranslations: Record<string, string> = {
  finance: "Финансы",
  food: "Продовольствие",
  improvement: "Благоустройство",
  transport: "Транспорт",
  charity: "Благотворительность",
  health_care: "Здравоохранение",
  city_government: "Городское управление",
  construction: "Строительство",
  education: "Образование",
  culture: "Культура",
  industry: "Промышленность",
  trading: "Торговля",
  legal: "Юридический",
}; // вынести в константы

type CardItem = {
  title: string;
  value: keyof Question;
  render?: (value: any) => React.ReactNode;
};

const config: CardItem[] = [
  { title: "Описание", value: "description" },
  {
    title: "Кворум",
    value: "quorum",
    render: (value: boolean) => (value ? "Да" : "Нет"),
  },
  {
    title: "Положение 1870",
    value: "position1870",
  },
  {
    title: "Положение 1892",
    value: "position1892",
  },
  {
    title: "Авторская классификация",
    value: "authorClassification",
    render: (val: string) => classificationsTranslations[val] || val,
  },
  {
    title: "Решение",
    value: "solution",
    render: (val: string) => solutionTranslations[val] || val,
  },
  {
    title: "Содержание решения",
    value: "solutionContent",
    render: (val: string) => val || "-",
  },
  {
    title: "Номера листов",
    value: "sheetNumbers",
    render: (val: string[]) => val.join(" - "),
  },
];

export default function QuestionsList({
  questions,
}: {
  questions: Question[];
}) {
  return (
    <List
      bordered
      dataSource={questions}
      renderItem={(question: Question) => (
        <List.Item>
          <Card title={`Вопрос №${question.number}`} style={{ width: "100%" }}>
            {config.map((item) => (
              <div key={item.value.toString()}>
                <Text strong>{item.title}: </Text>
                <Text>
                  {item.render
                    ? item.render(question[item.value])
                    : (question[item.value] as string)}
                </Text>
                <br />
              </div>
            ))}

            <Text strong>Ключевые слова: </Text>
            <div style={{ marginTop: 5, marginBottom: 10 }}>
              {question.tags && question.tags.length > 0 ? (
                question.tags.map((tag) => (
                  <Tag key={tag.id} color="purple">
                    {tag.title}
                  </Tag>
                ))
              ) : (
                <Text>—</Text>
              )}
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
