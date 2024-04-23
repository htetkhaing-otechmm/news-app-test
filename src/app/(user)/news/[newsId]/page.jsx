export const revalidate = 5


import NewsDetail from "@/components/user/news-detail";
import NewsTable from "@/components/user/news-table";
import { notFound } from "next/navigation";
import { findNews, getNews } from "../../../../../database/query";

export async function generateMetadata({ params }) {

  const newsItem = await findNews(params.newsId);
  if(!newsItem) return notFound();

  return {
    title: newsItem?.description,
   
  };
}

export default async function UserHome({ params }) {
  const newsItem = await findNews(params.newsId);

    if(!newsItem)return notFound();

  return (
    <div>
      <div>User Home Page</div>
      <div>
        {/* news content */}
        <NewsDetail data={newsItem} />
      </div>
    </div>
  );
}


export async function generateStaticParams() {
    const newsItems = await getNews();
   
    return newsItems.map((post) => ({
      newsId: post.id.toString(),
    }))
  }
