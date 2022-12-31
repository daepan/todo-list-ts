import axios from "axios";
import { TodoItemRequest, AddTodoItemRequest } from "./interface";

export const TodoListApi = {
    get: async (): Promise<TodoItemRequest[]> => {
        return axios.get('https://jsonplaceholder.typicode.com/todos').then((res: any) => {
            return res.data
        })
    },

    put: async (id: number, title: string, completed: boolean): Promise<TodoItemRequest> => {
        return axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            title: title,
            completed: completed
        }).then((res: any) => {
            return res.data
        })
    },

    delete: async (id: number) => {
        return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res: any) => {
            return res.data
        })
    },

    add: async (addTodo: AddTodoItemRequest) => {
      return axios.post('https://jsonplaceholder.typicode.com/todos', {
        userId: addTodo.userId,
        title: addTodo.title,
        completed: addTodo.completed,
      }).then((res: any) => {
        return res.data
      })
    }
}