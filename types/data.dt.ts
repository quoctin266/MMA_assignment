export interface IFeedback {
  rating: number;

  comment: string;

  author: string;

  date: string;
}

export interface IPerfume {
  id: string;

  perfumeName: string;

  price: number;

  perfumeDescription: string;

  gender: boolean;

  image: string;

  company: string;

  feedbacks: IFeedback[];
}
