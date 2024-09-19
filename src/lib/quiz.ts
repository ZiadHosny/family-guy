import { endpoint } from '@/utils/endpoint'
import { AnswerType } from '@/utils/types'

export async function getQuizQuestion(id: string) {
    const data = await fetch(`${endpoint}/quiz/${id}`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json() as Promise<{ question: AnswerType }>
}

export async function getRandomQuizQuestion() {
    const data = await fetch(`${endpoint}/quiz/random`, { cache: 'no-store' })

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json() as Promise<{ randomQuestion: string }>
}