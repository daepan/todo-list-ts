import { CompletedChangeRequest, TodoItemRequest} from './interface';

export const fetchTodoList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
  return res.json();
}

export const deleteTodoListItem = async (Id: number) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${Id}`, {
    method: 'DELETE',
  })
}

export const addTodoListItem = async (todoItem: TodoItemRequest) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: 'POST',
    body: JSON.stringify({
      userId: todoItem.id,
      title: todoItem.title,
      completed: todoItem.completed,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}

export const updateTodoListItem = async (todoItem: CompletedChangeRequest) => {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: todoItem.completed
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
}