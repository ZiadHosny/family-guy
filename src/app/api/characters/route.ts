import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'

export const GET = async () => {
    return NextResponse.json({ characters: characters.data })
}