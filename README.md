# OdeX ERP Website

A professional, bilingual website for Odoo ERP and POS services targeting the Myanmar market. Built with modern web technologies and optimized for deployment on GitHub Pages and Vercel.

## 🚀 Features

- **Multi-page Design**: Home, About ERP, Comparison, Features & Modules, and Contact pages
- **Responsive Layout**: Mobile-first design that works on all devices
- **Bilingual Support**: Myanmar (Burmese) and English language toggle functionality
- **Modern UI**: Clean, professional design with intuitive navigation
- **Contact Form**: Integrated with Airtable for lead management
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 📁 Project Structure

```
odoo-erp-website/
├── index.html              # Homepage
├── about.html              # About ERP page
├── comparison.html         # POS vs ERP comparison
├── features.html           # Features and modules
├── contact.html            # Contact form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
├── api/
│   └── contact.js         # Contact form API handler
├── images/                # All images and assets
├── package.json           # Project configuration
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Flexbox and Grid layouts
- **Vanilla JavaScript** - No frameworks, pure JS
- **Google Fonts** - Padauk font for Myanmar language
- **Font Awesome** - Icons
- **Airtable API** - Contact form backend

## 🚀 Deployment Options

### Option 1: GitHub Pages (Free)

1. **Create GitHub Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/odoo-erp-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save

3. **Access your site**: `https://your-username.github.io/odoo-erp-website`

### Option 2: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd odoo-erp-website
   vercel
   ```

3. **Configure Environment Variables** (for contact form):
   - `AIRTABLE_API_KEY`: Your Airtable API key
   - `AIRTABLE_BASE_ID`: Your Airtable base ID
   - `AIRTABLE_TABLE_ID`: Your Airtable table ID

### Option 3: Netlify

1. **Connect Repository**:
   - Go to [Netlify](https://netlify.com)
   - Connect your GitHub repository
   - Deploy settings: Build command: `echo "Static site"`, Publish directory: `/`

## 🔧 Local Development

### Prerequisites
- Python 3.x (for local server)
- Git (for version control)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/odoo-erp-website.git
cd odoo-erp-website

# Start local development server
python3 -m http.server 8000
# or
npm start
```

Visit `http://localhost:8000` to view the site.

## 📝 Configuration

### Contact Form Setup (Airtable)

1. Create an Airtable base with the following fields:
   - Name (Single line text)
   - Company (Single line text)
   - Email (Email)
   - Phone (Phone number)
   - Message (Long text)

2. Get your API credentials:
   - API Key: Account → Personal access tokens
   - Base ID: Help → API documentation
   - Table ID: Use table name or ID

3. Set environment variables in your deployment platform

### Customization

- **Content**: Edit HTML files in the root directory
- **Styling**: Modify `css/style.css`
- **Functionality**: Update `js/main.js`
- **Images**: Replace files in `images/` directory
- **Language**: Update language data in `js/main.js`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly navigation
- Optimized images and assets
- Fast loading on mobile networks

## 🔒 Security Features

- Form validation and sanitization
- HTTPS enforcement
- Content Security Policy ready
- No sensitive data in client-side code

## 📊 Performance

- Optimized images (WebP format)
- Minified CSS and JS
- Fast loading times
- SEO optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and intended for use by OdeX ERP Services.

## 📞 Contact

For inquiries about OdeX services:
- **Email**: odexerp@gmail.com
- **Phone**: 09-754758505
- **Website**: [Your deployed URL]

## 🆘 Troubleshooting

### Common Issues

1. **Contact form not working**:
   - Check environment variables are set correctly
   - Verify Airtable API credentials
   - Check browser console for errors

2. **Images not loading**:
   - Ensure image paths are correct
   - Check file permissions
   - Verify image files exist

3. **Language toggle not working**:
   - Check JavaScript console for errors
   - Verify localStorage is enabled
   - Clear browser cache

### Support

For technical support, please contact the development team or create an issue in the repository.