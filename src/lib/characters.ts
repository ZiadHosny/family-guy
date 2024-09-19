import { endpoint } from "@/utils/endpoint"
import { Character, Quote } from "@/utils/types"

export const getAllCharacters = async () => {
    const data = await fetch(`${endpoint}/characters`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json() as Promise<{ characters: Character[] }>
}

export const getCharacterBySlug = async (slug: string) => {
    const data = await fetch(`${endpoint}/characters/${slug}`)

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }

    return data.json() as Promise<{ character: Character, character_quotes: Quote[] }>
}