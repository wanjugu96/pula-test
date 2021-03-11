import { initializeApollo } from "./apolloClient";

export async function dispatchQuery(query = {}, variables = {}) {
  const client = initializeApollo();
  const response = await client.query({
    query: query,
    variables: variables,
  });

  return response;
}

export async function dispatchMutation(mutation = {}, variables = {}) {
  const client = initializeApollo();

  const response = await client.mutate({
    mutation: mutation,
    variables: variables,
  });

  return response;
}
