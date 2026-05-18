import { DirectControlRoom } from "@/components/DirectControlRoom";
import { getControlRoomState } from "@/lib/server-repository";

export default async function Page() {
  const initialState = await getControlRoomState();
  return <DirectControlRoom initialState={initialState} />;
}
