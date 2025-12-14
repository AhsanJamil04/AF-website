# Git Setup Instructions

## What's Been Done

1. **Created `.gitignore`** - Excludes all unused images (keeps only images displayed on website)
2. **Created `add_images.sh`** - Script to add only the images used on the website
3. **Removed unused images from Git** - Only 61 images are now tracked (instead of 1000+)

## Images Being Committed

Only the images actually displayed on the website are included:
- Logo.jpeg (1 file)
- Bridal collection images (36 files - 4 per dress × 9 dresses)
- Formal collection images (24 files - 4-6 per dress × 5 dresses)

**Total: 61 images** (instead of 1000+)

## To Commit and Push

```bash
# Review what will be committed
git status

# Commit all changes
git commit -m "Initial commit: Ayma & Fatima Atelier website with slideshow collections"

# Push to GitHub
git push -u origin main
```

## If You Need to Add More Images Later

Run the script:
```bash
./add_images.sh
```

Or manually add specific images:
```bash
git add -f images/path/to/specific/image.JPG
```

## Notes

- Unused images remain on your local machine but won't be pushed to GitHub
- The website will work perfectly with only the committed images
- If you add more images to the website, update `add_images.sh` and run it

