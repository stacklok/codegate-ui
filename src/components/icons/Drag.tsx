import type { SVGProps } from "react";
const SvgDrag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M13.5 18a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0M7.5 18a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0M13.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0M7.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0M13.5 6a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0M7.5 6a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0"
    />
  </svg>
);
export default SvgDrag;
