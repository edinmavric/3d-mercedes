"use client";

export function Lighting() {
  return (
    <>
      <hemisphereLight args={["#e8eaef", "#0c0c0e", 0.55]} />
      <directionalLight position={[-4, 5, 4]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[5, 3, -2]} intensity={0.55} color="#bcd1ff" />
      <directionalLight position={[0, 4, -6]} intensity={1.0} color="#ffffff" />
      <directionalLight position={[0, -2, 4]} intensity={0.25} color="#ffffff" />
    </>
  );
}
