import React, { useMemo, useState } from "react";
import Table from "./Table";
import "./contactlist.scss";
import { Link } from "react-router-dom";
import Delete from "../Delete/DeleteModal";
import { toast } from "react-toastify";
import { _removeData, _storeData } from "../constants/storage";
import { AiFillPlusCircle } from "react-icons/ai";

const ContactList = () => {
  const [show, setShow] = useState(false);
  const [selectedrow, setSelectedrow] = useState("");
  const handleClose = () => {
    setShow(false);
    setSelectedrow("");
  };
  const handleShow = (_row) => {
    setShow(true);
    setSelectedrow(_row);
  };
  const COLUMNS = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Whatsapp",
      accessor: "checked",
      Cell: (row) => {
        return (
          <>
            <div className="activestatus-wrapper">
              {row.value === true ? (
                <span className="active-true"></span>
              ) : (
                <span className="active-false"></span>
              )}
            </div>
          </>
        );
      },
    },
    {
      Header: "Action",
      id: "id",
      accessor: (row) => {
        return (
          <div className="btn-wrap">
            <Link to={`/edit-contact/${row.id}`}>
              {" "}
              <button >Edit</button>{" "}
            </Link>

            <button row={row} onClick={() => handleShow(row)}>
              Delete{" "}
            </button>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  var data = JSON.parse(localStorage.getItem("contactdetails"));

  console.log("daaa", data); 

  const deleteId = selectedrow.id;

  const deleteContact = () => {
    const index = data.findIndex((product) => product.id === deleteId)
    console.log("datattttt",index, deleteId)
    if(index > -1){
      data.splice(index, 1)
      
    }

    _storeData("contactdetails", JSON.stringify(data))
    toast.success("Contact deleted Successfully")
    handleClose()
    // _removeData("contactdetails");
  };

  return (
    <React.Fragment>
      <h1 className="header">Contact List</h1>
      <div className="add-icon">
      <Link to={'/add-contact'}><AiFillPlusCircle className="icon"/>
      </Link> 
      </div>
      {data.length == 0  ? <p>No Data Found </p> :
       <Table data={data} columns={columns} />}
       {/* {data && <Table data={data} columns={columns} />} */}
      <Delete show={show} onHide={handleClose} onDelete={deleteContact} />
    </React.Fragment>
  );
};

export default ContactList;
