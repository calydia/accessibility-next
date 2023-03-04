import { ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://drupal.ampere.corrupted.pw/graphql',
  cache: new InMemoryCache()
});
