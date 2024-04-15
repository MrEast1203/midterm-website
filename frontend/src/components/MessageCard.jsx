import React from "react";
import react_icon from "../assets/react.svg";
import { useUser } from "../hooks/userHooks";
import services from "../services";
function MessageCard({
  title,
  description,
  author,
  image,
  cardId,
  setDeletedCardId,
}) {
  let avatar = image ? image : react_icon;
  const { user } = useUser();
  function onDelete() {
    // Implement delete functionality
    // console.log("Deleting card with id:", cardId);
    services.card
      .deleteOne(user.username, user.password, cardId)
      .then((data) => {
        // console.log("data:", data);
        setDeletedCardId(cardId);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {author === user.username ? (
        <div className="flex justify-end">
          <button
            onClick={onDelete} // Assuming onDelete is a function passed to handle the delete action
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            aria-label="Delete message">
            Delete
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="flex">
        <img
          src={avatar}
          alt="avatar"
          className="w-24 h-24 mr-4 object-cover"
        />
        <div>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
          <p className="mt-4 font-normal text-gray-600 dark:text-gray-400 text-left">
            {author}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
