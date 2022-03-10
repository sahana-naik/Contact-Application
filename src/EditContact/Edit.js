import React, { useReducer, useState } from "react";
import { _storeData } from "../constants/storage";
import { useParams } from "react-router";
import './Edit.scss';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Avatar } from "@mui/material";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const EditContact = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  var data = JSON.parse(localStorage.getItem("contactdetails"));
  const editIndex = data.findIndex((product) =>
    product.id == id
)

  const finaleditData = data[editIndex];

  const initialState = {
    fname: finaleditData.name,
    phone: finaleditData.phone,
    type: finaleditData.type,
  };

  const [check, setCheck] = useState(finaleditData.checked);

  const [addcontact, setContact] = useReducer(
    (currentdata, newdata) => ({ ...currentdata, ...newdata }),
    initialState
  );

  const { fname, phone, type } = addcontact;

  const addContactHandler = (e) => {
    const { name, value } = e.target;
    setContact({ [name]: value });
  };
 

  const checkHandler = () => {
    setCheck(!check);
  };


  const editHandler = (e) => {
    e.preventDefault();
  
    const dataNew = data.map(obj => {
      // console.log("obh", obj.id, id)
      if (obj.id == id) {
        return {...obj,  name: fname,
          phone: phone,
          type: type,
          checked: check,
        img: url};
      } 
      return obj;
    });
    console.log("new Data", dataNew);
    _storeData("contactdetails", JSON.stringify(dataNew))
    toast.success("Contact edited Successfully")
    navigate('/')
  };
  
  const [image, setImage] = useState(finaleditData.img);
  const [url, setUrl] = useState(finaleditData.img);
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const imgSubmit = (e) => {
    e.preventDefault();
    const imageRef = ref(storage,`${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((err) => {
            console.log("imggerr", err.message);
          });
      })
      .catch((err) => {
        console.log("imggeruploadimgerr", err.message);
      });
  };

  return (
    <React.Fragment>
      <div className="add-form">
      <h1 className="add-header">Edit Contact</h1>
        <form onSubmit={editHandler}>
          <div className="row add-contact-form">
            <div className="form-group col-lg-12">
              <label className="form-label">Full Name</label>
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
                className="form-control"
                placeholder="Enter the Phone Number"
                value={phone}
                onChange={addContactHandler}
                required
              />
            </div>
            <div className="form-group col-lg-12 mb-5 pd-5">
              <label className="form-label">Img</label>
              <Avatar
                alt="img"
                src={url} 
                sx={{ width: 56, height: 56 }}
              />
              <input
              name="image"
                type="file"
                className="form-control "
                onChange={handleImageChange}
                required
              />
              <button onClick={imgSubmit}>Sumbit</button>
            </div>

            <div className="form-group col-lg-12 mt-5">
              <label className="form-label">Type</label>
              <select
                 className="form-control"
                name="type"
                value={type}
                onChange={addContactHandler}
              >
                <option>Personal</option>
                <option>Office</option>
              </select>
            </div>
            <div className="form-groups">
              <label className="form-label">Whtasapp</label>
              <input
                type="checkbox"
                id="whtasapp"
                name="checked"
                checked = {check}
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

export default EditContact;
