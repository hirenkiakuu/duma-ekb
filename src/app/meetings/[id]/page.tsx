import Link from "next/link";
import dayjs from "dayjs";
import { Meeting } from "@/app/lib/models/meeting.interface";
import { API_BASE, typesTranslations } from "@/app/lib/constants/constants";
import QuestionsList from "@/app/ui/QuestionsList/QuestionsList";

interface PageProps {
  params: {
    id: string;
  };
}

// добавить переводы
export default async function MeetingDetails({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(`${API_BASE}/api/meetings/${id}`, {
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
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Link href="/meetings" style={{ display: "block" }}>
          <p
            className="ant-typography css-dev-only-do-not-override-1a3rktk"
            style={{ fontSize: "30px" }}
          >
            ←
          </p>
        </Link>
        <h2
          className="ant-typography css-dev-only-do-not-override-1a3rktk"
          style={{ margin: "0px" }}
        >
          Заседание от {dayjs(meeting.date).format("DD.MM.YYYY")}
        </h2>
      </div>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Номер протокола:</strong> {meeting.protocolNumber || "—"}
      </p>

      <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
        <strong>Номер дела:</strong> {meeting.caseNumber || "—"}
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
        <Link href="/meetings">
          <p className="ant-typography css-dev-only-do-not-override-1a3rktk">
            ← Вернуться к списку заседаний
          </p>
        </Link>
      </div>
    </div>
  );
}
