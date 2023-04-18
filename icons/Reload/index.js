const ReloadIcon = () => {
  // rotated and mirrored arrow line representing a reload icon
  return (
    <div className="reloadIcon">
      <svg fill="currentColor" stroke="currentColor" width="25px" viewBox="0 0 367.14 367.14" transform='rotate(270)matrix(1, 0, 0, -1, 0, 0)'>
        <g>
          <path
            d="M336.554,86.871c-11.975-18.584-27.145-34.707-44.706-47.731L330.801,0H217.436v113.91L270.4,60.691 c40.142,28.131,65.042,74.724,65.042,124.571c0,83.744-68.13,151.874-151.874,151.874S31.694,269.005,31.694,185.262 c0-58.641,32.781-111.009,85.551-136.669l-13.119-26.979C73.885,36.318,48.315,59.1,30.182,87.494 c-18.637,29.184-28.488,62.991-28.488,97.768c0,100.286,81.588,181.874,181.874,181.874s181.874-81.588,181.874-181.874 C365.442,150.223,355.453,116.201,336.554,86.871z"/>
        </g>
      </svg>
    </div>
  );
};

export default ReloadIcon;