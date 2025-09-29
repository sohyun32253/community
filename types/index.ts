export type Comment = {
  id: string;
  userName: string;
  text: string;
  createdAt?: any;
};

export interface Post {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
  comments: Comment[];
  imageUrl?: string | null;
}

