import { ControlRoomApp } from "@/components/ControlRoomApp";
import { getControlRoomState } from "@/lib/server-repository";

export default async function Page() {
  const initialState = await getControlRoomState();
  return <ControlRoomApp initialState={initialState} />;
}
