export type ApiPage<T> = {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
    size: number
    first: boolean
    last: boolean
}

export type StandardResponse<T> = {
    timestamp: string
    status: number
    message: string
    path: string
    traceId: string
    data: T
    errorCode: string | null
}
