import Header from "@/components/header";
import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("@/components/home-content"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto p-8">
        <Header />
        <HomeContent />
      </div>
    </>
  );
}
