// The AD mark. Both letters hang from one line, the way Bengali letters hang
// from their matra; the line is also the top edge of a film frame. The A's
// right side and the D's spine are the same stroke, so the two letters are
// joined into one shape. The D's bowl is heavier on the right, like a brush.
export default function AdLogo({ className = 'ad-logo', title = 'Ankit Dey' }) {
  return (
    <svg className={className} viewBox="0 0 120 100" fill="currentColor" role="img" aria-label={title}>
      <rect x="2" y="10" width="116" height="9" />
      <g className="ad-letters">
        <polygon points="42,19 50,19 22,90 6,90" />
        <polygon points="33,61 50,61 50,69 29.9,69" />
        <rect x="50" y="19" width="10" height="71" />
        <path fillRule="evenodd" d="M60 19 A52 35.5 0 0 1 60 90 Z M58 28.5 A38 26 0 0 1 58 80.5 Z" />
      </g>
    </svg>
  );
}
