export interface Fields {
    description: string;
    status: IssueStatus;
    resolutiondate: string;
}

export interface IssueStatus {
    name: string;
}

export interface Issue {
    key: string;
    fields: Fields;
}

export class JIRAIssuesBody {
    issues: Issue[];
    maxResults: number;
    startAt:number;
    total:number;
}

export interface LogWork {
    id: string;
    timeSpent: string;
    timeSpentSeconds: number;
    created: string;
    updated: string;
    started: string;
    comment: string;
}