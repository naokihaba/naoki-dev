import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../utils/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => data.published);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, published_at: post.data.published_at },
  }));
};

interface Props {
  title: string;
  published_at: Date;
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await generateOgImage({
    title: props.title,
    date: props.published_at,
  });

  return new Response(png as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
