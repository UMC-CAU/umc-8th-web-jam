export interface Tag {
    id: number;
    name: string;
  }
  
  export interface Like {
    id: number;
    userId: number;
    lpId: number;
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
  }
  
  export interface LPResponse {
    data: LP[];
    nextCursor: number | null;
    hasNext: boolean;
  }