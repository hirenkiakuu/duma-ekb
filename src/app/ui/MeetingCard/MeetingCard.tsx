"use client";

import { Collapse, List, Tag } from "antd";
import Link from "next/link";
import { Meeting } from "@/app/lib/models/meeting.interface";
import { RightOutlined } from "@ant-design/icons";
import {
  classificationsTranslations,
  solutionTranslations,
  tagColors,
  typesTranslations,
} from "@/app/lib/constants/constants";

// внести правки в стили
// заменить дату на нормальную
// добавить номер дела внутрь описания вопроса?

const { Panel } = Collapse;

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  const tagColor = tagColors[meeting.meetingType];
  const typeTranslation = typesTranslations[meeting.meetingType];

  return (
    <List.Item style={{ display: "block" }}>
      <Collapse
        bordered={false}
        expandIconPosition="start"
        expandIcon={({ isActive }) => (
          <RightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: "transparent" }}
      >
        <Panel
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link href={`/meetings/${meeting.id}`}>{meeting.date}</Link>
              <Tag color={tagColor}>{typeTranslation}</Tag>
            </div>
          }
          key="outer"
          style={{
            border: "none",
            padding: 0,
            background: "transparent",
          }}
        >
          {/* Краткие данные по заседанию */}
          <div style={{ marginBottom: 10 }}>
            <div>
              <strong>Председатель:</strong> {meeting.presiding}
            </div>
            <div>
              <strong>Количество гласных:</strong> {meeting.deputies}
            </div>
            <div>
              <strong>Протокол №:</strong> {meeting.questions[0].protocolNumber}
              {/* /** поправить модель данных **/}
            </div>
          </div>

          {/* Внутренний коллапс — список вопросов */}
          {/* Подправить стили */}
          <Collapse>
            <Panel header="Вопросы на повестке дня" key="inner">
              <List
                itemLayout="vertical"
                dataSource={meeting.questions}
                renderItem={(question) => (
                  <List.Item key={question.id}>
                    <p>
                      <b>№{question.number}</b>: {question.description}
                    </p>
                    <p>
                      <b>Решение</b>: {solutionTranslations[question.solution]}
                    </p>
                    <p>
                      <b>Авторская классификация</b>:{" "}
                      {
                        classificationsTranslations[
                          question.authorClassification
                        ]
                      }
                    </p>
                    <div style={{ marginTop: 10 }}>
                      <b>тэги: </b>
                      {question.tags.map((tag) => (
                        <Tag key={tag.id}>{tag.title}</Tag>
                      ))}
                    </div>
                  </List.Item>
                )}
              />
            </Panel>
          </Collapse>
        </Panel>
      </Collapse>
    </List.Item>
  );
}
