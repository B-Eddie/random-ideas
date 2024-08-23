"use client";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  // const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/claude/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!res.ok) {
        throw new Error("Network not okay");
      }

      const data = await res.json();
      // setResponse(data.choices[0]?.text || 'No response');
      setResponse(data.message || "No response");
    } catch (error) {
      console.error("Error: ", error);
      setResponse("Error: ", response);
    }
  };

  return (
    <div>
      <h1>Stupid website idea generator</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}
