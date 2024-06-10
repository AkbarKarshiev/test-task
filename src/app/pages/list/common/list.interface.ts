export interface ListItem {
    id: string;
    title: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
    user: number;
}

export interface ListResponse extends Record<string, string | number | boolean | object> {
    count: number;
    next: string;
    previous: string;
    results: ListItem[];
}

export interface CreateEditModalInput {
    item_id: string;
}

export interface ListItemModel {
    title: string;
    completed: boolean;
    user: number;
}

export enum ListItemFieldKeys {
    Title = 'title',
    Completed = 'completed',
    UserId = 'user',
}

