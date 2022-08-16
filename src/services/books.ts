import { fetchHasura, Token } from "src/lib/hasura";

import {
  fetch as fetchBooksQuery,
  insert_one as insertBookQuery,
  delete_py_pk as deleteBookQuery,
} from "../queries/books";

export const fetch = (token: Token) =>
  fetchHasura(
    {
      query: fetchBooksQuery,
    },
    token
  );

export const insert = (token: Token, variables: { name: string }) =>
  fetchHasura(
    {
      query: insertBookQuery,
      variables,
    },
    token
  );

export const delete_py_pk = (token: Token, variables: { id: string }) =>
  fetchHasura(
    {
      query: deleteBookQuery,
      variables,
    },
    token
  );
