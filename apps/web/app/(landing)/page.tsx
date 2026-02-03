import CodeTeaser from "@/components/design/code-teaser";
import { GradientBg } from "@/components/design/gradient-bg";
import { GithubStar } from "@/components/design/github-star";
import PixelRobot from "@/components/design/pixel-robot";
import { HEADING_TEXT, SUBHEADING_TEXT } from "@/constant/hero-config";
import { Cta } from "@/components/landing/cta";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-top justify-top min-h-svh">
      <GradientBg />
      <div className={'h-10'}>
        <GithubStar />
      </div>
      <div className="flex flex-col items-center justify-top gap-20 ">
        <div className="flex flex-col gap-10">
          <PixelRobot />
          <div>
            <h1 className="text-5xl font-bold font-pressStart2p  dark:text-zinc-100 light:text-red-800">
              {HEADING_TEXT}
            </h1>
            <p className="text-zinc-600 text mt-4  text-center font-fragment-mono">
              {SUBHEADING_TEXT}
            </p>
          </div>
        </div>
        <CodeTeaser />
        <Cta/>
      </div>

    </div>
  )
}
