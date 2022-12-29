import { useMutation, useQueryClient } from "react-query";
import * as api from '../api';

const useTodoListMutation = () => {
  const queryClient = useQueryClient();

  const deleteTodoListItem = useMutation(api.deleteTodoListItem, {
    onSuccess: () => {
      console.log("삭제되었습니다.")
    }
  })
  
  const updateTodoListItem = useMutation(api.updateTodoListItem, {
    onSuccess: () => {
      console.log('변경되었습니다.')
    }
  })
  
  const addTodoListItem = useMutation(api.addTodoListItem, {
    onSuccess: () => {
      console.log('추가되었습니다.');
      queryClient.invalidateQueries("todoList");
    },
  });
  
  return {
    deleteTodoListItem,
    updateTodoListItem,
    addTodoListItem,
  };
}

export default useTodoListMutation;
