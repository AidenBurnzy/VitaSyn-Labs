# Testing Checklist

## ✅ Setup Tasks
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add PostgreSQL connection URL
- [ ] Add JWT secret (min 32 chars)
- [ ] Add WooCommerce API credentials
- [ ] Verify database tables exist
- [ ] Run `npm run dev`

## 🧪 Functionality Tests

### Homepage (/)
- [ ] Age gate appears on first visit
- [ ] Can click "I am 18+" to proceed
- [ ] Research notice appears
- [ ] Can accept research notice
- [ ] Hero carousel auto-rotates
- [ ] Can click carousel arrows
- [ ] Can click carousel dots
- [ ] "Why Choose Us" section displays
- [ ] Featured products load
- [ ] Products display with images
- [ ] Can click product to view details
- [ ] Footer displays correctly
- [ ] All footer links work

### Navigation
- [ ] Logo is visible
- [ ] Logo links to homepage
- [ ] Shop dropdown works
- [ ] Information dropdown works
- [ ] Cart icon shows count
- [ ] Profile icon works
- [ ] Navigation is responsive on mobile

### Order Page (/order)
- [ ] Hero section displays
- [ ] Search bar works
- [ ] Can search for products
- [ ] Wolverine Stack displays
- [ ] Glow Stack displays
- [ ] All products section loads
- [ ] Products load from WooCommerce
- [ ] Can click product cards
- [ ] Product modal opens
- [ ] Can add to cart from modal
- [ ] Can close modal

### Login Page (/login)
- [ ] Form displays correctly
- [ ] Email validation works
- [ ] Password field is secure
- [ ] Can submit form
- [ ] Error messages display
- [ ] Success redirects to account
- [ ] "Don't have account" link works

### Register Page (/register)
- [ ] Form displays correctly
- [ ] All fields present
- [ ] Validation works
- [ ] Password confirmation works
- [ ] Can submit registration
- [ ] Success creates user
- [ ] Redirects after registration
- [ ] "Already have account" link works

### Account Page (/account)
- [ ] Protected route (requires login)
- [ ] User info displays
- [ ] Order history shows
- [ ] Can view order details
- [ ] Logout button works

### Contact Page (/contact)
- [ ] Hero displays
- [ ] Contact cards display
- [ ] Form renders
- [ ] All fields work
- [ ] Can submit form
- [ ] Validation works
- [ ] Success message shows

### FAQ Page (/faq)
- [ ] Hero displays
- [ ] FAQ cards display
- [ ] Accordion items work
- [ ] Can expand/collapse questions
- [ ] CTA section displays
- [ ] Links work

### Track Order (/track-order)
- [ ] Hero displays
- [ ] Form renders
- [ ] Can enter order number
- [ ] Can enter email
- [ ] Validation works
- [ ] Can submit tracking request
- [ ] Results display correctly

### Peptide Storage (/peptide-storage)
- [ ] Hero displays with correct theme
- [ ] Info panels display
- [ ] Content sections load
- [ ] Lists display correctly
- [ ] Callouts display
- [ ] Styling is correct

### Peptide Reconstruction (/peptide-reconstruction)
- [ ] Hero displays with orange theme
- [ ] Info panels display
- [ ] Step-by-step instructions work
- [ ] Safety warnings display
- [ ] Checklists display
- [ ] Styling is correct

## 🛒 Shopping Cart

### Cart Functionality
- [ ] Cart sidebar opens
- [ ] Can add products to cart
- [ ] Cart count updates
- [ ] Cart items display
- [ ] Product images show
- [ ] Can increase quantity
- [ ] Can decrease quantity
- [ ] Can remove items
- [ ] Total calculates correctly
- [ ] Can close cart
- [ ] Cart persists on refresh
- [ ] Can proceed to checkout

## 🔐 Authentication

### Login Flow
- [ ] Can login with valid credentials
- [ ] Invalid credentials show error
- [ ] JWT token is created
- [ ] User session persists
- [ ] Can access protected routes
- [ ] Can logout
- [ ] Logout clears session

### Registration Flow
- [ ] Can register new user
- [ ] Duplicate email prevented
- [ ] Password is hashed
- [ ] User created in database
- [ ] Auto-login after registration

## 📱 Responsive Design

### Mobile (< 576px)
- [ ] Navigation collapses correctly
- [ ] All pages are readable
- [ ] Forms are usable
- [ ] Buttons are tappable
- [ ] Images scale properly
- [ ] Cart sidebar works
- [ ] Modals work

### Tablet (576px - 768px)
- [ ] Layout adjusts properly
- [ ] Grid layouts adapt
- [ ] Navigation works
- [ ] All features accessible

### Desktop (> 768px)
- [ ] Full navigation visible
- [ ] Grid layouts optimal
- [ ] All spacing correct
- [ ] Hero sections full width

## 🎨 Visual Tests

### Styling
- [ ] Colors match original
- [ ] Fonts load correctly
- [ ] Spacing is consistent
- [ ] Buttons style correctly
- [ ] Hover effects work
- [ ] Transitions are smooth
- [ ] Gradients display properly
- [ ] Icons display correctly

### Images
- [ ] Logo displays
- [ ] Carousel images load
- [ ] Product images load
- [ ] Icon images load
- [ ] Alt text present
- [ ] Images are optimized

## ⚡ Performance

### Loading
- [ ] Pages load quickly
- [ ] No console errors
- [ ] No console warnings
- [ ] Images load progressively
- [ ] Fonts don't cause layout shift

### Functionality
- [ ] Forms submit quickly
- [ ] API calls are fast
- [ ] Search is responsive
- [ ] Cart updates instantly
- [ ] Navigation is snappy

## 🔒 Security

### Protection
- [ ] XSS protection works
- [ ] CSRF protection (if implemented)
- [ ] SQL injection prevented
- [ ] Passwords are hashed
- [ ] JWT tokens expire
- [ ] Protected routes work
- [ ] Input validation works

## 🐛 Error Handling

### Edge Cases
- [ ] Empty search results handled
- [ ] Network errors handled
- [ ] Invalid form data handled
- [ ] Missing images handled
- [ ] Database errors handled
- [ ] 404 pages work
- [ ] Error boundaries work

## 📊 Data

### WooCommerce
- [ ] Products sync correctly
- [ ] Product data complete
- [ ] Images load from WC
- [ ] Prices display correctly
- [ ] Stock status shows

### Database
- [ ] Users table populated
- [ ] Orders table works
- [ ] Order items save
- [ ] Relations work correctly
- [ ] Queries are efficient

## ✅ Final Checks
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Build succeeds
- [ ] Production build works
- [ ] All environment variables set
- [ ] README is accurate
- [ ] Documentation complete

---

## Notes:
- Test in Chrome, Firefox, Safari
- Test on actual mobile device
- Check accessibility
- Verify SEO meta tags
- Test with slow 3G connection
