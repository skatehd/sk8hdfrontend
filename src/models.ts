export interface CommentTree {
    id: number;
    content: string;
    owner: number;
    date: string;
    children?: CommentTree[];
    parent: number | null;
}

