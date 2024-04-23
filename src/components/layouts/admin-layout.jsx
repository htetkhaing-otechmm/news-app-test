import Link from "next/link";
import SignoutButton from "../buttons/signout-button";

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminHeader />
      <main className="min-h-[" style={{minHeight: "calc(100vh - 80px)"}}>{children}</main>
      <AdminFooter/>
    </>
  );
}



// header component
 function AdminHeader(){
    return <nav className="sticky bg-indigo-200">
        <ul className="flex w- content-center max-w-3xl mx-auto h-12 [&_li:hover]:text-green-800">
            <li className="px-3 leading-[48px]"><Link href={"/admin"}>Home</Link></li>
            <li className="px-3 leading-[48px]"><Link href={"/admin/news"}>News</Link></li>
            <li className="ml-auto"><SignoutButton/></li>
        </ul>

    </nav>
}


function AdminFooter(){
  return <footer className="bg-gray-200 h-8 sticky">
    <p className="text-center leading-8 text-sm">Copy <>&copy;.</> O-Technique Myanmar</p>
  </footer>
}