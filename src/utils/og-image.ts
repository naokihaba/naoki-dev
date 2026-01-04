import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { SITE_TITLE } from "../consts";

const WIDTH = 1200;
const HEIGHT = 630;

export interface OgImageOptions {
  title: string;
  date?: Date;
}

function loadFont(): Buffer {
  const fontPath = path.resolve("public/fonts/NotoSansJP-Bold.ttf");
  return fs.readFileSync(fontPath);
}

export async function generateOgImage(options: OgImageOptions): Promise<Buffer> {
  const { title, date } = options;
  const fontData = loadFont();

  const formattedDate = date
    ? date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "60px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
                borderRadius: "24px",
                padding: "60px",
                width: "100%",
                height: "100%",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              },
              children: [
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: "48px",
                      fontWeight: 700,
                      color: "#1a202c",
                      textAlign: "center",
                      margin: 0,
                      lineHeight: 1.4,
                      maxWidth: "900px",
                      // TODO(human): OG画像タイトルのスタイリングを調整
                      overflow: "hidden",
                    },
                    children: title,
                  },
                },
                formattedDate && {
                  type: "p",
                  props: {
                    style: {
                      fontSize: "24px",
                      color: "#718096",
                      marginTop: "24px",
                    },
                    children: formattedDate,
                  },
                },
                {
                  type: "p",
                  props: {
                    style: {
                      fontSize: "28px",
                      color: "#667eea",
                      fontWeight: 700,
                      marginTop: "auto",
                    },
                    children: SITE_TITLE,
                  },
                },
              ].filter(Boolean),
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
          name: "NotoSansJP",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return png;
}
