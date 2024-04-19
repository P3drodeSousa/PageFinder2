import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 600;

async function getData(slug: string) {
  const res = await fetch(
    `https://ij0p5befru.preview.infomaniak.website/wp-json/wp/v2/posts?_embed=wp:term&lang=fr&slug=${slug}`
  );
  return res.json();
}

export default async function BlogContent({
  params,
}: {
  params: { blog: string };
}) {
  const post = await getData(params.blog);

  return (
    <>
      <div className="max-w-screen-xl mx-auto">
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-60 overflow-hidden">
          {/*  <Image
            src={post[0].featured_img}
            alt={"Blurred background image"}
            fill
            quality={30}
            className="bg-cover w-full h-full blur-2xl"
          /> */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-lightGray" />
        </div>

        <div className="flex pt-2"></div>

        <header className="border-b mb-24">
          <div className="flex flex-col justify-center w-full py-24 px-4 text-center">
            <div className="flex justify-center items-center">
              <span className="text-gray-600 text-sm"></span>
            </div>
            <h1
              dangerouslySetInnerHTML={{ __html: post[0].title.rendered }}
              className="mt-6 text-5xl font-semibold leading-tight"
            />
            {post[0].acf.sub_title && (
              <h2 className="text-2xl mt-6 text-gray-500 leading-tight">
                {post[0].acf.sub_title}
              </h2>
            )}
          </div>
          <article
            className="text-darkBackground"
            dangerouslySetInnerHTML={{ __html: post[0].content.rendered }}
          />
          <div className="flex gap-6 my-5 w-full justify-end items-center"></div>
        </header>

        <footer
          className="flex relative flex-col w-full items-center justify-center p-24 mt-24 border-t gap-4 overflow-hidden
      before:bg-gradient-radial before:from-white before:to-transparent before:to-70% before:absolute before:-top-1/2 before:left-0 before:w-full before:h-full"
        >
          <div className="flex flex-col items-center gap-4 z-10">
            <p className="text-lg font-display">Avez-vous aimé cet article ?</p>
          </div>
        </footer>
      </div>
    </>
  );
}
