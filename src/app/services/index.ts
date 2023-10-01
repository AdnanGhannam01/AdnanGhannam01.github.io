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
    views: number;
    toolkit: Toolkit;
    section: Section;
    reactions: Reaction[];
};

export interface Section {
    _id: string;
    title: string;
    type: string;
    createdAt: number;
    articles: Article[];
    toolkit: string;
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

export interface Collection {
    _id: string;
    articles: Article[];
    lastModifyAt: number;
}

export interface Vote {
    user: string; // Id
    value: number; // -1 or 1
}

export interface Answer {
    _id: string;
    user: User;
    content: string;
    createdAt: number;
    lastModifyAt: number;
    votes: Vote[];
    up: boolean | null;
    isCorrect?: boolean;
}

export interface Question {
    _id: string;
    title: string;
    content: string;
    createdAt: number;
    lastModifyAt: number;
    user: User;
    views: number;
    votes: Vote[];
    up: boolean | null;
    answers: Answer[];
}
