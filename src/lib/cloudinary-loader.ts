export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const marker = "/image/upload/";
  const index = src.indexOf(marker);
  if (index === -1) return src;

  const transform = ["f_auto", "c_limit", `w_${width}`, `q_${quality ?? "auto"}`].join(",");
  return `${src.slice(0, index + marker.length)}${transform}/${src.slice(index + marker.length)}`;
}
