import React from "react";
import { MeetingsApiResponse, MeetingItem } from "./types"; // переделать
import MeetingFilters from "../MeetingFilters";
import MeetingsList from "../MeetingsList";
import PaginationComponent from "../PaginationComponent";
import { API_BASE } from "../lib/constants/constants";
import styles from "./MeetingsPage.module.css";

interface PageProps {
  searchParams: {
    classification?: string;
    tags?: string;
    presiding?: string;
    case?: string;
    protocol?: string;
    question?: string;
    date_from?: string;
    date_to?: string;
    page?: string;
    per_page?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default async function Page({ searchParams }: PageProps) {
  // 1. Парсим page / per_page из searchParams ----- Возможно стоит переделать
  const page = searchParams.page
    ? parseInt(
        Array.isArray(searchParams.page)
          ? searchParams.page[0]
          : searchParams.page,
        10
      )
    : 1;
  const perPage = searchParams.per_page
    ? parseInt(
        Array.isArray(searchParams.per_page)
          ? searchParams.per_page[0]
          : searchParams.per_page,
        10
      )
    : 10;

  // 2. Собираем объект params, включая только непустые поля
  const params: Record<string, string> = {};

  if (searchParams.classification) {
    params.classification = Array.isArray(searchParams.classification)
      ? searchParams.classification[0]
      : searchParams.classification;
  }
  if (searchParams.tags) {
    params.tags = Array.isArray(searchParams.tags)
      ? searchParams.tags[0]
      : searchParams.tags;
  }
  if (searchParams.presiding) {
    params.presiding = Array.isArray(searchParams.presiding)
      ? searchParams.presiding[0]
      : searchParams.presiding;
  }
  if (searchParams.case) {
    params.case = Array.isArray(searchParams.case)
      ? searchParams.case[0]
      : searchParams.case;
  }
  if (searchParams.protocol) {
    params.protocol = Array.isArray(searchParams.protocol)
      ? searchParams.protocol[0]
      : searchParams.protocol;
  }
  if (searchParams.question) {
    params.question = Array.isArray(searchParams.question)
      ? searchParams.question[0]
      : searchParams.question;
  }
  if (searchParams.date_from) {
    params.date_from = Array.isArray(searchParams.date_from)
      ? searchParams.date_from[0]
      : searchParams.date_from;
  }
  if (searchParams.date_to) {
    params.date_to = Array.isArray(searchParams.date_to)
      ? searchParams.date_to[0]
      : searchParams.date_to;
  }

  // Всегда ставим страничку и размер
  params.page = String(page);
  params.per_page = String(perPage);

  // ---- вынести в отдельную функцию? ----
  // 3. Делаем SSR-запрос к API
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/api/meetings?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // Если ошибка, рендерим простое сообщение
    return (
      <main style={{ padding: 32 }}>
        <p style={{ color: "red" }}>Ошибка при загрузке данных: {res.status}</p>
      </main>
    );
  }
  // ---- вынести в отдельную функцию? ----

  const data = (await res.json()) as MeetingsApiResponse;
  const meetings: MeetingItem[] = data.items || [];
  const totalPages = data.totalPages || 1;
  const currentPage = data.currentPage || page;

  return (
    <main style={{ padding: 32 }} className={styles["meetings-page-container"]}>
      {/* Панель фильтров */}
      <MeetingFilters
        currentFilters={{
          classification: params.classification,
          tags: params.tags,
          presiding: params.presiding,
          case: params.case,
          protocol: params.protocol,
          question: params.question,
          date_from: params.date_from,
          date_to: params.date_to,
          page: String(currentPage),
          per_page: String(perPage),
        }}
      />

      {/* Список заседаний */}
      <div style={{ marginTop: 24 }}>
        <MeetingsList meetings={meetings} />
      </div>

      {/* Пагинация */}
      <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          perPage={perPage}
        />
      </div>
    </main>
  );
}
