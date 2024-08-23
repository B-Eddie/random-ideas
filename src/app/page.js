"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const formatResponse = (text) => {
  return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
};

export default function Home() {
  const [response, setResponse] = useState("");
  
  const handleSubmit = async (e) => {
    try {
      setResponse("loading");
      e.preventDefault();

      const res = await fetch("/api/ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error("Network not okay");
      }

      const data = await res.json();
      console.log(data);
  
      // Set the response state with the data
      setResponse(formatResponse(data?.ideas?.message) || "No response");

  
      // setResponse(data.message || "No response");
    } catch (error) {
      console.error("Error: ", error);
      setResponse("Error: ", response);
    }
  };

  return (
    <div>
      <h1 className="text-xs">Stupid website idea generator</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <button type="submit" className="absolute right-0 text-gray-400">Submit</button>
      </form>
      <div className="-mt-5">
        <h2 className="text-5xl font-extrabold underline">Response</h2>
        <p className="p-5 bg-white border-2 border-black rounded-2xl" dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
}
