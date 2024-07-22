import Link from "next/link";

export default function AdminHeader(){
    return <nav className="sticky bg-indigo-200">
        <ul className="flex w- content-center max-w-3xl mx-auto h-12 [&_li:hover]:text-green-800">
            <li className="px-3 leading-[48px]"><Link href={"/admin"}>Home</Link></li>
            <li className="px-3 leading-[48px]"><Link href={"/admin/news"}>News</Link></li>
        </ul>
    </nav>
}