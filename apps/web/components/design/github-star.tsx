import { GithubIcon } from "../icons/github";

export function GithubStar() {
    return <div className="absolute top-4 right-4 hover:border-b-1 border-zinc-500">
        <a
            href="https://github.com/GaureshArt/docsy"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 bg-white text-zinc-800 rounded-lg transition-colors text-sm font-medium"
        >
            <GithubIcon />

            <span className="bg-white text-black font-fragment-mono px-2 py-0.5 rounded  font-bold">0</span>
        </a>
    </div>
}