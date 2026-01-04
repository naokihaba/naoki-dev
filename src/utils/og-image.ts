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
  const { title } = options;
  const fontData = loadFont();

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0ea5e9 100%)",
          padding: "80px",
        },
        children: [
          // メインタイトル（中央寄り）
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flex: 1,
                alignItems: "center",
              },
              children: {
                type: "h1",
                props: {
                  style: {
                    fontSize: "56px",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.3,
                    margin: 0,
                    maxWidth: "1200px",
                  },
                  children: title,
                },
              },
            },
          },
          // フッター（サイト名）
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: "32px",
                      fontWeight: 700,
                      color: "#ffffff",
                    },
                    children: SITE_TITLE,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#0ea5e9",
                          },
                          children: null,
                        },
                      },
                    ],
                  },
                },
              ],
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
