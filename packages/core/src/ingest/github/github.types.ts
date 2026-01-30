export interface RepositoryConfig {
    owner:string;
    repo:string;
    branch:string;
}


export interface GitTreeResponse {
    sha: string;
    url?: string;
    tree: GitTreeItem[];
    truncated:boolean;
}
export interface FetchGitTreeResponse {
    tree:GitTreeResponse;
    repository:RepositoryConfig;
}
export interface GitTreeItem {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size?: number;
    url?: string;
}
export interface PriorityRule {
    score: number;
    match: (path: string, segments: string[]) => boolean;
  }
  

export interface RawFile {
    path: string;
    content: string;
    url: string ;           
    sha: string;         
    size: number;
    fetchedAt: Date;       
}

