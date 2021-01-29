import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveList, moveCard } from '../actions/Board';
import BoardTitle from '../components/board/BoardTitle';

const Board = (props) => {

    useEffect(() => {
        console.log('props **********', props);
        props.getBoard(props.match.params.id);
    }, []);

    // const onDragEnd = (result) => {
    //     const { source, destination, draggableId, type } = result;
    //     if (!destination) {
    //       return;
    //     }
    //     if (type === 'card') {
    //         props.moveCard(
    //             draggableId, {
    //             fromId: source.droppableId,
    //             toId: destination.droppableId,
    //             toIndex: destination.index,
    //         });
    //     } else {
    //      props.moveList(draggableId, { toIndex: destination.index });
    //     }
    // };

    const { boardDetail } = props;

    return (
      <div>

      </div>
    )
}

const mapStateToProps = ({ board, auth }) => {
    const { boardDetail } = board;
    const { authUser } = auth;
    return { boardDetail, authUser }
};
const mapDispatchToProps = { getBoard, moveCard, moveList };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
