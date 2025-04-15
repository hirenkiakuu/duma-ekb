import { Meeting } from "@/app/lib/models/meeting.interface";

export const mockObj: Meeting = {
  id: 1,
  date: "1906-01-20",
  protocolNumber: "2", // возможно будет текстовым полем
  meetingType: "ongoing", // enum 4 типа
  deputies: 25,
  presiding: "Анфиногенов И.К.",
  questions: [
    {
      id: 1,
      number: "6", // узнают позже
      description:
        "Ходатойство купцов-мусульман о разрешении торговли в воскресенье",
      quorum: true,
      position1870: "В)", // enum
      position1892: "XI", // enum
      authorClassification: "trading", // финасы, продовольствие, благоустройство
      solution: "refuse", // согласны, отложить, принять к сведению
      solutionContent: "", // подробности решения
      caseNumber: "1982", // номер дела
      sheetNumbers: "25  об - 28", // возможно будет в другом виде (массив дробных чисел) Вопрос начинался на 25 листе а закончился на лицевой стороне 28 листа (поиск по номерам листов осуществляется в пределах протокола)
      tags: [
        {
          id: 1,
          title: "Мусульмане",
        },
      ],
    },
    {
      id: 2,
      number: "7",
      description:
        "Результаты расследования пожарной комиссии о жалобе А.П. Кожевникова на содержание брандмейстером Чапиным собственных лошадей за счет пожарного ведомства",
      quorum: true,
      position1870: "А)", // enum
      position1892: "XII", // enum
      authorClassification: "city_government", // enum
      solution: "take_note", // enum
      solutionContent: "Не подтвердилось",
      caseNumber: "1982",
      sheetNumbers: "28 - 33", // возможно будет в другом виде (массив дробных чисел)
      tags: [
        {
          id: 2,
          title: "Конфликт",
        },
      ],
    },
  ],
};
