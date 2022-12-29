interface TodoItemRequest {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface CompletedChangeRequest {
  id: number
  title?: string
  completed?: boolean
}

interface DeleteTodoItemRequest {
  id: number
}


export type {
  TodoItemRequest,
  CompletedChangeRequest,
  DeleteTodoItemRequest,
}