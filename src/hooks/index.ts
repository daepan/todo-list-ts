import { useQuery, UseQueryResult, useQueryClient, useMutation } from "react-query";
import { TodoItemRequest, TodoChangeRequest, DeleteTodoItemRequest } from "api/interface";
import { TodoListApi } from "api";

export const useTodoListData = () => {
  const { data: getTodoList } :UseQueryResult<TodoItemRequest[], Error> = useQuery<TodoItemRequest[], Error>({
    queryKey: 'todoList',
    queryFn: TodoListApi.get,
    suspense: true
  });
  return getTodoList; 
}


export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    // const { mutate : updateTodoList } : UseMutationResult<TodoItemRequest, Error, IUpdateTodoList>
    return useMutation<TodoItemRequest, Error, TodoChangeRequest>({
        mutationKey: 'todoList',
        mutationFn: async ({id, title, completed}) => TodoListApi.put(id, title, completed),
        onMutate: async ({id, title, completed}) => {
            await queryClient.cancelQueries({queryKey: 'todoList'})

            const previousTodoList: TodoItemRequest[] | undefined = queryClient.getQueryData('todoList')

            const newTodoList = previousTodoList?.filter((todo) => {
                if (todo.id === id) {
                    todo.title = title;
                    todo.completed = completed;
                }
                return todo;
            });

            console.log('mutate done')
            // Optimistically update to the new value
            queryClient.setQueryData('todoList', newTodoList)

            return {previousTodoList, newTodoList}
        },
    });
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    // const { mutate: deleteTodoList } : UseMutationResult<TodoItemRequest, Error, DeleteTodoItemRequest>
    return useMutation<TodoItemRequest, Error, any>({
            mutationKey: 'todoList',
            mutationFn: async ({id}) => {
                return TodoListApi.delete(id);
            },
            onSuccess: (data, variables, context) => {
                console.log('onSuccess')
            },
            onMutate: async ({id}) => {
                await queryClient.cancelQueries({queryKey: 'todoList'})

                const previousTodoList: TodoItemRequest[] | undefined = queryClient.getQueryData('todoList')

                // const newTodoList = previousTodoList?.filter((todo) => todo.id !== id);

                // delete array in store 불변성 유지 방법.. 필요 밑에거도 싹다 재렌더링됨..
                const newTodoList = previousTodoList?.splice(id-1, 1)
                // Optimistically update to the new value
                queryClient.setQueryData('todoList', previousTodoList?.filter((todo) => todo.id !== id))

                return {previousTodoList, newTodoList}
            },
            onSettled: async () => {
                console.log('onSettled')
                // await queryClient.invalidateQueries({queryKey: 'todolist'})
            }
        }
    );
}