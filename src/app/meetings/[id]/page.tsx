"use client"; // сделать серверным

import { Typography, List, Card, Divider, Tag, Spin } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMeeting } from "@/app/lib/hooks/useMeeting";
import { Question } from "@/app/lib/models/meeting.interface";
import {
  classificationsTranslations,
  solutionTranslations,
  typesTranslations,
} from "@/app/lib/constants/constants";
import { formatSheetNumber } from "@/app/lib/helpers/formatters";

const { Title, Text } = Typography;

// добавить переводы
export default function MeetingDetails() {
  const params = useParams();
  const id = params?.id ?? "";

  const { data, isLoading, isError } = useMeeting(id);

  console.log(data?.questions[0].sheetNumbers);

  if (isLoading) return <Spin />;
  if (isError || !data) return <div>Ошибка загрузки заседания</div>;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <Title level={2}>
        Заседание от {dayjs(data.date).format("DD.MM.YYYY")}
      </Title>

      <Text strong>Номер протокола: </Text>
      <Text>{data.protocolNumber}</Text>
      <br />

      <Text strong>Тип заседания: </Text>
      <Text>{typesTranslations[data.meetingType]}</Text>
      <br />

      <Text strong>Количество гласных: </Text>
      <Text>{data.deputies}</Text>
      <br />

      <Text strong>Председательствующий: </Text>
      <Text>{data.presiding}</Text>
      <br />

      <Title level={3} style={{ marginTop: 20 }}>
        Вопросы к обсуждению:
      </Title>

      <List
        bordered
        dataSource={data.questions}
        renderItem={(question: Question) => (
          <List.Item>
            <Card
              title={`Вопрос №${question.number}`}
              style={{ width: "100%" }}
            >
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
              <Text>{solutionTranslations[question.solution]}</Text>
              <br />

              <Text strong>Содержание решения: </Text>
              <Text>{question.solutionContent || "-"}</Text>
              <br />

              <Text strong>Номер дела: </Text>
              <Text>{question.caseNumber}</Text>
              <br />

              <Text strong>Номера листов: </Text>
              <Text>
                <Text>
                  {formatSheetNumber(question.sheetNumbers[0])} -{" "}
                  {formatSheetNumber(question.sheetNumbers[1])}
                </Text>
              </Text>
              <br />

              <Text strong>Теги: </Text>
              <div style={{ marginTop: 5, marginBottom: 10 }}>
                {question.tags?.length ? (
                  question.tags.map((tag) => (
                    <Tag key={tag.id}>{tag.title}</Tag>
                  ))
                ) : (
                  <Text>—</Text>
                )}
              </div>
            </Card>
          </List.Item>
        )}
      />

      <div style={{ marginTop: 20 }}>
        <Link href="/">← Вернуться к списку заседаний</Link>
      </div>
    </div>
  );
}
