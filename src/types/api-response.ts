export interface StandardResponse<T> {
    timestamp: string         // ISO timestamp
    status: number            // HTTP status (200, etc)
    message: string           // Ex: "Categories fetched successfully"
    path: string              // Ex: "/api/categories"
    traceId: string           // Para logs distribuídos, como no Spring Sleuth
    data: T                   // Dados reais da resposta
    errorCode?: string        // Pode vir null ou undefined em casos de sucesso
}
