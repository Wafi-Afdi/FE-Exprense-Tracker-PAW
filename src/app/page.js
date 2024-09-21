import Image from "next/image";

// komponen internal
import MainContainer from "@/components/main-block/MainContainer";
import Footer from "@/components/main-block/Footer";
import { ModalProvider } from "@/context/ModalContextMain";

export default function Home() {
  return (
    <>
      <ModalProvider>
        <div
          className=" min-h-screen w-full 
            font-[family-name:var(--font-geist-sans)]
            px-[10%]
            flex flex-col items-center justify-between
            mb-10
            z-[-1]
            "
        >
          <MainContainer />
        </div>
        <Footer />
      </ModalProvider>
    </>
  );
}
