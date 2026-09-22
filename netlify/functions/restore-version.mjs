import { getStore } from "@netlify/blobs";
import { getUser } from "@netlify/identity";

const STORE_NAME =
  "glam-website-control-center";

const DRAFT_KEY =
  "draft/site-state";

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

  const {
    versionId
  } = await request.json();

  if (!versionId) {
    return Response.json(
      {
        error:
          "Version ID required."
      },
      {
        status: 400
      }
    );
  }

  const store =
    getStore(STORE_NAME);

  const version =
    await store.get(
      `history/${versionId}`,
      {
        type: "json",
        consistency: "strong"
      }
    );

  if (!version?.state) {
    return Response.json(
      {
        error:
          "Version not found."
      },
      {
        status: 404
      }
    );
  }

  const restoredAt =
    new Date().toISOString();

  const restoredDraft = {
    ...version.state,

    updatedAt:
      restoredAt,

    restoredAt,

    restoredFrom:
      versionId,

    restoredBy:
      user.email
  };

  /*
    IMPORTANT:
    This restores ONLY the draft.

    It does NOT overwrite
    published/current.
  */
  await store.setJSON(
    DRAFT_KEY,
    restoredDraft
  );

  return Response.json({
    ok: true,

    restoredFrom:
      versionId,

    restoredAt,

    message:
      "Version restored to draft."
  });
}