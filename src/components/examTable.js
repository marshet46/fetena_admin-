import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import EditExamModal from "./editModal";

import axios from "axios";

function ExamTable() {
  const [exams, setExams] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);

  const columns = [
    { dataField: "id", text: "Id", sort: true },
    { dataField: "year", text: "Year", sort: true },
    { dataField: "subject_id", text: "Subject ID", sort: true },
    { dataField: "time", text: "Time", sort: true },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <div>
          <button
            className="btn btn-sm btn-primary mr-2"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const defaultSorted = [
    {
      dataField: "year",
      order: "desc",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/exam/exam-list/").then((response) => {
      setExams(response.data.data);
    });
  }, []);

  const handleEdit = (id) => {
    // Make a PUT request to update the exam with the given id
    setSelectedExamId(id);
    setModalShow(true);
  };


  const handleDelete = (id) => {
    // Implement delete functionality
    // Make a DELETE request to http://127.0.0.1:8000/exam/exam-delete/
    // with the id of the exam to be deleted
    axios.delete(`http://127.0.0.1:8000/exam/exam-delete/${id}`)
    .then(response => {
      console.log(response);
      // handle success
    })
    .catch(error => {
      console.log(error);
      // handle error
    });
    alert("Exam deleted successfully!")
    window.location.reload();
  };


  return (
    <div className="App">
      <h5>
       List of exams
      </h5>

      <BootstrapTable
        bootstrap4
        keyField="id"
        data={exams}
        columns={columns}
        defaultSorted={defaultSorted}
        pagination={pagination}
      />
       <EditExamModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      id={selectedExamId}
    />

    </div>
  );
}

export default ExamTable;
