import { endpoint } from "@/utils/envs"

export const getQuizQuestion = async (id: string) => {
    const data = await fetch(`${endpoint}/quiz/${id}`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json()
}


export const getRandomQuizQuestion = async () => {
    const data = await fetch(`${endpoint}/quiz/random`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json()
}