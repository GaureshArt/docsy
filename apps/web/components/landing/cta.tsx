import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'
import { ROUTES } from '@/constant/routes'

export function Cta() {
  return (
    <div className="flex flex-col  sm:flex-row  items-center gap-3 sm:gap-4 px-4 w-full overflow-clip sm:w-auto justify-center">
      <Link href={ROUTES.DOCS}>
        <Button
          variant={'link'}
          className="cursor-pointer font-jetbrains-mono text-sm sm:text-base w-full sm:w-auto"
        >
          Docs
        </Button>
      </Link>
    </div>
  )
}
