import React, { Fragment} from 'react';

import style from './landing.module.scss';

function Slideshow() {
  return (
    <Fragment>
      <div className={style['slide-one']}></div>
      <div className={style['slide-two']}></div>
      <div className={style['slide-three']}></div>  
      <div className={style['slide-four']}></div>
    </Fragment>
  )
}

export default Slideshow;
