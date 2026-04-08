"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { CONFIG } from "@/lib/config";

const Camera3D = dynamic(() => import("@/components/3d/Camera3D"), {
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full">
      <Image
        src={CONFIG.cameraFallbackImage}
        alt="Camera preview fallback"
        fill
        className="camera-spin object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  )
});

type LazyCamera3DProps = {
  sceneUrl: string;
  unstyled?: boolean;
  className?: string;
};

function isLikelyValidSplineScene(url: string) {
  if (!url) return false;
  if (url.includes("your-scene")) return false;
  return /^https:\/\/prod\.spline\.design\/.+\/scene\.splinecode(\?.*)?$/.test(url);
}

export function LazyCamera3D({ sceneUrl, unstyled = false, className }: LazyCamera3DProps) {
  const canRenderSpline = CONFIG.splineEnabled && isLikelyValidSplineScene(sceneUrl);
  const fallbackNode = (
    <div className="relative h-full w-full">
      <Image
        src={CONFIG.cameraFallbackImage}
        alt="Camera preview fallback"
        fill
        className="camera-spin object-contain"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );

  const content = canRenderSpline ? <Camera3D sceneUrl={sceneUrl} fallback={fallbackNode} /> : fallbackNode;

  if (unstyled) {
    return <div className={className ?? "h-full w-full"}>{content}</div>;
  }

  return <div className="theme-card h-[360px] w-full overflow-hidden rounded-2xl sm:h-[420px]">{content}</div>;
}

