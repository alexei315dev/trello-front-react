import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreateBoard from '../components/CreateBoard';
import { getBoards } from '../actions/Board';
import { connect, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

const Dashboard = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.authUser) {
            props.getBoards({ userID: props.authUser._id })
        }
    }, [dispatch, props.authUser])

    return (
        <div className="bg-image image-background">
            <div className="main-container">
                <h2 className="text-center pt-2">Your Boards</h2>
                <div className='row d-flex justify-content-center boards'>
                    {props.boards.map((board) => (
                        <Link key={board._id} to={`/pr/board/${board._id}`}>
                            <Button className='board-card'>
                                <span className="mx-auto my-auto">{board.title}</span>
                            </Button>
                        </Link>
                    ))}
                    <CreateBoard />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ board, auth }) => {
    const { boards } = board;
    const { authUser } = auth;
    return { boards, authUser }
};
const mapDispatchToProps = { getBoards };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);