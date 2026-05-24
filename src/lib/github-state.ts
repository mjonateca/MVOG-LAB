import type { ControlRoomState } from "./types";

const OWNER = "mjonateca";
const REPO = "MVOG-LAB";
const PATH = "data/state.json";
const API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

function githubHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json"
  };
}

export async function loadStateFromGitHub(): Promise<ControlRoomState> {
  const response = await fetch(API_URL, {
    headers: githubHeaders(),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const file = await response.json() as { content: string; sha: string };
  const decoded = Buffer.from(file.content, "base64").toString("utf-8");
  return JSON.parse(decoded) as ControlRoomState;
}

export async function saveStateToGitHub(state: ControlRoomState): Promise<void> {
  // Get current SHA (required for updates)
  const currentResponse = await fetch(API_URL, {
    headers: githubHeaders(),
    cache: "no-store"
  });

  if (!currentResponse.ok) {
    throw new Error(`Cannot read current state: ${currentResponse.status}`);
  }

  const currentFile = await currentResponse.json() as { sha: string };
  const content = Buffer.from(JSON.stringify(state, null, 2)).toString("base64");

  const updateResponse = await fetch(API_URL, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message: "Update Lab state",
      content,
      sha: currentFile.sha
    })
  });

  if (!updateResponse.ok) {
    const error = await updateResponse.json().catch(() => ({})) as { message?: string };
    throw new Error(`Failed to save state: ${updateResponse.status} ${error.message || ""}`);
  }
}
