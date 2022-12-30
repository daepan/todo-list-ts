interface TodoItemRequest {
  userId: number
  id: number
  title: string
  completed: boolean
}

interface TodoChangeRequest {
  id: number
  title: string
  completed: boolean
}

interface DeleteTodoItemRequest {
  id: number
}


export type {
  TodoItemRequest,
  TodoChangeRequest,
  DeleteTodoItemRequest,
}