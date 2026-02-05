import { Octokit } from "octokit";
export default function octokitProvider():Octokit{
    if (!process.env.GITHUB_TOKEN) {
        throw new Error("GITHUB_TOKEN is required for GitHub ingest");
    }
    return new Octokit({
       auth: process.env.GITHUB_TOKEN,
   });
}