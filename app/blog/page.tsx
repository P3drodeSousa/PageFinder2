export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const res = await fetch(
    `https://ij0p5befru.preview.infomaniak.website/wp-json/wp/v2/posts?lang=fr`
  );
  const data = await res.json();
  return data;
}

export default async function Blog() {
  const data = await getData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      {data.map((blog: any) => {
        return (
          <div key={blog.id} className="flex-1">
            <h2 className="text-xl font-bold font-display my-3 hover:text-primary transition-all">
              {blog.title.rendered}
            </h2>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.excerpt.rendered,
              }}
              className="line-clamp-3 text-gray-600"
            />

            <h1>{blog.slug}</h1>
          </div>
        );
      })}
    </main>
  );
}
