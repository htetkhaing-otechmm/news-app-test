"use client";
import { useState } from "react";
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function Home() {
  const [geoResult, setGeoResult] = useState(null);
  const [textResult, setTextResult] = useState(null);
  const [keyword, setKeyword] = useState("");
  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const handleGeocoding = async () => {
    const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(keyword)}&key=AIzaSyDVHEGKiFmDEbifkQTFAuN-o8U6Vrxo364&language=ja
    `); 
    const data = await result.json()
    setGeoResult(data)
  };

  const handleTextSearch = async () => {
    const result = await fetch(`https://places.googleapis.com/v1/places:searchText`,{
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Goog-Api-Key": "AIzaSyDVHEGKiFmDEbifkQTFAuN-o8U6Vrxo364",
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.location",
      },
      body : JSON.stringify({textQuery: keyword, languageCode: "ja"})
    })
    const data = await result.json()
    setTextResult(data)
  };

  const handleSearch =   ()=>{
    handleGeocoding();
    handleTextSearch()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xxl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex w-full gap-2">
          <section className="w-[50%]">
            <div className="mb-2">
              <input onChange={handleKeyword} value={keyword} className="border-black border-2 mr-1 p-1" type="text" />
              <button onClick={handleSearch} className="border-black border-2 p-1">
                GEOCODE
              </button>
            </div>
            <div>
              {/* <textarea value={geoResult} readOnly rows={30} className="w-full" /> */}

              <JsonView data={geoResult} shouldExpandNode={allExpanded} style={darkStyles} />
            </div>
          </section>
          <section className="w-[50%]">
            <div className="mb-2">
              <input onChange={handleKeyword} value={keyword} className="border-black border-2 mr-1 p-1" type="text" />
              <button onClick={handleSearch} className="border-black border-2 p-1">
                Text Search
              </button>
            </div>
            <div>
              <JsonView data={textResult} shouldExpandNode={allExpanded} style={darkStyles} />

            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
