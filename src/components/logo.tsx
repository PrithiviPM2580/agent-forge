import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo() {
  return (
    <Link href="/" prefetch className="flex items-center gap-2">
      <div className={cn("size-7 flex-center rounded-[10px] bg-primary")}>
        <Image
          src="/logo.svg"
          alt="Node Pilot"
          width={71}
          height={43}
          style={{ width: "20px", height: "auto" }}
        />
      </div>

      <span className={cn("font-semibold text-base")}>Node Pilot</span>
    </Link>
  );
}
