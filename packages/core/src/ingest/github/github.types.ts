export interface GitTreeResponse {
    sha: string;
    url?: string;
    tree: GitTreeItem[];
    truncated:boolean;
}
export interface GitTreeItem {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size?: number;
    url?: string;
}