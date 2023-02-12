export type StatusCode = number;

export interface ArticleMetadata{
  firstPublished: number;
  lastModified: number;
  title: string;
  subtitle: string;
  type: string;
  edition: number;
  tags?: string[];
  series?: string;
}

export interface Article{
  firstPublished: number;
  lastModified: number;
  title: string;
  subtitle: string;
  type: string;
  edition: number;
  tags?: string[];
  series?: string;
  body: {
    [key: string]: string;
  }[];
}

export interface ArticleCatalog{
  id: number;
  lastModified: number;
  count: number;
  body: ArticleMetadata[]
}

export interface ArticleTag {
  id: string; // Label mean the value displayed to user
  color: any;
  name: string; //name mean the value used to processed in background
}


