import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div>
    
    <h2>Subscribe here</h2>
    <Link href="/dashboard">
    <Button>
      Go to Dashboard
    </Button>
    </Link>
    </div>
  );
}
