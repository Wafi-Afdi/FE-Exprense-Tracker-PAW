import Image from "next/image";


// komponen internal
import MainContainer from "@/components/main-block/MainContainer";
import Footer from "@/components/main-block/Footer";

export default function Home() {
  return (
    <>
      <div className=" min-h-screen w-full 
        font-[family-name:var(--font-geist-sans)]
        px-[10%]
        flex flex-col items-center justify-between
        mb-10
        "
      >
        <MainContainer />
        
      </div>
      <Footer />
    </>
  );
}
