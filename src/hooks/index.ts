import { useQuery, UseQueryResult } from "react-query";
import { TodoItemRequest } from "api/interface";
import * as api from 'api';

export const useTodoListData = () => {
  const { data: getTodoList } :UseQueryResult<TodoItemRequest[], Error> = useQuery<TodoItemRequest[], Error>({
    queryKey: 'todoList',
    queryFn: api.fetchTodoList,
    suspense: true
  });
  return getTodoList;
}