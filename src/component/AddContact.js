import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { _storeData } from "../constants/storage";
import "./addcontact.scss";


const AddContact = () => {
  const [check, setCheck] = useState(false);
  var id;
  const navigate = useNavigate();
  const initialState = {
    fname: "",
    phone: "",
    type: "",
  };

  const [addcontact, setContact] = useReducer(
    (currentdata, newdata) => ({ ...currentdata, ...newdata }),
    initialState
  );

  const { fname, phone, type } = addcontact;

  const addContactHandler = (e) => {
    const { name, value } = e.target;
    setContact({ [name]: value });
  };
  var contactAdd = JSON.parse(localStorage.getItem("contactdetails")||"[]");

  var dataObject = {
    id: newUserId(),
    name: fname,
    phone: phone,
    type: type,
    checked: check,
  };

  const checkHandler = () => {
    setCheck(!check);
  };

  function newUserId() {
    return contactAdd.length ? Math.max(...contactAdd.map(x => x.id)) + 1 : 1;
    }

  contactAdd.push(dataObject);
  const submitHandler = (e) => {
    e.preventDefault();
    _storeData("contactdetails", JSON.stringify(contactAdd))
    toast.success("Contact added Successfully")
    navigate('/')
  }; 

  return (
    <React.Fragment>
      <div className="add-form">
        <h1 className="add-header">Add Contact</h1>
        <form onSubmit={submitHandler}>
          <div className="row add-contact-form">
            <div className="form-group col-lg-12">
              <label className="form-label">First Name</label>
              <input
                name="fname"
                type="text"
                className="form-control"
                placeholder="Enter the First Name"
                value={fname}
                onChange={addContactHandler}
                required
              />
            </div>
            <div className="form-group col-lg-12">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                type="text"
                className="form-control "
                placeholder="Enter the Phone Number"
                value={phone}
                onChange={addContactHandler}
                required
              />
            </div>

            <div className="form-group  col-lg-12">
              <label className="form-label">Type</label>
              <select
              className="form-control"
                name="type"
                value={type}
                onChange={addContactHandler}
              >
                <option  value="" disabled selected hidden>Select Option</option>
                <option value="personal">Personal</option>
                <option value="office">Office</option>
              </select>
            </div>
            <div className="form-groups ">
              <label className="form-label ">Whtasapp</label>
              <input
             
                type="checkbox"
                id="whtasapp"
                name="checked"
                value={check}
                onChange={checkHandler}
              />
            </div>
          </div>
          <button type="submit" className="btn-sumbit">Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddContact;
