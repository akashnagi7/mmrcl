// import React, { useState } from 'react';
// import Pagination from 'react-bootstrap/Pagination';

// export default function TableData(tableData) {
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(tableData.length / itemsPerPage);
//   const [activePage, setActivePage] = useState(1);

//   const handlePageChange = (pageNumber) => {
//     setActivePage(pageNumber);
//   };

//   const renderPaginationItems = () => {
//     const paginationItems = [];

//     // Previous Button
//     paginationItems.push(
//       <Pagination.Prev
//         key="prev"
//         onClick={() => handlePageChange(activePage - 1)}
//         disabled={activePage === 1}
//       />
//     );

//     // Page numbers
//     for (let number = 1; number <= totalPages; number++) {
//       paginationItems.push(
//         <Pagination.Item
//           key={number}
//           active={number === activePage}
//           onClick={() => handlePageChange(number)}
//         >
//           {number}
//         </Pagination.Item>
//       );
//     }

//     // Next Button
//     paginationItems.push(
//       <Pagination.Next
//         key="next"
//         onClick={() => handlePageChange(activePage + 1)}
//         disabled={activePage === totalPages}
//       />
//     );

//     return paginationItems;
//   };

//   return (
//     <div>
//       {/* Your table component goes here */}
//       {/* Render the pagination component */}
//       <Pagination>{renderPaginationItems()}</Pagination>
//     </div>
//   );
// }
