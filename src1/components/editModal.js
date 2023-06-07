import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function EditExamModal(props) {
    const [examData, setExamData] = useState({
        year: '',
        subject_id: '',
        time: '',
      });
  const url="http://127.0.0.1:8000/exam/exam-update";
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExamData({ ...examData, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();

        axios
          .putput(`${url}/${props.id}`, examData)
          .then((response) => {
            console.log(response.data);
            // do something with the updated exam data
          })
          .catch((error) => {
            console.log(error);
            // handle error
          });
      };

      return (
        <Modal {...props} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Exam</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formYear">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  name="year"
                  value={examData.year}
                  onChange={handleInputChange}
                  placeholder="Enter year"
                />
              </Form.Group>
              <Form.Group controlId="formSubjectId">
                <Form.Label>Subject ID</Form.Label>
                <Form.Control
                  type="text"
                  name="subject_id"
                  value={examData.subject_id}
                  onChange={handleInputChange}
                  placeholder="Enter subject ID"
                />
              </Form.Group>
              <Form.Group controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={examData.time}
                  onChange={handleInputChange}
                  placeholder="Enter time"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      );
    }

export default EditExamModal;
