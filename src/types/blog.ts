export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number; // in minutes
  featured: boolean;
  active: boolean;
}

export interface BlogComment {
  id: string;
  postId: string;
  name: string;
  email: string;
  comment: string;
  createdAt: string;
  approved: boolean;
}