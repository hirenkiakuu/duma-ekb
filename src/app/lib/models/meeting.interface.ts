interface Tag {
  id: number | string;
  title: string;
}

interface Question {
  id: number | string;
  number: string;
  description: string;
  quorum: boolean;
  position_1870: string;
  position_1892: string;
  author_classification: string;
  solution: string;
  solution_content: string;
  case_number: string;
  sheet_numbers: string;
  tags: Tag[];
}

export interface Meeting {
  id: number | string;
  date: string;
  protocol_number: string;
  meeting_type: string;
  deputies: number;
  presiding: string;
  questions: Question[];
}
