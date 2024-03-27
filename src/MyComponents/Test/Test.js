import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Test = () => {
  const [studentData, setStudentData] = useState([
    {
      id: 1,
      name: "Student 1",
      rollNo: 101,
    },
    {
      id: 2,
      name: "Student 2",
      rollNo: 102,
    },
    {
      id: 3,
      name: "Student 3",
      rollNo: 103,
    },
    {
      id: 4,
      name: "Student 4",
      rollNo: 104,
    },
    {
      id: 5,
      name: "Student 5",
      rollNo: 105,
    },
  ]);
  const itemsPerPage = 1;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(studentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = studentData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Paginated Student Data</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Roll Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {currentPage > 2 && (
          <>
            <Pagination.Item onClick={() => handlePageChange(1)}>
              1
            </Pagination.Item>
            {currentPage !== 3 && <Pagination.Ellipsis />}
          </>
        )}
        {currentPage > 1 && (
          <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {currentPage < totalPages && (
          <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </Pagination.Item>
        )}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage !== totalPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
      </Pagination>
    </div>
  );
};
