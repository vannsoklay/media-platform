import { AspectRatioOption } from "@/types/posts";
import { Maximize2, Square, Smartphone, Monitor } from "lucide-react";

export const aspectRatioOptions: AspectRatioOption[] = [
  {
    key: "original",
    label: "Original",
    icon: Maximize2,
    ratio: "auto",
    objectFit: "contain",
  },
  {
    key: "square",
    label: "Square (1:1)",
    icon: Square,
    ratio: "1/1",
    objectFit: "cover",
  },
  {
    key: "portrait",
    label: "Portrait (4:5)",
    icon: Smartphone,
    ratio: "4/5",
    objectFit: "cover",
  },
  {
    key: "landscape",
    label: "Landscape (16:9)",
    icon: Monitor,
    ratio: "16/9",
    objectFit: "cover",
  },
  {
    key: "story",
    label: "Story (9:16)",
    icon: Smartphone,
    ratio: "9/16",
    objectFit: "cover",
  }
];