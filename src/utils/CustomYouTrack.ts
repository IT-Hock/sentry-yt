import {PaginationOptions} from 'youtrack-rest-client/dist/options/pagination_options';
import {YoutrackClient} from 'youtrack-rest-client/dist/youtrack_client';
import {Issue} from '../models/Issue.model';

export function constructSearchQuery(
    projectId: string,
    issueId?: string
): string {
    const queryParts = [];
    if (projectId) {
        queryParts.push(`project:${projectId}`);
    }
    if (issueId) {
        queryParts.push(`id:${issueId}`);
    }
    return queryParts.join(' AND ');
}


export async function getIssues(
    youtrack: YoutrackClient,
    query: string | null = null,
    projectId: string | null = null,
    paginationOptions: PaginationOptions | null = null
): Promise<Issue[]> {
    return (await youtrack.get('/issues', {
        params: {
            query: (projectId && projectId !== '') ? constructSearchQuery(projectId) : query,
            ...paginationOptions,
            fields: 'id,idReadable,summary'
        }
    })).map((issue: any) => {
        return Issue.fromYoutrackIssue(issue);
    });
}
