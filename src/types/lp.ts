// src/types/lp.ts

export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
  author?: Author; // author는 상세 조회에서만 들어오므로 옵셔널 처리
}

export interface LPResponse {
  data: LP[]; // 목록 응답
  nextCursor: number | null;
  hasNext: boolean;
}

export interface LPDetailResponse {
  data: LP; // 상세 조회는 단일 LP 객체
}
