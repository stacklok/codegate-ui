import type { SVGProps } from "react";
const SvgFlipBackward = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 20 15"
    {...props}
  >
    <path
      stroke="#2E323A"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 5h13.5a4.5 4.5 0 1 1 0 9H10M1 5l4-4M1 5l4 4"
    />
  </svg>
);
export default SvgFlipBackward;
