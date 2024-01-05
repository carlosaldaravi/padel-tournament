const SVG = ({ type, size }: { type: string; size: string }) => {
  if (type === "couple")
    return (
      <svg className={`size-${size}`} viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="2" fill="currentColor" opacity=".3" />
        <path
          fill="currentColor"
          d="M9 15c-2.7 0-5.8 1.29-6 2.01V18h12v-1c-.2-.71-3.3-2-6-2"
          opacity=".3"
        />
        <path
          fill="currentColor"
          d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24m-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2m0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2z"
        />
      </svg>
    );
  if (type === "ball")
    return (
      <svg
        className={`size-${size}`}
        width="1em"
        height="1em"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M24.81 115.41a103.9 103.9 0 0 1 90.6-90.65a4 4 0 0 1 4.47 3.79a87.82 87.82 0 0 1-91.27 91.33a4 4 0 0 1-3.8-4.47m202.54 20.7c-1.12 0-2.23-.07-3.35-.07a87.84 87.84 0 0 0-87.88 91.41a4 4 0 0 0 4.47 3.79a103.9 103.9 0 0 0 90.6-90.66a4 4 0 0 0-3.84-4.47m-76.89 14.35A103.33 103.33 0 0 1 224 120h3.09a4 4 0 0 0 4.12-4.43a103.91 103.91 0 0 0-90.88-90.89a4 4 0 0 0-4.43 4.12a103.72 103.72 0 0 1-30.36 76.7A103.33 103.33 0 0 1 32 136h-3.09a4 4 0 0 0-4.12 4.43a103.91 103.91 0 0 0 90.88 90.89a4 4 0 0 0 4.43-4.12a103.72 103.72 0 0 1 30.36-76.74"
        />
      </svg>
    );
  if (type === "close")
    return (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`size-${size}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    );
};

export default SVG;
