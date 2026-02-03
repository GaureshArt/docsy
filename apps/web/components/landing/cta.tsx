import { Button } from "@workspace/ui/components/button";
import { GithubIcon } from "../icons/github";
import Link from "next/link";
import { GITHUB_REPO_LINK } from "@/constant/hero-config";

export function Cta() {
    return (
        <>
            <div>
                <Link href={GITHUB_REPO_LINK}>
                    <Button variant={'secondary'} className="cursor-pointer border border-zinc-600 ">
                        <GithubIcon /> View On Github
                    </Button>
                </Link>
                <Button variant={'link'} className="cursor-pointer">See Roadmap</Button>
            </div>
        </>
    )
}