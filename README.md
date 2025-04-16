# Wallit App Wallpaper Repository

This repository contains the wallpaper collection data used by the Wallit app. It serves as the central source for all wallpapers displayed in the application.

## About Wallit

Wallit is a curated wallpaper application that offers high-quality wallpapers across various categories including Nature, Minimal, Dark, Abstract, Anime, and more. The app aims to provide users with beautiful, well-organized wallpapers for their devices.

## Repository Structure

The main data file `wallpapers.json` contains all the wallpaper collections organized by categories. Each category includes metadata and a list of individual wallpapers.

### JSON Structure

The wallpapers.json file follows this structure:

```json
[
  {
    "id": "category-id",
    "name": "Category Name",
    "description": "Category description text",
    "coverImage": "URL to category cover image",
    "wallpapers": [
      {
        "id": "wallpaper-id",
        "url": "URL to full-size wallpaper",
        "title": "Wallpaper Title",
        "author": "Photographer/Artist Name",
        "thumbnail": "URL to thumbnail version"
      },
      // More wallpapers...
    ]
  },
  // More categories...
]
```

## How to Contribute

We welcome contributions to expand our wallpaper collection! Here's how you can contribute:

### Adding New Wallpapers to Existing Categories

1. Fork this repository
2. Clone your fork to your local machine
3. Open the `wallpapers.json` file
4. Find the category where you want to add wallpapers
5. Add new wallpaper entries to the `wallpapers` array following this format:

```json
{
  "id": "category-uniqueID",
  "url": "https://link-to-full-resolution-image",
  "title": "Descriptive Title",
  "author": "Creator's Name",
  "thumbnail": "https://link-to-thumbnail-version-of-image"
}
```

Notes:
- The `id` should be unique across all wallpapers
- Use high-quality images (preferably 1080p or higher)
- Thumbnail versions should be around 500px wide (with `w=500&q=80` parameters for Unsplash images)
- Ensure you have rights/permission to use the wallpapers you're adding

### Adding a New Category

1. Follow steps 1-3 above
2. Add a new category object to the main array with:

```json
{
  "id": "new-category-name",
  "name": "Display Name",
  "description": "Brief description of this category",
  "coverImage": "URL to a representative cover image",
  "wallpapers": [
    // Add at least 6 wallpapers using the format above
  ]
}
```

### Submitting Your Contribution

1. Commit your changes with a meaningful message
2. Push to your forked repository
3. Create a Pull Request to the main repository
4. In your PR description, include:
   - What you've added/changed
   - Sources of the wallpapers
   - Confirmation that you have rights to use these images

## Image Guidelines

- Use copyright-free images or images you have permission to distribute
- Preferred sources: Unsplash, Pexels, or other royalty-free image sites
- Maintain consistent image quality across categories
- Ensure image links are permanent and won't expire

## License

Please note that while this repository structure is open-source, the individual wallpapers may be subject to their own licensing terms. Always check the source of wallpapers for usage rights.

---

Thank you for contributing to making Wallit a better app for everyone!
