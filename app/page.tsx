import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-center mb-4">Jaguar (Pvt) Ltd.</h1>
        <p className="text-lg text-center">We are a leading manufacturer of apparel and accessories.</p>
        <Image src="/favicon.png" alt="Jaguar" width={500} height={500} />
      </main>
    </div>
  );
}
