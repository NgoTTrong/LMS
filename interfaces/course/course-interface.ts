export interface ICourse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: number;
  attachments: IAttachment[];
  chapters: IChapter[];
}
export interface ICategoryCourse {
  id: number;
  name: string;
}

export interface IAttachment {
  id: number;
  name: string;
  url: string;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IChapter {
  id: number;
  title: string;
  isPublished: boolean;
  isFree: boolean;
}
