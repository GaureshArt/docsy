import { Octokit } from "octokit";

const octokitProvider:Octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

export default octokitProvider;