export type Article = {
  slug?: string;
  title?: string;
  date?: string;
  summary?: string;
  coverImage?: string;
  author?: {
    name: string;
    image: string;
  };
  content?: string;
};
