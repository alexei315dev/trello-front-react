import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveList, moveCard } from '../actions/Board';
import BoardTitle from '../components/board/BoardTitle';
import CreateList from '../components/board/CreateList';
import List from '../components/list/List';

const Board = (props) => {

    useEffect(() => {
        console.log('props **********', props);
        props.getBoard(props.match.params.id);
    }, []);

    const onDragEnd = (result) => {
        const { source, destination, draggableId, type } = result;
        if (!destination) {
          return;
        }
        if (type === 'card') {
            props.moveCard(
                draggableId, {
                fromId: source.droppableId,
                toId: destination.droppableId,
                toIndex: destination.index,
            });
        } else {
         props.moveList(draggableId, { toIndex: destination.index });
        }
    };

    const { boardDetail } = props;
    
    return props.boardDetail ? (
        <div
          className='board-and-navbar'
          style={{
            backgroundImage:
              'url(' +
              (boardDetail.backgroundURL
                ? boardDetail.backgroundURL
                : 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80') +
              ')',
          }}
        >
          <section className='board'>
            <div className='board-top'>
              <div className='board-top-left'>
                <BoardTitle board={boardDetail} />
              </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                {(provided) => (
                  <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                    {boardDetail.lists.map((listId, index) => (
                      <List key={listId} listId={listId} index={index} />
                    ))}
                    {provided.placeholder}
                    <CreateList />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>
        </div>
    ): null
}

const mapStateToProps = ({ board, auth }) => {
    const { boardDetail } = board;
    const { authUser } = auth;
    return { boardDetail, authUser }
};
const mapDispatchToProps = { getBoard, moveCard, moveList };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
