import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const STORE_NAME =
  "glam-website-control-center";

const HISTORY_INDEX_KEY =
  "history/index";

export default async function handler(
  request
) {
  if (request.method !== "GET") {
    return new Response(
      "Method not allowed",
      {
        status: 405
      }
    );
  }

  const user =
    await getUser();

  if (!user) {
    return Response.json(
      {
        error: "Unauthorized"
      },
      {
        status: 401
      }
    );
  }

  const store =
    getStore(STORE_NAME);

  const history =
    await store.get(
      HISTORY_INDEX_KEY,
      {
        type: "json",
        consistency: "strong"
      }
    );

  return Response.json(
    Array.isArray(history)
      ? history
      : []
  );
}