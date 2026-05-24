import { DirectControlRoom } from "@/components/DirectControlRoom";
import { demoState } from "@/lib/demo-data";

export default function Page() {
  return <DirectControlRoom initialState={demoState} />;
}
