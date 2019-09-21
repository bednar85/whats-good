import React from 'react';

import { Spin, Icon } from 'antd';

function Spinner() {
  const spinnerIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;

  return (
    <div className="wg-spinner">
      <Spin indicator={spinnerIcon} />
    </div>
  );
}

export default Spinner;
