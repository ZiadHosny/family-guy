import { Container } from '@/components'
import { getAllCharacters, getCharacterBySlug } from '@/lib/characters'
import Image from 'next/image'

export const dynamicParams = false

export const generateStaticParams = async () => {
    const { characters } = await getAllCharacters()
    return characters.map((character) => ({ slug: character.slug }))
}

const CharacterImage = ({ image }: { image: string }) => {
    return (
        < li
            className="relative flex overflow-hidden bg-gray-900 rounded-xl"
        >
            <Image
                className="transition-all duration-500 hover:scale-110 hover:rotate-2"
                src={image}
                alt={image}
                width={760}
                height={435}
            />
        </li >
    )
}

const Occupation = ({ occupation }: { occupation: string }) => {
    return (
        <li className="p-2 text-gray-300 bg-gray-800 rounded-md" >
            {occupation}
        </li>
    )
}

const Skill = ({ skill }: { skill: string }) => {
    return (
        <li
            className="flex justify-center flex-grow px-2 py-1 text-orange-400 rounded-full bg-orange-950"
        >
            {skill}
        </li>
    )
}

const CharacterQuote = ({ quote }: { quote: string }) => {
    return (
        <li
            className="p-2 italic text-gray-400 border-l-4 border-green-400 rounded-md"
        >
            {quote}
        </li>
    )
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { character, character_quotes } = await getCharacterBySlug(params.slug)

    return (
        <Container className="flex flex-col gap-5 py-5" as="main">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold capitalize">{character.name}</h1>
                <ul className="flex gap-1 text-sm">
                    {character.occupations.map((occupation) => <Occupation key={occupation} occupation={occupation} />)}
                </ul>
            </div>
            <p className="text-sm leading-6">{character.description}</p>
            <ul className="grid gap-2 sm:grid-cols-2">
                {character.images.map((image) => <CharacterImage key={image} image={image} />)}
            </ul>
            {character.skills && (
                <>
                    <h2 className="text-xl font-bold">Power and Skills</h2>
                    <ul className="flex flex-wrap gap-1">
                        {character.skills.map((skill) => <Skill key={skill} skill={skill} />)}
                    </ul>
                </>
            )}
            {character_quotes && (
                <>
                    <h2 className="text-xl font-bold">Famous Qoutes</h2>
                    <ul className="grid gap-5">
                        {character_quotes.map(({ quote }) => <CharacterQuote key={quote} quote={quote} />)}
                    </ul>
                </>
            )}
        </Container>
    )
}