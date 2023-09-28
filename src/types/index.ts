export interface Register {
    name: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface RegisterResponse {
    data: {
        id: string;
        name: string;
        email: string;
        password: string;
    }
}

export interface LoginResponse {
    data: {
        token: string;
    }
}

export interface Category {
    id: string;
    name: string;
    is_active: boolean;
}

export interface GetCategoryResponse {
    data: Category[];
    current_page: number;
    total: number;
    total_page: number;
}

export type FormCategory = Omit<Category, "id">;