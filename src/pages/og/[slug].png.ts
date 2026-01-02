import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title } = props as { title: string };

  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSansJP-Bold.ttf');
  let fontData: ArrayBuffer;

  try {
    fontData = await fs.readFile(fontPath);
  } catch {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.1.1/files/noto-sans-jp-japanese-700-normal.woff'
    );
    fontData = await response.arrayBuffer();
  }

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          padding: '60px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: title.length > 30 ? '48px' : '64px',
                fontWeight: 700,
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.4,
                maxWidth: '1000px',
                wordBreak: 'break-word',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                marginTop: '40px',
                fontSize: '32px',
                color: '#6b7fff',
                fontWeight: 700,
              },
              children: 'naoki.dev',
            },
          },
        ],
      },
    },
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH,
    },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
