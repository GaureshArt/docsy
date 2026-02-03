import { GithubIcon } from "../icons/github";

export function GithubStar() {
    return (
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 hover:border-b border-zinc-500 transition-colors">

            <a href="https://github.com/GaureshArt/docsy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-zinc-800 rounded-lg transition-colors text-xs sm:text-sm font-medium"
            >
                <GithubIcon />
                <span className="text-black font-fragment-mono px-1.5 sm:px-2 py-0.5 rounded font-bold">
                    0
                </span>
            </a>
        </div >
    );
}