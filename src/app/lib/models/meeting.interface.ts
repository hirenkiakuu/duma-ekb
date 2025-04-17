interface Tag {
  id: number | string;
  title: string;
}

export interface Question {
  id: number | string;
  number: string;
  description: string;
  quorum: boolean;
  position1870: string;
  position1892: string;
  authorClassification: string;
  solution: string;
  solutionContent: string;
  caseNumber: string;
  sheetNumbers: string;
  tags: Tag[];
}

export interface Meeting {
  id: number | string;
  date: string;
  protocolNumber: string;
  meetingType: string;
  deputies: number;
  presiding: string;
  questions: Question[];
}
