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

interface AddTodoItemRequest {
  userId: number
  title: string
  completed: boolean
}

interface AddTodoItemResponse {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type {
  TodoItemRequest,
  TodoChangeRequest,
  DeleteTodoItemRequest,
  AddTodoItemRequest,
  AddTodoItemResponse,
}