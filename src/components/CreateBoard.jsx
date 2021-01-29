import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addBoard } from '../actions/Board';

const CreateBoard = (props) => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('');
    const [validated, setValidated] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const onSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            props.addBoard({ title: title, userID: props.authUser._id }, props.history);
            handleClose();
        }
    };

    return (
        <>
            <Button className='board-card create-board-card' onClick={handleShow}>
                <span className="mx-auto my-auto"><i className="fa fa-plus" aria-hidden="true"></i> Create new board</span>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Board Modal</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Add a Title</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a Title.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type='submit' variant="primary">
                        Create Board
                    </Button>
                </Modal.Footer> 
                </Form>
            </Modal>
        </>
    )
}

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
const mapDispatchToProps = { addBoard };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBoard));
