export enum ListKeys {
    List = 'list'
}

export interface ListItem {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
    user: number;
}

export interface ListItemToSubmit {
    title: string;
    completed: boolean;
    user: number;
}

export interface ListResponse extends Record<string, string | number | boolean | object> {
    count: number;
    next: string;
    previous: string;
    results: ListItem[];
}
