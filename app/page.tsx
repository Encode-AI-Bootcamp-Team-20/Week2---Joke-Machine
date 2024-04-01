"use client";

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState<string | null>(null);
  const [tone, setTone] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  const [temperature, setTemperature] = useState<number>(50);

  const [joke, setJoke] = useState<string | null>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // generate joke?
    const generatedJoke = 'Why don\'t scientists trust atoms? Because they make everything up!';
    setJoke(generatedJoke);
  }

 return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Joke Machine</h1>
     <form onSubmit={handleSubmit} className="space-y-4">
       <div className="flex justify-between gap-4">
         {/* Topic selector */}
          <div className="text-black flex-grow">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
            <select id="topic" name="topic" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setTopic(e.target.value)}>
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
           <select id="tone" name="tone" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setTone(e.target.value)}>
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
            <select id="type" name="type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => setType(e.target.value)}>
              <option value="pun">Pun</option>
              <option value="knock-knock">Knock-Knock</option>
              <option value="story">Story</option>
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
           max="100"
           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
           value={temperature}
           onChange={(e) => setTemperature(Number(e.target.value))} />
          <span>{temperature}</span>
        </div>

        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Generate Joke
        </button>
      </form>
      {joke && <p className="mt-4 text-lg text-gray-700">{joke}</p>}
    </div>
 );
}
