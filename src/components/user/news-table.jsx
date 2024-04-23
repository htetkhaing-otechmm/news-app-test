

import Image from "next/image";
import Link from "next/link";

import { getNews } from "../../../database/query";

export default async function NewsTable() {

    const newsItems = await getNews();
  return (
    <>
      <div className="flex my-3">
        {/* <button className="ml-auto py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-indigo-600">Create News</button> */}
      </div>
      <table className="w-full table-fixed">
        <colgroup>
          <col width={30} />
          <col width={20} />
          <col width={50} />
        </colgroup>
        <thead>
          <tr className="bg-indigo-100 [&_th]:py-2">
            <th>Date</th>
            <th>Photo</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="">
          {newsItems.map((newItem) => {
            return (
              <tr key={newItem.id} className="*:px-1 *:py-2">
                <td>{new Date(newItem.date).toLocaleString()}</td>
                <td>
                  <div className="relative w-[100px] h-[100px] w-[100px]">
                    <Image sizes="100px" alt="Image Description" fill style={{ objectFit: "cover" }} src={"/uploads/sample.jpg"} />
                  </div>
                </td>
                <td><Link href={"/news/"+newItem.id}>{newItem.description}</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
