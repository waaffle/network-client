export function hasErrorField(err: unknown): err is { data: { error: string } } {
    return (
        err !== null &&
        typeof err === 'object' &&
        'data' in err &&
        err.data !== null &&
        typeof err.data === 'object' &&
        'error' in err.data
    )
}