"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ReactNode } from "react";

const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
} as const;

// Create HTTP link for Apollo Client
const httpLink = new HttpLink({
  uri: `${API_CONFIG.baseURL}/graphql`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
    },
    query: {
      errorPolicy: "all",
    },
  },
});

export const ApolloClientProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
