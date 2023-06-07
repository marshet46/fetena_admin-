import React,{useEffect, useState} from 'react';

import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import Collapse from 'react-bootstrap/Collapse';
import {  LineChart, SparkLine,Form } from '../components';
import { recentTransactions, dropdownData} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const editing = { allowDeleting: true, allowEditing: true };
  const [totalUsers, setTotalUsers] = useState(null);
  const [subject, setTotalSubject] = useState(null);
  const [exam, setTotalExam] = useState(null);
  const [question, setTotalQuestion] = useState(null);
  const [contact, setTotalContact] = useState(null);
  const [students, setStudents] = useState(["fff"]);
  const [grades, setGrades] = useState([]);



useEffect(() => {
  axios.get('http://127.0.0.1:8000/users/total/')
    .then(response => {
      setTotalUsers(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
    // get subject
    axios.get('http://127.0.0.1:8000/subject/total/')
    .then(response => {
      setTotalSubject(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
    // get exam
    axios.get('http://127.0.0.1:8000/exam/total/')
    .then(response => {
      setTotalExam(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
    // question
    axios.get('http://127.0.0.1:8000/question/total/')
    .then(response => {
      setTotalQuestion(response.data.data);
    })
    .catch(error => {
      console.log(error);
    });
    // get students

    axios.get('http://127.0.0.1:8000/users/total-by-grade/')
    .then(response => {
      setGrades(response.data.data);
    })
    .catch(error => {
      console.error(error);
    });
}, []);
  return (
    <div className="mt-6 ml-4 ">

      <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className='bg-success text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{subject}</Card.Title>
              <Card.Title className='h3 text-info' style={{fontSize:"30px",fontWeight:"bold"}}>Total Subjects</Card.Title>
                </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='bg-danger text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{exam}</Card.Title>
              <Card.Title className='h3 text-info' style={{fontSize:"30px",fontWeight:"bold"}}>Total Exam</Card.Title>
                </Card.Body>
          </Card>

        </Col>
        <Col>
          <Card>
            <Card.Body className='bg-info text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{question}</Card.Title>
              <Card.Title className='h3 text-success' style={{fontSize:"30px",fontWeight:"bold"}}>Total Questions</Card.Title>
                </Card.Body>
          </Card>
        </Col>

      </Row>
      <Row>
      {grades.map((item, index) => (
        <Col key={index}>
          <Card>
            <Card.Body className='bg-success text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>Grade:{item.grade}</Card.Title>
              <Card.Title className='h3 text-info' style={{fontSize:"30px",fontWeight:"bold"}}>{item.count} students</Card.Title>
                </Card.Body>

          </Card>
        </Col>

        ))}


      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body className='bg-success text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{344}</Card.Title>
              <Card.Title className='h3 text-info' style={{fontSize:"30px",fontWeight:"bold"}}>Paid studnets</Card.Title>
                </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='bg-danger text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{776}</Card.Title>
              <Card.Title className='h3 text-info' style={{fontSize:"30px",fontWeight:"bold"}}>Unpaid students</Card.Title>
                </Card.Body>
          </Card>

        </Col>
        <Col>
          <Card>
            <Card.Body className='bg-info text-white h1'>
              <Card.Title className='h2' style={{fontSize:"40px"}}>{585648}</Card.Title>
              <Card.Title className='h3 text-success' style={{fontSize:"30px",fontWeight:"bold"}}>Total Income in birr</Card.Title>
                </Card.Body>
          </Card>
        </Col>

      </Row>

    </Container>
      <div className="flex  flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold text-success">Recent Transactions</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">

          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold text-success">Income  Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
