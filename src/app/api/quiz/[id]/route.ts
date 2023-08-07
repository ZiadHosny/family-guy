import questions from '@/data/quiz.json'
import { NextResponse, NextRequest } from 'next/server'
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const question = questions.data.find(item => item.id === params.id)

        if (!question) {
            return new NextResponse('not found', { status: 404 })
        }

        const { correct_answer, ...rest } = question

        return NextResponse.json({
            question: rest,
        })
    } catch (error) {
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}