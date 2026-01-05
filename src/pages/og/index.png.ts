import type { APIRoute } from "astro";
import { generateOgImage } from "../../utils/og-image";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../consts";

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: `${SITE_TITLE} - ${SITE_DESCRIPTION}`,
  });

  return new Response(png as unknown as BodyInit, {
    headers: {
      "Content-Type": "image/png",
    },
  });
};
