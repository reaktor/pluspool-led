const ReloadIcon = ({ props }) => {
  return (
    <div>
      <svg
        fill="currentColor"
        strokeWidth={0.01}
        width={26}
        height={26}
        // transform="matrix(0 -1 -1 0 0 0)"
        viewBox="0 0 1000 1000"
        {...props}
      >
        <path
          d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"/>
      </svg>
    </div>
  );
};

export default ReloadIcon;