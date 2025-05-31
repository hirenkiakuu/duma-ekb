import Link from "next/link";
import dayjs from "dayjs";
import { Meeting } from "@/app/lib/models/meeting.interface";
import { typesTranslations } from "@/app/lib/constants/constants";
import QuestionsList from "@/app/ui/QuestionsList/QuestionsList";

interface PageProps {
  params: {
    id: string;
  };
}

// добавить переводы
export default async function MeetingDetails({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/api/meetings/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // Если API вернул ошибку, показываем сообщение
    return (
      <main style={{ padding: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Детали заседания</h1>
        <p style={{ color: "red" }}>
          Ошибка при загрузке данных заседания (ID: {id}) — статус {res.status}
        </p>
        <Link href="/meetings">← Вернуться к списку заседаний</Link>
      </main>
    );
  }

  const meeting = (await res.json()) as Meeting;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <h2
        className="ant-typography css-dev-only-do-not-override-1a3rktk"
        style={{ marginBottom: 16 }}
      >
        Заседание от {dayjs(meeting.date).format("DD.MM.YYYY")}
      </h2>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Номер протокола:</strong>{" "}
        {meeting.questions?.[0]?.protocolNumber ?? "—"}
      </p>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Тип заседания:</strong> {typesTranslations[meeting.meetingType]}
      </p>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Количество гласных:</strong> {meeting.deputies}
      </p>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Председательствующий:</strong> {meeting.presiding}
      </p>

      <h4
        className="ant-typography css-dev-only-do-not-override-1a3rktk"
        style={{ marginTop: 24, marginBottom: 12 }}
      >
        Вопросы к обсуждению:
      </h4>

      <QuestionsList questions={meeting.questions} />

      <div style={{ marginTop: 20 }}>
        <Link href="/">
          <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
            ← Вернуться к списку заседаний
          </p>
        </Link>
      </div>
    </div>
  );
}
