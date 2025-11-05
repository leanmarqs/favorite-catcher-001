import { useState } from 'react'
import { Label } from '@/components/ui/label'

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-3.6-3.6' />
    </svg>
  )
}

function IconChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d='M9 6l6 6-6 6' />
    </svg>
  )
}

function IconChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d='M15 6l-6 6 6 6' />
    </svg>
  )
}

// Caminhos de imagens PNG (via import.meta.url para evitar declarações de tipo)
const whatsappPng = new URL('../assets/favicons/whatsapp.png', import.meta.url)
  .href
const twitterPng = new URL('../assets/favicons/twitter.png', import.meta.url)
  .href
const facebookPng = new URL('../assets/favicons/facebook.png', import.meta.url)
  .href
const instagramPng = new URL(
  '../assets/favicons/instagram.png',
  import.meta.url
).href

function Home() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Buscar Favoritos:', query)
  }

  return (
    <main className='min-h-screen p-4 caret-transparent dark:bg-zinc-900 dark:text-zinc-100'>
      <div className='mx-auto w-full max-w-2xl space-y-6 pt-6'>
        <form onSubmit={onSubmit} className='flex gap-2 items-end'>
          <div className='flex-1 grid gap-2'>
            <Label htmlFor='search' className='sr-only'>
              Buscar favoritos
            </Label>
            <div className='relative'>
              <IconSearch className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none' />
              <input
                id='search'
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Buscar favoritos'
                className='w-full rounded-full border border-input bg-background pl-10 pr-4 h-12 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'
              />
            </div>
          </div>
          <button
            type='submit'
            className='inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full bg-primary px-5 h-12 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
            aria-label='Buscar'
          >
            <IconSearch className='h-5 w-5' />
            Buscar
          </button>
        </form>

        <section className='space-y-3'>
          <h2 className='text-lg font-semibold'>Social</h2>
          <div>
            {(() => {
              const socialItems = [
                {
                  key: 'whatsapp',
                  name: 'WhatsApp',
                  src: whatsappPng,
                  bgClass: 'bg-[#25D366]',
                },
                {
                  key: 'x',
                  name: 'X',
                  src: twitterPng,
                  bgClass: 'bg-black',
                  imgClass: 'invert',
                },
                {
                  key: 'facebook',
                  name: 'Facebook',
                  src: facebookPng,
                  bgClass: 'bg-[#1877F2]',
                },
                {
                  key: 'instagram',
                  name: 'Instagram',
                  src: instagramPng,
                  bgClass:
                    'bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-400',
                },
              ]
              const perPage = 4
              const pageCount = Math.max(
                1,
                Math.ceil(socialItems.length / perPage)
              )
              const clampedPage = Math.min(page, pageCount - 1)
              const start = clampedPage * perPage
              const visible = socialItems.slice(start, start + perPage)
              const prev = () => setPage((p) => Math.max(0, p - 1))
              const next = () => setPage((p) => Math.min(pageCount - 1, p + 1))
              return (
                <div className='flex items-center gap-3'>
                  <button
                    type='button'
                    onClick={prev}
                    disabled={clampedPage === 0}
                    aria-label='Anterior'
                    className='grid place-items-center w-9 h-9 rounded-full bg-black/40 text-white shadow transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    <IconChevronLeft className='w-5 h-5' />
                  </button>
                  <div className='flex-1 rounded-2xl border border-border p-4'>
                    <div className='grid grid-cols-4 gap-4'>
                      {visible.map((item) => (
                        <div
                          key={item.key}
                          className='group flex flex-col items-center gap-2'
                        >
                          <div
                            className={`cursor-pointer grid place-items-center w-16 h-16 rounded-2xl shadow-md transition-all duration-200 ease-out hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.bgClass}`}
                            aria-label={item.name}
                          >
                            <img
                              src={item.src}
                              alt={item.name}
                              className={`w-8 h-8 transition-transform duration-200 ease-out group-hover:scale-110 object-contain ${
                                item.imgClass ?? ''
                              }`}
                            />
                          </div>
                          <span className='text-xs px-2 py-1 group-hover:underline'>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={next}
                    disabled={clampedPage >= pageCount - 1}
                    aria-label='Próximo'
                    className='grid place-items-center w-9 h-9 rounded-full bg-black/40 text-white shadow transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    <IconChevronRight className='w-5 h-5' />
                  </button>
                </div>
              )
            })()}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
