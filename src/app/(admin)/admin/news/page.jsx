import NewsTable from "@/components/admin/news-table";

export const metadata = {
    title: 'Admin Panel: News Management',
  }
  

export default function NewsPage() {

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="my-3">News Management Screen</h2>
      <NewsTable/>
    </div>
  );
}
