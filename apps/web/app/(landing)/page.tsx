import CodeTeaser from '@/components/design/code-teaser'
import { GithubStar } from '@/components/design/github-star'
import PixelRobot from '@/components/design/pixel-robot'
import { HEADING_TEXT, SUBHEADING_TEXT } from '@/constant/hero-config'
import { Cta } from '@/components/landing/cta'
import { Badge } from '@workspace/ui/components/badge'
export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full  overflow-x-hidden">
      <div className="h-16 sm:h-20 w-full px-4">
        <GithubStar />
      </div>

      <div className="flex flex-col items-center  justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 w-full md:max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 items-center w-full">
          <PixelRobot />

          <Badge className="text-xs sm:text-sm bg-gray-900 text-white font-pressStart2p px-3 py-1">
            Alpha
          </Badge>

          <div className="w-full md:max-w-4xl">
            <h1 className="text-base sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold font-pressStart2p text-center leading-tight px-2">
              {HEADING_TEXT}
            </h1>
            <p className="text-zinc-600 text-xs sm:text-sm md:text-base lg:text-lg mt-3 sm:mt-4 text-center font-fragment-mono px-2">
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
