import { Portfolio } from "@/components/portfolio";
import { DEFAULT_DIRECTION } from "@/lib/directions";

export default function Home() {
  return <Portfolio direction={DEFAULT_DIRECTION} />;
}
