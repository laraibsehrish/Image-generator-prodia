"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrompt(event.target.value);
  };

  const generateImage = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setImageUrl("");
    setDownloadUrl(null);

    try {
      const response = await fetch("/api/prodia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setJobId(data.job);
      } else {
        console.error("Error generating image:", data);
        alert("Failed to generate image. Please try again.");
      }
    } catch (error) {
      console.error("Error during image generation:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 const checkImageStatus = (jobId:string) => {
   return new Promise((resolve, reject) => {
     fetch(`/api/prodia?jobId=${jobId}`)
       .then((response) => {
         if (!response.ok) {
           throw new Error("Network response was not ok");
         }
         return response.json();
       })
       .then((data) => {
         console.log("API Response:", data); // Log API response for debugging

         if (data.status === "succeeded") {
           const imageUrl = data.imageUrl; // Adjust according to your data structure
           setImageUrl(imageUrl);
           setDownloadUrl(`${imageUrl}?download=1`);
           resolve(true); // Job completed successfully
         } else if (data.status === "pending") {
           resolve(false); // Still pending, check again later
         } else if (data.status) {
           // Handle unexpected status gracefully
           console.warn("Unexpected job status:", data.status);
           resolve(false); // Or reject if you want to halt further checks
         } else {
           reject(new Error("Job status unknown")); // Reject if no status provided
         }
       })
       .catch((error) => {
         console.error("Error during status check:", error);
         reject(error); // Reject the promise on error
       });
   });
 };


  useEffect(() => {
    if (jobId) {
      const interval = setInterval(async () => {
        const isCompleted = await checkImageStatus(jobId);
        if (isCompleted) {
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [jobId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          AI Image Generator
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Type your message here..."
            value={prompt}
            onChange={handleInputChange}
            className="flex-grow text-gray-700 text-lg px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={generateImage}
            className="px-6 py-2 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-r-full text-lg shadow-md hover:from-purple-600 hover:to-pink-400 transition duration-300"
          >
            {loading ? "Generating..." : "Submit"}
          </button>
        </div>

        <div className="mt-4">
          {loading && (
            <div className="text-center text-gray-700">Generating image...</div>
          )}
          {!loading && imageUrl && (
            <div className="mt-5">
              <Image
                src={imageUrl}
                alt="Generated"
                width={400}
                height={400}
                className="mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; // prevents looping
                  setImageUrl("/path/to/fallback/image.png"); // Set a fallback image
                }}
              />
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-400 transition duration-300"
                  download
                >
                  Download Image
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
