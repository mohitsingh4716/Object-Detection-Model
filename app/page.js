import ObjectDetection from "@/components/object-detection";


export default function Home() {
  return (
      <main className="flex min-h-screen items-center flex-col p-8">
        <h1 className="gradient-title font-extrabold text-3xl m:text-6xl lg:text-8xl tracking-tighter md:p-6 text-center"> Object detection Model</h1>

        <ObjectDetection/>
      </main>
  );
}
