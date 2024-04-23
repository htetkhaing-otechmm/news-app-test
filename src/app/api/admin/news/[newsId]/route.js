import { revalidatePath } from "next/cache";
import { deleteNews, updateNews } from "../../../../../../database/query";

export async function PATCH(req, {params}) {
  const { newsId } =  params;
  const  {data} = await req.json();
  const result = await updateNews(newsId, data);
  revalidatePath("/");
  
  return new Response(JSON.stringify({ message: "success"}, { headers: { "content-type": "application/json" }, status: 201 }));

}

export async function DELETE(req, {params},res) {
  const { newsId } =  params;
  const result = await deleteNews(newsId);
  revalidatePath("/");
  return new Response(JSON.stringify({ message: "success"}, { headers: { "content-type": "application/json" }, status: 200 }));

}