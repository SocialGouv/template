import { createLightship } from "lightship";

export default async function handleGracefulShutdown() {
  const lightship = await createLightship();
  lightship.signalReady();
}
