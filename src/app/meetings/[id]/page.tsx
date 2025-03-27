"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography, List, Card } from "antd";
import Link from "next/link";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const CLASSIFICATIONS = {
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

const MEETING_TYPES = {
  ongoing: "Текущее", // поменять
  closed: "Закрытое",
};

type Tag = {
  id: number;
  title: string;
};

type Question = {
  id: number;
  number?: string;
  description: string;
  quorum?: boolean;
  position1870?: string;
  position1892?: string;
  authorClassification?:
    | "finance"
    | "food"
    | "improvement"
    | "transport"
    | "charity"
    | "health_care"
    | "city_government"
    | "construction"
    | "education"
    | "culture"
    | "industry"
    | "trading"
    | "legal";
  solution?: "refuse" | "take_note";
  solutionContent?: string;
  caseNumber?: string;
  sheetNumbers?: string | number[];
  tags?: Tag[];
  title: string;
};

type Meeting = {
  id: number;
  date: string;
  protocolNumber: number | string;
  meetingType: keyof typeof MEETING_TYPES;
  deputies: number;
  presiding: string;
  questions: Question[];
  title: string;
  classification: keyof typeof CLASSIFICATIONS;
};

const mockMeetings = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  date: `2024-04-${String(i + 1).padStart(2, "0")}`,
  title: `Заседание №${i + 1}`,
  classification: Object.keys(CLASSIFICATIONS)[
    i % Object.keys(CLASSIFICATIONS).length
  ] as keyof typeof CLASSIFICATIONS,
  protocolNumber: i + 1,
  meetingType: Object.keys(MEETING_TYPES)[i % 2] as keyof typeof MEETING_TYPES,
  deputies: 10 + (i % 20),
  presiding: ["Анфиногенов И.К.", "Сидоров П.П.", "Козлов В.Н.", "Иванов А.А."][
    i % 4
  ],
  questions: Array.from({ length: 5 }, (_, j) => ({
    id: j + 1,
    title: `Вопрос ${j + 1}`,
    description: `Описание вопроса ${j + 1} для заседания №${i + 1}.`,
  })),
}));

export default function MeetingDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  useEffect(() => {
    const foundMeeting = mockMeetings.find((m) => m.id === +params.id);
    if (!foundMeeting) {
      router.push("/");
    } else {
      setMeeting(foundMeeting);
    }
  }, [params.id, router]);

  if (!meeting) return null;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <Title level={2}>{meeting.title}</Title>
      <Text strong>Дата: </Text>
      <Text>{dayjs(meeting.date).format("YYYY-MM-DD")}</Text>
      <br />
      <Text strong>Номер протокола: </Text>
      <Text>{meeting.protocolNumber}</Text>
      <br />
      <Text strong>Тип заседания: </Text>
      <Text>
        {
          MEETING_TYPES[
            String(meeting.meetingType) as keyof typeof MEETING_TYPES
          ]
        }
      </Text>
      <br />
      <Text strong>Классификация: </Text>
      <Text>
        {
          CLASSIFICATIONS[
            String(meeting.classification) as keyof typeof CLASSIFICATIONS
          ]
        }
      </Text>
      <br />
      <Text strong>Количество депутатов: </Text>
      <Text>{meeting.deputies}</Text>
      <br />
      <Text strong>Председательствующий: </Text>
      <Text>{meeting.presiding}</Text>
      <br />
      <Title level={3} style={{ marginTop: 20 }}>
        Вопросы к обсуждению:
      </Title>
      <List
        bordered
        dataSource={meeting.questions}
        renderItem={(question) => (
          <List.Item>
            <Card title={question.title} style={{ width: "100%" }}>
              <Text>{question.description}</Text>
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
