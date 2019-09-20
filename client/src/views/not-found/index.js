import React from 'react';
import { Link } from 'react-router-dom';

// import style from './index.module.scss';

function NotFoundPage() {
  return (
    <div>
      <p>404! Nothing to see here.</p>
      <p>
        Return to <Link to='/home'>home</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
