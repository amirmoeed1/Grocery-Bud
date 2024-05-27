import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;

// import React from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// const List = ({ items, removeItem, editItem }) => {
//   function incrementValue(e) {
//     e.preventDefault();
//     var fieldName = $(e.target).data("field");
//     var parent = $(e.target).closest("div");
//     var currentVal = parseInt(
//       parent.find("input[name=" + fieldName + "]").val(),
//       10
//     );

//     if (!isNaN(currentVal)) {
//       parent.find("input[name=" + fieldName + "]").val(currentVal + 1);
//     } else {
//       parent.find("input[name=" + fieldName + "]").val(0);
//     }
//   }

//   function decrementValue(e) {
//     e.preventDefault();
//     var fieldName = $(e.target).data("field");
//     var parent = $(e.target).closest("div");
//     var currentVal = parseInt(
//       parent.find("input[name=" + fieldName + "]").val(),
//       10
//     );

//     if (!isNaN(currentVal) && currentVal >= 0) {
//       parent.find("input[name=" + fieldName + "]").val(currentVal - 1);
//     } else {
//       parent.find("input[name=" + fieldName + "]").val(0);
//     }
//   }

//   $(".input-group").on("click", ".button-plus", function (e) {
//     incrementValue(e);
//   });

//   $(".input-group").on("click", ".button-minus", function (e) {
//     decrementValue(e);
//   });

//   return (
//     <div className="grocery-list">
//       {items.map((item) => {
//         const { id, title } = item;
//         return (
//           <>
//             <article className="grocery-item" key={id}>
//               <p className="title">{title}</p>
//               <div classname="col-12">
//                 <div classname="d-flex justify-content-between">
//                   <div classname="input-group w-auto justify-content-end align-items-center">
//                     {/* <input
//                       type="button"
//                       defaultValue="-"
//                       classname="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
//                       data-field="quantity"
//                     /> */}
//                     <input
//                       type="number"
//                       step={1}
//                       max={10}
//                       min={0}
//                       defaultValue={0}
//                       name="quantity"
//                       classname="quantity-field border-0 text-center w-25"
//                       />
//                     <input
//                       // classname="quantity-field ms-5 border-0 text-center w-25"
//                       type="number"
//                       Value="0 "
//                       // classname=" "/
//                       // data-field="quantity"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="btn-container">
//                 <button
//                   type="button"
//                   className="edit-btn"
//                   onClick={() => editItem(id)}
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   type="button"
//                   className="delete-btn"
//                   onClick={() => removeItem(id)}
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             </article>
//           </>
//         );
//       })}
//     </div>
//   );
// };