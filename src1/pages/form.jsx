
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSubject } from '../redux/features/subject/subject-slice';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '../components';
const Forms = (props)=> {

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [grade, setGrade] = useState();
    const [image, setImage] = useState();
   

    const dispatch = useDispatch();
    const status = useSelector(state => state.subjects.status);
    const error = useSelector(state => state.subjects.error);

    const handleSubjectNameChange = e => {
        setName(e.target.value );
    }

    const handleCategoryChange = e => {
        setCategory(e.target.value);
    }

    const handleGradeChange = e => {
        setGrade(e.target.value );
    }

    const handleFileChange = e => {
        setImage(e.target.files[0] );
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("grade", grade);
        formData.append("image", image);
        dispatch(createSubject(formData));
       
            props.toggle(); 
        
    }

    if (status === 'loading') {
        return <Loader />;
    }
    if (error) {
        window.alert(error);
    }
    return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
    <form onSubmit={handleSubmit}>
        <ModalHeader toggle={props.toggle}>Add a Subject</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label htmlFor="subjectname">Subject Name:</label>
                <input type="text" className="form-control" id="subjectname" value={name} onChange={handleSubjectNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Department:</label>
                <select className="form-control" id="category" value={category} onChange={handleCategoryChange}>
                    <option value="">Select Department</option>
                    <option value="science">Natural</option>
                    <option value="maths">Social</option>
                    <option value="history">None</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="grade">Grade:</label>
                <select className="form-control" id="grade" value={grade} onChange={handleGradeChange}>
                    <option value="">Select Grade</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                            <option value="9">9</option>
                             <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="file">Cover Image</label>
                <input type="file" className="form-control-file" id="file" onChange={handleFileChange} />
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" type="submit">Save</Button>
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
    </form>
</Modal>

);

}

export default Forms;

