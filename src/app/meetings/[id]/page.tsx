"use client"; // сделать серверным

import { Typography, Spin } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useMeeting } from "@/app/lib/hooks/useMeeting";
import { typesTranslations } from "@/app/lib/constants/constants";
import QuestionsList from "@/app/ui/QuestionsList/QuestionsList";

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

      <QuestionsList questions={data.questions} />

      <div style={{ marginTop: 20 }}>
        <Link href="/">← Вернуться к списку заседаний</Link>
      </div>
    </div>
  );
}
