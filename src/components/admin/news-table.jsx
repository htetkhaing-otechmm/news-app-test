"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function NewsTable() {
  const [news, setNews] = useState([]);
  const [newsItem, setNewsItem] = useState({ description: "" });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await fetch("/api/admin/news");

    if (res.ok) {
      const result = await res.json();
      setNews(result.data);
    }
  };

  const onCreate = async () => {
    if (newsItem.description.length === 0) {
      alert("Enter Description");
      return;
    }

    const res = await fetch("/api/admin/news", {
      method: "POST",
      body: JSON.stringify({ data: newsItem }),
    });

    const result = await res.json();

    if (res.ok) {
      setNewsItem({ description: "" });
      alert("News is created successfully");
      fetchNews();
      return;
    }
  };

  const onUpdate = async (id) => {
    const res = await fetch("/api/admin/news/" + newsItem.id, {
      method: "PATCH",
      body: JSON.stringify({ data: newsItem }),
    });

    res.ok && fetchNews()
    setNewsItem({description: ""})
  };

  const onDelete = async (id) => {
    const res = await fetch("/api/admin/news/" + id, {
      method: "DELETE",
    });

    res.ok && fetchNews();
  };

  const handleUpdate = (item) => {
    setNewsItem(item);
  };

  const handleDescChange = (e) => {
    setNewsItem((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="flex my-3">
        <input onChange={handleDescChange} placeholder="Description" value={newsItem.description} />

        {newsItem.id ? (
          <>
            <button onClick={()=> setNewsItem({description: ""})} className="ml-auto">Cancel</button>
            <button onClick={onUpdate} className="ml-4 py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600">
              Update News
            </button>
          </>
        ) : (
          <button onClick={onCreate} className="ml-auto py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600">
            Create News
          </button>
        )}
      </div>
      <table className="w-full table-fixed">
        <colgroup>
          <col width={20} />
          <col width={20} />
          <col width={40} />
          <col width={20} />
        </colgroup>
        <thead>
          <tr className="bg-indigo-100 [&_th]:py-2">
            <th>Date</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {news.map((newItem) => {
            return (
              <tr className="*:px-1 *:py-2" key={newItem.id}>
                <td>{new Date(newItem.date).toLocaleString()}</td>
                <td>
                  <div className="relative w-[100px] h-[100px] w-[100px]">
                    <Image sizes="100px" alt="Image Description" fill style={{ objectFit: "cover" }} src={"/uploads/sample.jpg"} />
                  </div>
                </td>
                <td>{newItem.description}</td>
                <td>
                  <button disabled={newsItem.id === newItem.id} onClick={() => handleUpdate(newItem)} className="ml-auto py-2.5 px-3 rounded-lg disabled:bg-blue-200 font-medium text-xs text-white bg-blue-600">
                    Update
                  </button>{" "}
                  <button onClick={() => onDelete(newItem.id)} className="ml-auto py-2.5 px-3 rounded-lg text-xs font-medium text-white bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
