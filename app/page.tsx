"use client";

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState("work");
  const [tone, setTone] = useState("witty");
  const [type, setType] = useState("run");

  const [temperature, setTemperature] = useState(1);

  const [joke, setJoke] = useState<string | null>(null)

  const [evaluation, setEvaluation] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  }

  const handleToneChange = (e) => {
    setTone(e.target.value);
  }

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleTemperatureChange = (e) => {
    setTemperature(e.target.value);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Joke Machine</h1>
      <form className="space-y-4">
        <div className="flex justify-between gap-4">
          {/* Topic selector */}
          <div className="text-black flex-grow">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
            <select
              id="topic"
              name="topic"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={topic}
              onChange={handleTopicChange}
            >
              <option value="work">Work</option>
              <option value="people">People</option>
              <option value="animals">Animals</option>
              <option value="food">Food</option>
              <option value="television">Television</option>
            </select>
          </div>

          {/* Tone selector */}
          <div className="text-black flex-grow">
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone:</label>
            <select
              id="tone"
              name="tone"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={tone}
              onChange={handleToneChange}
            >
              <option value="witty">Witty</option>
              <option value="sarcastic">Sarcastic</option>
              <option value="silly">Silly</option>
              <option value="dark">Dark</option>
              <option value="goofy">Goofy</option>
            </select>
          </div>

          {/* Type selector */}
          <div className="text-black flex-grow">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type of Joke:</label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="pun">Pun</option>
              <option value="knock-knock">Knock-Knock</option>
              <option value="story">Story</option>
              <option value="parody">Parody</option>
              <option value="riddle">Riddle</option>
            </select>
          </div>
        </div>


        <div className="flex gap-4 items-center">
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature:</label>
          <input
            type="range"
            id="temperature"
            name="temperature"
            min="0"
            max="2"
            step="0.1"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={temperature}
            onChange={handleTemperatureChange} />
          <span>{temperature}</span>
        </div>

        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setIsLoading(true);
              const response = await fetch("api/generate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, tone, type, temperature }),
              });
              if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
              }
              const data = await response.json();
              setJoke(data.joke);
              setEvaluation(null);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Generate Joke
        </button>

        {joke && <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading && !joke}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setIsLoading(true);
              const response = await fetch("api/evaluate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, tone, type, joke }),
              });
              if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
              }
              const data = await response.json();
              setEvaluation(data.evaluation);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          Evaluate Joke
        </button>}
      </form>
      {isLoading && <p className="mt-4 text-lg text-blue-700">Loading<span className="animate-bounce">...</span></p>}
      {joke && !isLoading && <p className="mt-4 text-lg text-gray-700">{joke}</p>}

      {evaluation && !isLoading &&
        <div className="rounded shadow p-4">
          Evaluation:
          <pre className="overflow-x-auto"><code className="json">{evaluation}</code></pre>
        </div>
      }
    </div>
  );
}
