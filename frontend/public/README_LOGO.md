# Logo Instructions

## How to Add the Logo Image

1. **Place your logo image** in this `public` folder
2. **Name it**: `logo.png` (or update the path in `Navbar.tsx` if you use a different name)
3. **Supported formats**: PNG, JPG, SVG (PNG recommended for best quality)

## Current Logo Path

The Navbar component is configured to use: `/logo.png`

If your image has a different name or format, update the `src` attribute in:
- `frontend/src/components/Navbar.tsx` (line ~31)

## Image Recommendations

- **Size**: 200x200px to 400x400px works best
- **Format**: PNG with transparent background (recommended) or JPG
- **Aspect Ratio**: Square (1:1) works best for the logo container

## After Adding the Image

1. Save the image as `logo.png` in this folder
2. Restart your dev server if it's running
3. The logo will appear in the navbar automatically

