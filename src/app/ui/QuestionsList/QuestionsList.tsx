"use server";

import { List, Card, Divider, Typography, Tag } from "antd";
import { Question } from "@/app/lib/models/meeting.interface";

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
};

export default async function QuestionsList({
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
            <Text strong>Описание: </Text>
            <Text>{question.description}</Text>
            <Divider />

            <Text strong>Наличие кворума: </Text>
            <Text>{question.quorum ? "Да" : "Нет"}</Text>
            <br />

            <Text strong>Позиция 1870: </Text>
            <Text>{question.position1870}</Text>
            <br />

            <Text strong>Позиция 1892: </Text>
            <Text>{question.position1892}</Text>
            <br />

            <Text strong>Классификация автора: </Text>
            <Text>
              {classificationsTranslations[question.authorClassification] ||
                question.authorClassification}
            </Text>
            <br />

            <Text strong>Решение: </Text>
            <Text>{question.solution}</Text>
            <br />

            <Text strong>Содержание решения: </Text>
            <Text>{question.solutionContent}</Text>
            <br />

            <Text strong>Номер дела: </Text>
            <Text>{question.caseNumber}</Text>
            <br />

            <Text strong>Номера листов: </Text>
            <Text>{question.sheetNumbers}</Text>
            <br />

            <Text strong>Теги: </Text>
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
