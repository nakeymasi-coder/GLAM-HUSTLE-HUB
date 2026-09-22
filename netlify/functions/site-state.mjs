import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const STORE_NAME = "glam-website-control-center";
const DRAFT_KEY = "draft/site-state";
const PUBLISHED_KEY = "published/current";

async function requireAdmin() {
  const user = await getUser();

  if (!user) {
    return {
      error: new Response(
        JSON.stringify({
          error: "Unauthorized"
        }),
        {
          status: 401,
          headers: {
            "content-type": "application/json"
          }
        }
      )
    };
  }

  return { user };
}

export default async function handler(request) {
  const url = new URL(request.url);

  const mode =
    url.searchParams.get("mode") ||
    "draft";

  const store = getStore(STORE_NAME);

  if (request.method === "GET") {
    if (mode === "published") {
      const published =
        await store.get(
          PUBLISHED_KEY,
          {
            type: "json",
            consistency: "strong"
          }
        );

      return Response.json(
        published || null
      );
    }

    const auth =
      await requireAdmin();

    if (auth.error) {
      return auth.error;
    }

    const draft =
      await store.get(
        DRAFT_KEY,
        {
          type: "json",
          consistency: "strong"
        }
      );

    return Response.json(
      draft || null
    );
  }

  if (request.method === "POST") {
    const auth =
      await requireAdmin();

    if (auth.error) {
      return auth.error;
    }

    const body =
      await request.json();

    const draft = {
      ...body,
      updatedAt:
        new Date().toISOString(),
      updatedBy:
        auth.user.email
    };

    await store.setJSON(
      DRAFT_KEY,
      draft
    );

    return Response.json({
      ok: true,
      updatedAt:
        draft.updatedAt
    });
  }

  return new Response(
    "Method not allowed",
    {
      status: 405
    }
  );
}