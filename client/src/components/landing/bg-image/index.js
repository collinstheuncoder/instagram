import React from 'react';

import Slideshow from './slideshow';

import { slides } from './index.module.scss';

function InstaBgImg() {
  return (
    <div className={slides}>
      <Slideshow />
    </div>
  )
}

export default InstaBgImg;
