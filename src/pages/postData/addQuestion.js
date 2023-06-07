
import React, { useState,useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion } from '../../redux/features/questions/question-slice';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '../../components';
const Forms = (props)=> {

    const [question, setQuestion] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [examId, setExamId] = useState('');
    const [image, setImage] = useState('default-image.jpg');
    const [passage, setPassage] = useState('');
    const [A, setA] = useState('');
    const [B, setB] = useState('');
    const [C, setC] = useState('');
    const [D, setD] = useState('');
    const [answer, setAnswer] = useState('');
    const [explanation, setExplanation] = useState('');
    const [time, setTime] = useState('');
    const dispatch = useDispatch();
    const status = useSelector(state => state.questions.status);
    const error = useSelector(state => state.questions.error);
    const [subjects, setSubjects] = useState([]);
    const [exams, setExam] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/subject/subject-list/')
        .then(response => {
          setSubjects(response.data.data);
        })
        .catch(error => {
          console.log(error);
        })
        axios.get('http://127.0.0.1:8000/exam/exam-list/')
        .then(response => {
          setExam(response.data.data);
        })
        .catch(error => {
          console.log(error);
        })
    
    }, []);

   

    const handleFileChange = e => {
        setImage(e.target.files[0] );
    }

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("question", question);
        formData.append("subjectId", subjectId);
        formData.append("examId", examId);
        formData.append("image", image);
        formData.append("passage",passage );
        formData.append("A",A );
        formData.append("B", B);
        formData.append("C",C );
        formData.append("D",D );
        formData.append("answer",answer );
        formData.append("explanation",explanation );
        formData.append("time",time );
        // check the form values are empty or not 
    //   if(!question || !subjectId || !examId || !A || !B|| !C|| !D ||answer ){
    //     alert("please fill the form correctly!");
    //     } else {
        dispatch(createQuestion(formData))
        .then((response) => {
          // Display success alert
          alert("Question created successfully!");
        })
        .catch((error) => {
          // Display error alert
          alert("Error creating question: " + error.message);
        })
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
        <ModalHeader toggle={props.toggle}>Add a Question</ModalHeader>
        {status === 'loading' && <p>Loading...</p>}
  
      {status === 'failed' && <p>Error creating question: {error}</p>}
        <ModalBody>
            <div className="form-group">
                <label className="pb-2" htmlFor="question">Question:</label>
                <textarea
                    type="text"
                    className="form-control"
                    rows={5} // Set the number of rows
                    cols={50}
                    id="question"
                    placeholder={"enter question "}
                    value={question || question  === '' ? question: 'no question '}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="A">option A:</label>
                <input
                    type="text"
                    className="form-control"
                    id="A"
                    placeholder={"option A"}
                    value={ A||A  === '' ?A : 'no option A '}
                    onChange={(e) => setA(e.target.value)}
                    required
                />
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="B">Option B:</label>
                <input
                    type="text"
                    className="form-control"
                    id="B"
                    placeholder={"option B"}
                    value={B || B === '' ? B: 'no option B'}
                    onChange={(e) => setB(e.target.value)}
                    required
                />
            </div> <div className="form-group">
                <label className="pb-2" htmlFor="C">option C:</label>
                <input
                    type="text"
                    className="form-control"
                    id="C"
                    placeholder={"option C"}
                    value={ C|| C === '' ?C : 'no option C'}
                    onChange={(e) => setC(e.target.value)}
                    required
                />
                <div className="form-group">
                <label className="pb-2" htmlFor="D">option D:</label>
                <input
                type="text"
                className="form-control"
                id="D"
                placeholder="option d"
                value={D || D === '' ? D : 'no option D'}
                onChange={(e) => setD(e.target.value)}
                />
            </div>
            </div> <div className="form-group">
                <label className="pb-2" htmlFor="explanation">explanation:</label>
                <input
                    type="text"
                    className="form-control"
                    id="explanation"
                    placeholder={"answer explanation"}
                    value={explanation|| explanation===''? explanation: "no explanation"}
                    onChange={(e) => setExplanation(e.target.value)}
                />
            </div>
            <br />
             <div className="form-group">
                <label className="pb-2" htmlFor="time">Time:</label>
                    <input
                    type="text"
                    className="form-control"
                    id="time"
                    placeholder={"time take for this question "}
                    value={time||time===''? time: '1 minutes'}
                    onChange={(e) => setTime(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label className="pb-2" htmlFor="passage">passage:</label>
                <input type="text" className="form-control" id="passage" value={passage? passage : "no passage"}  onChange={(e) => setPassage(e.target.value)}/>
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="answer"> Answer:</label>
                <select className="form-control" id="answer" value={answer||answer ===''?answer:"no answer"}   onChange={(e) => setAnswer(e.target.value)}required>
                    <option value="">Select </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>

                </select>
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="subjectId">select subject:</label>
                <select className="form-control" id="subjectId" value={subjectId||subjectId===''? subjectId:"no subject"}   onChange={(e) => setSubjectId(e.target.value)} required>
                    <option value="">Select </option>
                    {subjects.map(subject => (
                        <option value={subject.id}>{subject.name}</option>
                    ))}

                </select>
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="examId">select Exam Year:</label>
                <select className="form-control" id="examId" value={examId || examId === '' ? examId : 'no exam'} onChange={(e) => setExamId(e.target.value)} required>
            <option value="">Select </option>
            {Array.isArray(exams) && exams.map(exam => ( // Check if exams is an array before using map()
                <option value={exam.id}>{exam.year}</option>
            ))}
            </select>
            </div>
            <br />
            <div className="form-group">
                <label className="pb-2" htmlFor="image"> Image (optional)</label>        
              
                <input
                    type="file"
                    className="form-control-file"
                    id="image"
                    onChange={handleFileChange}
                    
                />
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

