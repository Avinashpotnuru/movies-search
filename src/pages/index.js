import Image from "next/image";
import { Inter } from "next/font/google";
import Movies from "@/components/Movies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between  pb-10 ">
      <Movies />
    </div>
  );
}
