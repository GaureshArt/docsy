import { Button } from '@workspace/ui/components/button'
import { GithubIcon } from '../icons/github'
import Link from 'next/link'
import { GITHUB_REPO_LINK } from '@/constant/hero-config'
import { ROUTES } from '@/constant/routes'

export function Cta() {
  return (
    <div className="flex flex-col  sm:flex-row items-center gap-3 sm:gap-4 px-4 w-full overflow-clip sm:w-auto justify-center">
      <Link href={GITHUB_REPO_LINK} className="w-full  sm:w-auto ">
        <Button
          variant={'secondary'}
          className="cursor-pointer border border-zinc-600 w-full sm:w-auto text-sm sm:text-base"
        >
          <GithubIcon />
          <span>View On Github</span>
        </Button>
      </Link>
      <Link href={ROUTES.DOCS}>
        <Button
          variant={'link'}
          className="cursor-pointer text-sm sm:text-base w-full sm:w-auto"
        >
          Docs
        </Button>
      </Link>
    </div>
  )
}
