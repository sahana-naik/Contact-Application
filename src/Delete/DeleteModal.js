import React from "react";
import { Modal } from "react-bootstrap";
import { FcCancel } from "react-icons/fc";
import './delete.scss'

//This model is used 3 times
const Delete = ({ show, onHide, onDelete, loading }) => {


  return (
    <React.Fragment>
      <Modal show={show} onHide={onHide} size="sm" className="delete-modal">
        <Modal.Body className="custom-modal-body">
          <FcCancel className="info-icon" />
          <h4 className="modal-info-text">Heads Up!</h4>
          <p className="modal-subtext">Are You Sure?</p>
          <p className='modal-text'>This process cannot be undone</p>
        </Modal.Body  >
        <Modal.Footer className="custom-modal-footer">
          <button onClick={onHide} className="modal-btn close-modal-btn">Close</button>
          <button  onClick={onDelete}  className="modal-btn continue-modal-btn">Delete</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Delete;
