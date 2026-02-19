# 🎨 UX/UI Portfolio Starter

A modern, production-ready portfolio template for UX/UI designers. Built with clean HTML, CSS, and JavaScript - no frameworks required.

**Inspired by:** Modern portfolio aesthetics with smooth animations and dark theme

## ✨ Features

- **Modern Design**: Clean, minimal aesthetic with dark theme
- **Smooth Animations**: Custom cursor, scroll animations, and transitions
- **Fully Responsive**: Looks great on all devices
- **Fast Loading**: Optimized performance
- **Easy to Customize**: Well-organized code with clear comments
- **SEO Friendly**: Semantic HTML and meta tags
- **Accessibility**: WCAG compliant with keyboard navigation

## 📁 Project Structure

```
portfolio-starter/
├── index.html              # Homepage
├── about.html              # About page
├── css/
│   └── styles.css         # All styles
├── js/
│   └── script.js          # All JavaScript
├── images/                # Your images go here
│   ├── project-1-cover.jpg
│   ├── project-2-cover.jpg
│   └── your-photo.jpg
└── case-studies/          # Case study pages
    ├── case-study-template.html
    ├── project-1.html
    ├── project-2.html
    └── project-3.html
```

## 🚀 Quick Start

### 1. Open in Cursor (or your code editor)

```bash
# Navigate to the project folder
cd portfolio-starter

# Open in Cursor
cursor .
```

### 2. Customize Your Content

**Homepage (index.html):**
- [ ] Replace "YOUR NAME" with your actual name
- [ ] Update hero title and subtitle
- [ ] Replace project placeholders with your work
- [ ] Update contact information
- [ ] Add your social media links

**About Page (about.html):**
- [ ] Add your photo to /images/your-photo.jpg
- [ ] Write your bio and story
- [ ] Update skills list
- [ ] Add your experience timeline
- [ ] Update social links

**Case Studies:**
- [ ] Duplicate case-study-template.html for each project
- [ ] Rename to project-1.html, project-2.html, etc.
- [ ] Fill in all sections with your content
- [ ] Add your project images

### 3. Add Your Images

**Recommended image sizes:**
- Project cover images: 1600x1000px
- Case study hero: 1600x900px
- Case study images: 1200x800px
- Your photo: 600x800px (3:4 ratio)

**Where to put images:**
```
/images/
  your-photo.jpg
  project-1-cover.jpg
  project-2-cover.jpg
  project-3-cover.jpg
  /case-studies/
    project-1-hero.jpg
    project-1-wireframes.jpg
    project-1-final.jpg
```

### 4. Color Customization

Want to change colors? Edit the CSS variables in `css/styles.css`:

```css
:root {
    --bg-primary: #0a0a0a;      /* Main background */
    --bg-secondary: #111111;     /* Secondary background */
    --text-primary: #ffffff;     /* Main text color */
    --text-secondary: #a0a0a0;   /* Secondary text */
    --accent: #6366f1;           /* Your brand color */
}
```

**Popular color schemes:**

**Blue/Purple (Current)**
```css
--accent: #6366f1;
```

**Green**
```css
--accent: #10b981;
```

**Pink**
```css
--accent: #ec4899;
```

**Orange**
```css
--accent: #f59e0b;
```

### 5. Test Locally

**Option 1: Live Server (Recommended)**
1. Install "Live Server" extension in VS Code/Cursor
2. Right-click on index.html
3. Select "Open with Live Server"

**Option 2: Simple HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser

## 🌐 Deployment

### Option 1: Netlify (Recommended - FREE)

**Via Drag & Drop:**
1. Go to [netlify.com](https://netlify.com)
2. Drag your entire portfolio-starter folder onto Netlify
3. Done! You'll get a free URL like `yourname.netlify.app`

**Via Git:**
```bash
# Initialize git repo
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin YOUR_GITHUB_REPO
git push -u origin main

# Then connect GitHub repo to Netlify
```

**Custom Domain:**
1. Buy domain from Namecheap, Google Domains, etc.
2. In Netlify: Site Settings → Domain Management → Add Custom Domain
3. Follow Netlify's DNS instructions

### Option 2: Vercel (FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 3: GitHub Pages (FREE)

```bash
# Create repo on GitHub
# Push your code

# In repo settings → Pages
# Select branch: main
# Folder: / (root)
```

Your site will be at: `https://yourusername.github.io/repo-name`

### Option 4: Traditional Hosting

Upload to any web host via FTP:
- Bluehost
- HostGator
- SiteGround
- Any shared hosting

## 🎨 Customization Guide

### Adding a New Project

1. **Duplicate the template:**
```bash
cp case-studies/case-study-template.html case-studies/my-new-project.html
```

2. **Update index.html:**
Add a new project card in the projects section

3. **Fill in your content:**
- Project title and description
- Research findings
- Design process
- Final designs
- Results and impact

### Changing Typography

In `css/styles.css`, update the font families:

```css
:root {
    --font-main: 'Your Font', sans-serif;
    --font-display: 'Your Display Font', sans-serif;
}
```

**Google Fonts example:**
```html
<!-- Add to <head> in all HTML files -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
:root {
    --font-main: 'Inter', sans-serif;
}
```

### Removing Custom Cursor

If you prefer a standard cursor:

1. In `css/styles.css`, remove:
```css
body {
    cursor: none; /* DELETE THIS LINE */
}
```

2. In `js/script.js`, comment out:
```javascript
// initCustomCursor(); // Add // at the start
```

### Adding a Contact Form

To add a working contact form, use a service like:

**Formspree (Easiest):**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Send</button>
</form>
```

**Netlify Forms:**
```html
<form name="contact" method="POST" data-netlify="true">
    <input type="email" name="email" required>
    <textarea name="message" required></textarea>
    <button type="submit">Send</button>
</form>
```

## 📊 Analytics

### Add Google Analytics

1. Get your tracking ID from analytics.google.com
2. Add before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## ⚡ Performance Tips

1. **Optimize Images:**
   - Use WebP format when possible
   - Compress with TinyPNG or ImageOptim
   - Use appropriate sizes (don't use 4000px images for 800px display)

2. **Minify CSS/JS (for production):**
   ```bash
   # Using online tools:
   # CSS: cssminifier.com
   # JS: javascript-minifier.com
   ```

3. **Enable Caching:**
   Add to your hosting (Netlify does this automatically)

## 🐛 Troubleshooting

**Images not showing:**
- Check file paths are correct
- File names are case-sensitive
- Make sure images are in the right folder

**Cursor not working:**
- Custom cursor only works on devices with mice
- It's disabled on touch devices automatically

**Mobile menu not opening:**
- Check that `script.js` is properly linked
- Open browser console (F12) to check for errors

**Styles not applying:**
- Check that `styles.css` path is correct
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

## 📝 SEO Checklist

- [ ] Add descriptive page titles
- [ ] Write meta descriptions for each page
- [ ] Add alt text to all images
- [ ] Use semantic HTML (h1, h2, etc. in order)
- [ ] Create a sitemap.xml
- [ ] Add robots.txt
- [ ] Set up Google Search Console
- [ ] Add Open Graph tags for social sharing

## ♿ Accessibility

This template includes:
- Semantic HTML5
- Keyboard navigation support
- ARIA labels where needed
- Sufficient color contrast
- Responsive text sizing

**Test your accessibility:**
- Use WAVE browser extension
- Run Lighthouse in Chrome DevTools
- Test with keyboard only (no mouse)

## 🎯 Your 6-Week Launch Timeline

**Week 1-2: Content**
- Write case studies
- Gather images
- Write bio and about content

**Week 3-4: Customization**
- Replace all placeholder text
- Add your images
- Customize colors/fonts
- Update links

**Week 5: Testing**
- Test on multiple devices
- Check all links work
- Proofread everything
- Get feedback from peers

**Week 6: Launch**
- Deploy to Netlify/Vercel
- Set up custom domain
- Add analytics
- Share on LinkedIn

## 📚 Resources

**Design Inspiration:**
- Awwwards.com
- Bestfolios.com
- Dribbble.com (search "portfolio")

**Stock Photos:**
- Unsplash.com
- Pexels.com

**Icons:**
- heroicons.com (if you want to add icons)
- feathericons.com

**Mockups:**
- mockuper.net (create device mockups)
- smartmockups.com

## 🆘 Need Help?

Common questions:

**Q: Can I use this for client work?**
A: Yes! This is a starter template you can use however you want.

**Q: Do I need to credit you?**
A: No, but it's appreciated! Not required though.

**Q: Can I sell portfolios made with this?**
A: Yes, you can use it commercially.

**Q: I'm stuck, what do I do?**
A: Check the Troubleshooting section above, or search Stack Overflow for specific errors.

## 📄 License

This is a free starter template. Use it however you want - personal, commercial, whatever!

## 🎉 You're Ready!

You now have everything you need to build a professional portfolio. Here's what to do next:

1. ✅ Customize all the content
2. ✅ Add your images
3. ✅ Test thoroughly
4. ✅ Deploy to Netlify
5. ✅ Share with the world!

**Remember:** Your portfolio is never truly "done" - you can always update it with new projects. The important thing is to launch it and start getting it in front of people.

Good luck! 🚀

---

Made with ❤️ for UX/UI designers ready to land their next role.
