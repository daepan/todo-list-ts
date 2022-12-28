interface TodoItemRequest {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface CompletedChangeRequest {
  id: number
  completed: boolean
}

export type {
  TodoItemRequest,
  CompletedChangeRequest,
}