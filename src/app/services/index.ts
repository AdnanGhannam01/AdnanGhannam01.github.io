export interface ApiResponse<T> {
    success: boolean;
    data: T;
    errors: string[];
};

export interface Article {
    _id: string;
    title: string;
    description: string;
    content: string;
    createdAt: number;
    type: string;
    toolkit: string;
    section: string;
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