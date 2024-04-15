import React, { useState } from "react";
import services from "../services";

function AIpage() {
  const [selectedDate, setSelectedDate] = useState(""); // Initialize state to store the date
  const [response, setResponse] = useState(""); // Initialize state to store the response

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Update state when user picks a date
  };
  const handleSubmit = async () => {
    if (selectedDate === "") return;
    try {
      const response = await services.chatgpt.getChatGPTResponse(selectedDate); // Call the API
      setResponse(response);
    } catch (error) {
      console.error("Failed to get ChatGPT response:", error);
      setResponse("Failed to get ChatGPT response");
    }
    setSelectedDate(""); // Clear input after sending
  };

  return (
    <div>
      <h1>Enter your birthday</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange} // Set up change handler
      />
      <p>Selected Date: {selectedDate || "No date selected"}</p>
      <button
        onClick={handleSubmit}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
        Ask AI about your fortune
      </button>
      <div>
        <p>AI Response:</p>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default AIpage;
