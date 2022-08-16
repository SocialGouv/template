export const fetch = `
query MyQuery {
  books(order_by: {name: asc}) {
    id
    name
  }
}
`;

export const insert_one = `
mutation MyMutation($name: String!) {
  insert_books_one(object: {name: $name}) {
    id
    name
    user_id
  }
}
`;

export const delete_py_pk = `
mutation MyMutation($id: uuid!) {
  delete_books_by_pk(id: $id) {
    id
    name
    user_id
  }
}
`;
