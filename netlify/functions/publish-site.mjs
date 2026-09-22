import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const STORE_NAME =
  "glam-website-control-center";

const DRAFT_KEY =
  "draft/site-state";

const PUBLISHED_KEY =
  "published/current";

const HISTORY_INDEX_KEY =
  "history/index";

const HISTORY_LIMIT = 10;

export default async function handler(
  request
) {
  if (request.method !== "POST") {
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

  const draft =
    await store.get(
      DRAFT_KEY,
      {
        type: "json",
        consistency: "strong"
      }
    );

  if (!draft) {
    return Response.json(
      {
        error:
          "No draft exists yet."
      },
      {
        status: 400
      }
    );
  }

  const versionId =
    `version-${Date.now()}`;

  const publishedAt =
    new Date().toISOString();

  const version = {
    id: versionId,
    publishedAt,
    publishedBy:
      user.email,
    state: draft
  };

  await store.setJSON(
    `history/${versionId}`,
    version
  );

  let history =
    await store.get(
      HISTORY_INDEX_KEY,
      {
        type: "json",
        consistency: "strong"
      }
    );

  if (!Array.isArray(history)) {
    history = [];
  }

  history.unshift({
    id: versionId,
    publishedAt,
    publishedBy:
      user.email
  });

  const removed =
    history.slice(
      HISTORY_LIMIT
    );

  history =
    history.slice(
      0,
      HISTORY_LIMIT
    );

  await store.setJSON(
    HISTORY_INDEX_KEY,
    history
  );

  for (const oldVersion of removed) {
    await store.delete(
      `history/${oldVersion.id}`
    );
  }

  const publishedState = {
    ...draft,
    versionId,
    publishedAt,
    publishedBy:
      user.email
  };

  await store.setJSON(
    PUBLISHED_KEY,
    publishedState
  );

  return Response.json({
    ok: true,
    versionId,
    publishedAt
  });
}