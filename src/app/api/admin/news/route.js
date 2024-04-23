import { revalidatePath } from "next/cache";
import { createNews, getNews } from "../../../../../database/query";

export async function GET(req, res) {
  const newsItems = await getNews();

  // Return a success message as a JSON response with a 200 status code
  return new Response(JSON.stringify({ message: "success", data: newsItems }, { headers: { "content-type": "application/json" }, status: 200 }));
}


export async function POST(req, res) {
  // Extract the task from the request body
  const { data } = await req.json();
  const newsItem = await createNews({description: data.description}) 

  revalidatePath("/")

  return new Response(JSON.stringify({ message: "success"}, { headers: { "content-type": "application/json" }, status: 201 }));

}
