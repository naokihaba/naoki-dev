import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../utils/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, pubDate: post.data.pubDate },
  }));
};

interface Props {
  title: string;
  pubDate: Date;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    date: props.pubDate,
  });

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
