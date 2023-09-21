export interface ApiResponse<T> {
    success: boolean;
    data: T;
    errors: string[];
};

export interface User {
  _id: string;
  name: string;
  email: string;
  privilege: string;
  userCollection: string;
  joinedAt: number,
};

export interface Reaction {
    type: "like" | "dislike";
    user: string;
    article: string;
};

export interface Article {
    _id: string;
    title: string;
    description: string;
    content: string;
    createdAt: number;
    creators: User[];
    type: string;
    toolkit: string;
    section: string;
    reactions: Reaction[];
};

export interface Section {
    _id: string;
    title: string;
    type: string;
    createdAt: number;
    articles: Article[];
};

export interface Toolkit {
    _id: string;
    name: string;
    description: string;
    type: string;
    company: string;
    createdAt: number;
    sections: Section[];
}