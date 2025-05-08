export interface CommentAuthor {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
}

export interface CommentListResponse {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}
