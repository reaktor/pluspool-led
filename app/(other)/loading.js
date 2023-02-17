import React from 'react';
import ProgressBar from '../../components/ProgressBar';


//Separated Loading components for each grouped route
//this fixed an issue where sometimes the managed suspense would continue to show the loading status
//even though the route segment was ready to render. This issue was occurring in dev mode, where there's no route prefetch
export default function Loading() {
  return <ProgressBar/>
}