import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel()

  return (
    <section className="embla" ref={emblaRef}>
      <section className="embla__container  ">
        <section className="embla__slide relative w-full h-64 " >
          <Image 
            src="/images/TP1.jpg" 
            alt="  " 
            fill
            className="rounded-xl object-cover"
          />
        </section>
        <section className="embla__slide relative w-full h-64">
          <Image 
            src="/images/TP2.jpg" 
            alt=" " 
            fill
            className="rounded-xl object-cover"
          />
        </section>
        <section className="embla__slide relative w-full h-64" >
          <Image
            src="/images/TP3.jpg" 
            alt=" " 
            width={800}
            height={800}
            className="rounded-xl object-cover"
          />
        </section>
      </section>
    </section>
  )
}