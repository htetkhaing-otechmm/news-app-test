import Link from "next/link";

export default function NewsDetail({ data }) {
  return (
    <div className="mt-3 mx-auto w-[300px]">
      <Link href={"/"}>Back To</Link>
      <br />
      
      <h3>{new Date(data.date).toLocaleString()}</h3>

      <details open>Description :{data.description}</details>
    </div>
  );
}
