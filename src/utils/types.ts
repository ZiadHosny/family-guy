export type Character = {
    id: number,
    name: string,
    slug: string,
    skills: string[],
    description: string,
    age: string,
    avatar: string,
    images: string[],
    occupations: string[]
}

export type Quote = {
    character_id: number,
    quote: string,
}