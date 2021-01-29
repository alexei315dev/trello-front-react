import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const BoardTitle = ({ board }) => {
  const [title, setTitle] = useState(board.title);

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  return (
    <h2 className='board-title'>
      {board.title}
    </h2>
  );
};

export default BoardTitle;
