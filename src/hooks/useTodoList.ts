import { useQuery } from "react-query";
import * as api from '../api';

const useTodoList = () => {
  const { data: todoList, isLoading } = useQuery('todoList', api.fetchTodoList);

  if (isLoading) return null;

  return todoList;
}

export default useTodoList;
