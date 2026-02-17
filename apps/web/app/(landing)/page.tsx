import CodeTeaser from '@/components/design/code-teaser'
import { GithubStar } from '@/components/design/github-star'
import PixelRobot from '@/components/design/pixel-robot'
import { HEADING_TEXT, SUBHEADING_TEXT } from '@/constant/hero-config'
import { Cta } from '@/components/landing/cta'
import { Badge } from '@workspace/ui/components/badge'

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-dvh">
      <div className="h-16 sm:h-20 w-full">
        <GithubStar />
      </div>
      <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="flex flex-col gap-6 sm:gap-6 md:gap-6 items-center">
          <PixelRobot />
          <Badge className="border-dashed ">Building in public · V.alpha</Badge>
          <div className="max-w-4xl w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-bold font-pressStart2p dark:text-zinc-100 text-center leading-tight px-4">
              {HEADING_TEXT}
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 text-center font-fragment-mono px-4 max-w-3xl mx-auto">
              {SUBHEADING_TEXT}
            </p>
          </div>
        </div>

        <CodeTeaser />
        <Cta />
      </div>
    </div>
  )
}
