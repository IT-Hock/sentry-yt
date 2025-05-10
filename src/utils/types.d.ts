export type LinkRequestBody = {
    fields: {
        issue_id: string;
    },
    issueId: number;
    installationId: string;
    webUrl: string;
    project: {
        slug: string;
        id: number;
    },
    actor: {
        type: string;
        id: number;
        name: string;
    }
}

export type LinkResponseBody = {
    webUrl: string,
    project: string,
    identifier: string,
}