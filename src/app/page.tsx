import { DirectControlRoom } from "@/components/DirectControlRoom";
import { loadStateFromGitHub } from "@/lib/github-state";
import { demoState } from "@/lib/demo-data";

export default async function Page() {
  const initialState = await loadStateFromGitHub().catch(() => demoState);
  return <DirectControlRoom initialState={initialState} />;
}
