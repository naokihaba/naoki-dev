#!/usr/bin/env node
import { randomBytes } from "node:crypto";
import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const BLOG_DIR = resolve(import.meta.dirname, "../src/content/blog");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function randomSlug() {
  return randomBytes(4).toString("hex");
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const offset = -date.getTimezoneOffset();
  const offsetSign = offset >= 0 ? "+" : "-";
  const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
}

function generateTemplate(title) {
  const now = new Date();
  return `---
title: '${title}'
description: ''
published: false
published_at: '${formatDate(now)}'
tags: []
---

`;
}

function main() {
  const title = process.argv[2];

  if (!title) {
    console.error("Error: Title is required");
    process.exit(1);
  }

  const slug = slugify(title) || randomSlug();

  const filename = `${slug}.md`;
  const filepath = resolve(BLOG_DIR, filename);

  if (existsSync(filepath)) {
    console.error(`Error: File already exists: ${filename}`);
    process.exit(1);
  }

  const content = generateTemplate(title);
  writeFileSync(filepath, content);

  console.log(`Created: src/content/blog/${filename}`);
}

main();
