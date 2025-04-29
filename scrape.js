/**
 * Scan the page for Unsplash photo tiles (both grid & single-photo views)
 * and return an array of objects shaped like:
 *
 *   {
 *     id: "{given-id}",
 *     url: "{photo-url}?w=1080",
 *     title: "{title}",
 *     author: "{author}",          // ★ now pulled from <meta>
 *     thumbnail: "{photo-url}?w=500&q=80"
 *   }
 */
function extract_to_json() {
  const out  = [];
  const seen = new Set();                         // avoid duplicates

  /* 1️⃣  Collect candidate figures / wrappers
   *     – masonry grid:  figure[data-testid="photo-grid-masonry-figure"]
   *     – detail page:   div[data-testid^="photo-asset"]
   */
  const cards = document.querySelectorAll(
    'figure[data-testid="photo-grid-masonry-figure"], ' +
    'div[data-testid^="photo-asset"]'
  );

  cards.forEach(card => {
    const img = card.querySelector('img');
    if (!img) return;                             // safety-net

    const baseURL = (img.currentSrc || img.src || '').split('?')[0];
    const id      = baseURL.split('/').pop();     // last path segment

    if (seen.has(id)) return;
    seen.add(id);

    // ---------- title ----------
    const title =
      (img.alt || '').trim() ||
      card.querySelector('meta[itemprop="name"]')?.content.trim() ||
      '';

    // ---------- author ----------
    let author = '';

    // a. Schema-org “creator → name” (most reliable on grid pages)
    const metaCreatorName =
      card.querySelector('div[itemprop="creator"] meta[itemprop="name"]')
      ?? card.querySelector('meta[itemprop="creator"] meta[itemprop="name"]');

    if (metaCreatorName) {
      author = metaCreatorName.content.trim();
    } else {
      // b. creditText (detail pages often have this)
      const metaCredit = card.querySelector('meta[itemprop="creditText"]');
      if (metaCredit) {
        author = metaCredit.content.trim();
      } else {
        // c. link whose href starts with /@ (fallback)
        author = card.querySelector('a[href^="/@"]')?.textContent.trim() || '';
      }
    }

    out.push({
      id,
      url:       `${baseURL}?w=1080`,
      title,
      author,
      thumbnail: `${baseURL}?w=500&q=80`
    });
  });

  return out;
}
