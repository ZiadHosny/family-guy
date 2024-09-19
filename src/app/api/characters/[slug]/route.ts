import characters from '@/data/characters.json'
import quotes from '@/data/quotes.json'
import { Character, Quote } from '@/utils/types'
import { NextResponse, NextRequest } from 'next/server'

export const GET = async (_req: NextRequest, { params }: { params: { slug: string } }) => {
    try {
        const character = characters.data.find(item => item.slug === params.slug) as Character
        if (!character) {
            return new NextResponse('not found', { status: 404 })
        }
        const character_quotes = quotes.data.filter(
            (quote: Quote) => { return quote.character_id === character.id },
        )

        return NextResponse.json({
            character,
            character_quotes: character_quotes.length > 0 ? character_quotes : null,
        })
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}