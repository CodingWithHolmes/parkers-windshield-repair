# Parker's Windshield Repair Website

A modern, responsive single-page website for a windshield repair business. Built with vanilla HTML, CSS, and JavaScript for optimal performance and GitHub Pages compatibility.

## Features

- **Clean, Professional Design**: Modern typography and color scheme
- **Responsive Layout**: Works perfectly on all devices (mobile-first approach)
- **Interactive Gallery**: Before/after image carousel with smooth navigation
- **Customer Reviews**: Testimonials section with star ratings
- **Fast Loading**: Optimized for performance and SEO
- **Accessible**: WCAG compliant with keyboard navigation support

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and responsive design
├── js/
│   └── main.js         # Gallery functionality and interactions
├── images/
│   ├── before-after/   # Before/after repair images
│   └── icons/          # Icons and graphics
└── README.md           # This file
```

## Setup Instructions

### Local Development

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **Customize content** as needed (see Customization section below)

### Adding Your Images

1. **Place your before/after images** in the `images/before-after/` folder
2. **Update the gallery data** in `js/main.js`:
   ```javascript
   this.galleryData = [
       {
           image: 'images/before-after/your-image-1.jpg',
           alt: 'Description of repair',
           beforeLabel: 'Before',
           afterLabel: 'After'
       },
       // Add more images...
   ];
   ```

### Customization

#### Contact Information
Update the contact details in `index.html`:
- Phone number
- Email address
- Service area
- Business hours

#### Reviews
Replace the sample reviews in `index.html` with real customer testimonials.

#### Colors and Styling
Modify the CSS variables in `css/styles.css` to match your brand colors.

## Deployment to GitHub Pages

### Option 1: Simple Upload
1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Go to Settings** → **Pages**
4. **Select source**: "Deploy from a branch"
5. **Choose branch**: `main` (or `master`)
6. **Save** - your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using GitHub CLI
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
gh repo create your-repo-name --public
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Performance Optimization

- **Images**: Optimize all images for web (max 500KB each)
- **Format**: Use WebP when possible, with JPEG fallbacks
- **Lazy Loading**: Images load as needed for better performance
- **Minification**: Consider minifying CSS/JS for production

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for gallery
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Customization Guide

### Changing Colors
The main color scheme uses CSS custom properties. Update these in `css/styles.css`:

```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #1e3a8a;
    --accent-color: #fbbf24;
    --text-color: #333;
    --background-color: #ffffff;
}
```

### Adding More Sections
To add additional sections, follow the existing pattern in `index.html`:

```html
<section class="new-section">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <!-- Your content here -->
    </div>
</section>
```

### Modifying the Gallery
The gallery is fully customizable through the `ImageGallery` class in `js/main.js`. You can:
- Add/remove images
- Change transition effects
- Modify auto-advance timing
- Add custom captions

## Troubleshooting

### Images Not Loading
- Check file paths in `js/main.js`
- Ensure images are in the correct folder
- Verify image file names match exactly

### Gallery Not Working
- Check browser console for JavaScript errors
- Ensure all gallery elements exist in HTML
- Verify CSS classes match between HTML and CSS

### Mobile Issues
- Test on actual devices, not just browser dev tools
- Check viewport meta tag is present
- Verify touch events are working

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Test in different browsers/devices
4. Contact the developer for assistance

---

**Built with ❤️ for Parker's Windshield Repair** 