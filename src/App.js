import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [phones, setPhones ] = useState(null);
  const [showPhones, getPhones ] = useState(false);
  const [isDelete, handleDeleteOption ] = useState(false);
  const [isAdd, handleAddOption] = useState(false);

  const retrievePhoneDetails = () => {
    return axios
            .get("http://localhost:5000/test/phone")
            .then(response => setPhones(response.data))
            .catch(error => console.log(error))
  }

  useEffect(() => {
    return retrievePhoneDetails();
  }, [])

  const checkPhones = () => {
    retrievePhoneDetails();
    getPhones(true)
    handleDeleteOption(false)
    handleAddOption(false)
  }

  const deletePhone = () => {
    handleDeleteOption(true)
  }

  const addPhone = () => {
    handleAddOption(true)
  }

  const deleteAction = (id) => {
    return axios
            .delete(`http://localhost:5000/test/phone/${id}`)
            .then(response => alert(response.data.message))
            .catch(error => console.log(error))
  }

  const handleSubmit = () => {
    const phoneName = document.getElementById("inputName").value;
    const phoneInfo = document.getElementById("inputDesc").value;

    const data = {title: "New Phone", name: phoneName, description: phoneInfo}

    return axios
            .post(`http://localhost:5000/test/phone`, data)
            .then(response => alert(response.data.message))
            .catch(error => console.log(error))
  }

  const renderDropDown = () => {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          select any phone
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {phones?.map((item, index) =>
            (
              <li key={index}><button className="dropdown-item" onClick={() => deleteAction(item._id)}>{item.name}</button></li>
            )
          )}
        </ul>
      </div>
    )
  }

  const renderAddPhoneOptions = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3 row">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputName" required />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputDesc" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputDesc" />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </div>
        </div>
      </form>
    )
  }

  const renderPhoneDetails = () => {
    return phones?.map((item, index)=>(
      <div key={index} style={{flex: `0 1 24%`}}>
        <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="25%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
        </div>
      </div>
    ))
  }

  return (
    <div className="container">
      <div className="p-3 mb-2 bg-info text-white">Mern Example</div>
      <button type="button" className="btn btn-info" onClick={() => checkPhones()}>Check Available Phones</button>
      <button type="button" className="btn btn-primary" onClick={() => addPhone()}>Add Phone Detail</button>
      <button type="button" className="btn btn-secondary" onClick={() => deletePhone()}>Delete Phone Detail</button>
      {showPhones && !isDelete && !isAdd && <div className="card" style={{flexDirection: `row`, justifyContent: `space-between`}}>
        {renderPhoneDetails()}
      </div>}
      {isDelete && renderDropDown()}
      {isAdd && renderAddPhoneOptions()}
    </div>
  );
}

export default App;
