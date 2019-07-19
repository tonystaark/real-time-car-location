import React from 'react';
import './marker.scss';

const Marker = (props) => {
  const { dataTip, dataFor, color, name, text, onMouseOver, ref } = props;
  return (
    <div className="marker"
      style={{ backgroundColor: color, cursor: 'pointer'}}
      title={name}
      data-tip={dataTip}
      data-for={dataFor}
      onMouseOver = {onMouseOver}
      >
        <span className="marker-text">{text}</span>
    </div>
  );
};

export default Marker;