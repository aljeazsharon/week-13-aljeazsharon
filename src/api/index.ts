import { GetCategory, CategoryForm, Category } from '../types'

export const getCategory = async (): Promise<GetCategory>  => {
    const fetching = await fetch('https://mock-api.arikmpt.com/api/category/');

    return fetching.json()
}

export const deleteCategory = async (id?: number): Promise<void> => {
    try {
        const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
            method: 'DELETE'
        })

        return fetching.json()

    } catch (error) {
        alert(error)
    }
}

export const addCategory = async (body: CategoryForm) => {
    try {
        const fetching = await fetch('https://mock-api.arikmpt.com/api/category/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(body)
        })
        const response : Promise<Category> = fetching.json()
        return response

    } catch (error) {
        alert(error)
    }
}