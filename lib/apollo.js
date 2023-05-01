import { ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://accessibility-strapi.ampere.corrupted.pw/graphql',
  cache: new InMemoryCache()
});
