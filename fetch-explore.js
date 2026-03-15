#!/usr/bin/env node
/**
 * Fetches trending photos and topics from Unsplash and writes explore.json.
 *
 * Environment variable required:
 *   UNSPLASH_ACCESS_KEY
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=xxx node fetch-explore.js
 */

const fs = require('fs');
const path = require('path');

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error('UNSPLASH_ACCESS_KEY environment variable is required');
  process.exit(1);
}

const BASE_URL = 'https://api.unsplash.com';

async function unsplashFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

async function main() {
  console.log('Fetching trending photos...');
  const trending = await unsplashFetch('/photos', {
    order_by: 'popular',
    orientation: 'portrait',
    per_page: '20',
  });

  const trendingWallpapers = trending.map((photo) => ({
    id: `unsplash_${photo.id}`,
    url: photo.urls.full,
    thumbnail: photo.urls.small,
    title: photo.description || photo.alt_description || 'Untitled',
    author: photo.user.name,
    dominantColor: photo.color || undefined,
  }));

  console.log(`  Got ${trendingWallpapers.length} trending photos`);

  console.log('Fetching topics...');
  const topicsRaw = await unsplashFetch('/topics', {
    per_page: '15',
    order_by: 'featured',
  });

  const topics = topicsRaw.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    description: t.description || '',
    coverPhoto: t.cover_photo?.urls?.small || '',
  }));

  console.log(`  Got ${topics.length} topics`);

  const output = {
    trending: trendingWallpapers,
    topics,
    updatedAt: new Date().toISOString(),
  };

  const outPath = path.resolve(__dirname, 'explore.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  console.log(`Written to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
