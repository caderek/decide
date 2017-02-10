export const LIST_TODOS = 'LIST_TODOS'
export const GET_TODO = 'GET_TODO'

export const listTodos = {
  type: LIST_TODOS
}

export const getTodo = (id) => ({
  type: GET_TODO,
  query: {
    id
  }
})
