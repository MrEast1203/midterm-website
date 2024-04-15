import React, { useState } from "react";
import { useUser } from "../hooks/userHooks";
import services from "./../services";

function Form({ onClose, setCards, Cards }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { user, image } = useUser();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // const newCard = { title: title, message: message, author: "Anonymous" };
    // setCards([...Cards, newCard]);
    services.card
      .createOne(user.username, user.password, {
        title: title,
        content: message,
      })
      .then((data) => {
        // console.log("data:", data);
        const newCard = {
          id: data.id,
          title: title,
          content: message,
          user: {
            name: user.username,
            image: image,
          },
        };
        setCards([...Cards, newCard]);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to create new card");
      });
    setTitle("");
    setMessage("");
    onClose();
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        onClick={handleModalClick}
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto relative dark:bg-black">
        <form className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              Title
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">
              Your message
            </label>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Leave your message..."
              value={message}
              onChange={handleMessageChange}></textarea>
          </div>
          <div className="mb-5">
            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Add new card
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
