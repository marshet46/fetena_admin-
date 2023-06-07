import React,{useEffect, useState} from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { contextMenuItems, studentsGrid } from '../data/dummy';
import { Header, Loader } from '../components';
import { useDispatch, useSelector } from 'react-redux';

import { fetchStudents, createSubject } from '../redux/features/student/student-slice';
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './form';

const Students = () => {
  const editing = { allowDeleting: true, allowEditing: true };

     const [isOpen, setIsOpen] = useState(false);

     const toggle = () => setIsOpen(!isOpen);


  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.students.status);
  const error = useSelector((state) => state.students.error);



  useEffect(() => {
    dispatch(fetchStudents());

  }, [dispatch]);
  if (status === 'loading') {
    return <Loader/>;
  }
  if (status === 'failed') {
    return <div className='bg-danger h2 text-white  p-3'>The server  responds: {error} please try again!!</div>;
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl" >

      <Container>
      <Row>
        <Col xs={6}>
           <Header category="Page" title="students" />
          </Col>
          <Col xs={6}>

      <Button className='btn-primary m-10 ' onClick={toggle} style={{float:'right'}}>Register student</Button>
          </Col>
          </Row>
        {isOpen && <Forms isOpen={isOpen} toggle={toggle} style={{marginTop:"40px"}} />}

          </Container>

      <GridComponent
        id="gridcomp"
        dataSource={studentList}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {studentsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};
export default Students;
