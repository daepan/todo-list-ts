export const getTodoList = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/user/1/todos')
  return res.json();
}