import Link from "next/link";
import SplineHero from "@/app/components/home/SplineHero";
import ResearchHighlights from "@/app/components/home/ResearchHighlights";
import LabMission from "@/app/components/home/LabMission";

export default function Home() {
  const splineUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || "";

  return (
    <>
      <SplineHero sceneUrl={splineUrl} />
      <ResearchHighlights />
      <LabMission />
    </>
  );
}
