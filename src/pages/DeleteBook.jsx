import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router";
import { enqueueSnackbar } from "notistack";
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`https://backend-three-sandy.vercel.app/books/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar(`Error - ${err.message}`, { variant: "error" });
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-2xl my-3">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl max-w-[600px]  p-4 lg:p-8 mx-auto">
        <h3 className="text-center text-2xl">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
