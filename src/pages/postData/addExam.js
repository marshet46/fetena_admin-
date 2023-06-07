
import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createSubject } from '../../redux/features/subject/subject-slice';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '../../components';
import { createExam } from '../../redux/features/exam/exam-slice';
const Forms = (props)=> {

    const [time, setTime] = useState();
    const [year, setYear] = useState();
    const [subject_id, setSubject_id] = useState();
    // const [image, setImage] = useState();


    const dispatch = useDispatch();
    const status = useSelector(state => state.exams.status);
    const error = useSelector(state => state.exams.error);

    const handleTimeChange = e => {
        setTime(e.target.value );
    }

    const handleYearChange = e => {
        setYear(e.target.value);
    }

    const handleSubjectIdChange = e => {
        setSubject_id(e.target.value );
    }

    // const handleFileChange = e => {
    //     setImage(e.target.files[0] );
    // }
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/subject/subject-list/')
        .then(response => {
          setSubjects(response.data.data);
        })
        .catch(error => {
          console.log(error);
        })
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("time", time);
        formData.append("year", year);
        formData.append("subject_id", subject_id);
        // formData.append("image", image);

        dispatch(createExam(formData))
        .then((response) => {
          // Display success alert
          alert("Exam created successfully!");
        })
        .catch((error) => {
          // Display error alert
          alert("Error creating Exam: " + error.message);
        })
            props.toggle()

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
        <ModalHeader toggle={props.toggle}>Add a Exam</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <label htmlFor="subjectname">Total Exam Time:</label>
                <input type="text" className="form-control" id="time" value={time} onChange={handleTimeChange} />
            </div>
            <div className="form-group">
                <label htmlFor="category">Year:</label>
                <select className="form-control" id="year" value={year} onChange={handleYearChange}>
                    <option value="">Select Year</option>
                    {
                    // Generate the option list of years using a loop
                    Array.from({length: 33}, (_, i) => 1990 + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))
                    }
                </select>
                </div>
            <div className="form-group">
                <label htmlFor="subject_id">select subject:</label>
                <select className="form-control" id="subject_id" value={subject_id} onChange={handleSubjectIdChange}>
                    <option value="">Select Subject</option>
                     
                    {subjects.map(subject => (
                        <option value={subject.id}>{subject.name}</option>
                    ))}
                </select>
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
