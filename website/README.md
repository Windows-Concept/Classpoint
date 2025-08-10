# ClassPoint Website

Beautiful, professional website for ClassPoint desktop app distribution.

## 🌟 Features

- **Modern Design**: Clean, professional UI with gradient backgrounds
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Fast Loading**: Optimized with Tailwind CSS CDN
- **SEO Optimized**: Meta tags, structured content
- **Call-to-Action**: Clear download buttons and instructions

## 🚀 Quick Deploy to Vercel (FREE)

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from website folder
cd website
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: classpoint-website
# - Directory: ./
# - Override settings? No

# Your site will be live at: https://classpoint-website-xxx.vercel.app
```

### Option 2: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import from Git or upload the `website` folder
5. Deploy automatically

### Option 3: Drag & Drop
1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag the `website` folder to the upload area
3. Deploy instantly

## 🔧 Customization

### Update Download Link
In `index.html`, find the `downloadApp()` function and replace with your actual download URL:

```javascript
function downloadApp() {
    // Replace with your actual download link
    window.location.href = 'https://github.com/your-username/classpoint/releases/download/v1.0.0/ClassPoint-Portable.zip';
}
```

### Custom Domain (Optional)
1. Buy domain (e.g., `classpoint.app`)
2. In Vercel dashboard: Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

## 📱 Website Sections

- **Hero**: Eye-catching intro with download CTA
- **Features**: 6 key features with icons and descriptions
- **Screenshots**: Visual preview of the app
- **Download**: Main download section with instructions
- **Support**: Help and contact information
- **Footer**: Links and branding

## 🎨 Design Elements

- **Colors**: Indigo/Purple gradient theme
- **Typography**: Clean, readable fonts
- **Icons**: Heroicons for consistency
- **Effects**: Hover animations, glass morphism
- **Layout**: Grid-based, responsive design

## 📊 Analytics (Optional)

Add Google Analytics by inserting this before `</head>`:

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

## 🔗 Example URLs

After deployment, your website will be available at:
- **Vercel**: `https://classpoint-website.vercel.app`
- **Custom Domain**: `https://classpoint.app` (if configured)

## 📈 SEO Features

- Meta descriptions and keywords
- Open Graph tags for social sharing
- Structured content with proper headings
- Fast loading times
- Mobile-responsive design

Your professional ClassPoint website is ready to deploy! 🚀