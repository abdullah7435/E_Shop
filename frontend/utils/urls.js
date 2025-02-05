// This constant stores the Strapi API token fetched from the environment variables.
export const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// This constant holds the API URL for making API requests.
// If NEXT_PUBLIC_API_URL is set in the environment variables, it will be used.
// Otherwise, the default URL "http://127.0.0.1:1337" will be used for local development.
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337";
