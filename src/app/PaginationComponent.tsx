"use client";

import React from "react";
import { Pagination } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
  perPage: number;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  perPage,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Общее число элементов (если API не возвращает totalItems, считаем грубо)
  const totalItems = totalPages * perPage;

  return (
    <Pagination
      current={currentPage}
      pageSize={perPage}
      total={totalItems}
      showSizeChanger={false}
      onChange={(page) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", String(page));
        router.replace(`${pathname}?${newParams.toString()}`);
      }}
    />
  );
}
