export interface IUserProgress {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
  chapterId: number;
  userId: number;
}
