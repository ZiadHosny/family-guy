import { Container } from '@/components'
import { getAllCharacters } from '@/lib/characters'
import Image from 'next/image'
import Link from 'next/link'

export default async () => {
  const data = await getAllCharacters()

  return (
    <main>
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
        {data?.characters?.map((character) => {
          return (
            <Link
              href={`/characters/${character.slug}`}
              key={character.name}
              className="overflow-hidden rounded-md"
            >
              <Image
                src={character.avatar}
                alt=""
                className="transition-all duration-500 hover:scale-110 hover:-rotate-2"
                width={500}
                height={500}
              />
            </Link>
          )
        })}
      </Container>
    </main>
  )
}