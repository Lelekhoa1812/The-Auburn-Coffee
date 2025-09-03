# The Auburn Coffee - Digital Coffee Shop Application

## 🏪 Overview

**The Auburn Coffee** is a comprehensive digital coffee shop application designed for a coffee shop located at Auburn Station in Melbourne, Australia. This modern web application serves Victorian public transport users with a full-featured ordering system, loyalty program, and staff management tools.

## 🌟 Key Features

- **Interactive Menu System** - Browse coffee, snacks, and meals with real-time pricing
- **Pre-Order System** - Advanced ordering with customization options
- **Loyalty Program** - Customer rewards and streak tracking
- **Staff Management** - Order processing and customer management
- **QR Code Integration** - Camera-based loyalty code scanning
- **Responsive Design** - Mobile-friendly interface for all devices
- **Student Discounts** - Special pricing for student customers

## 🏗️ Architecture & Structure

### Frontend Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with animations and responsive design
- **JavaScript (ES6+)** - Interactive functionality and API integration
- **Vue.js** - Reactive data binding for dynamic content
- **Bootstrap 5** - Responsive grid system and components

### Backend Integration
- **RESTful API** - Integration with external backend services
- **Vercel Deployment** - Production-ready hosting
- **Local Development** - Localhost support for development

## 📁 Project Structure

```
static/
├── 📱 Core Application Files
│   ├── home.html              # Main homepage with menu display
│   ├── index.css              # Main application styles
│   ├── app.js                 # Core application logic
│   ├── vue.js                 # Vue.js framework
│   └── item.json              # Menu items database
│
├── 🎯 Component Modules
│   ├── loyalty/               # Customer loyalty system
│   │   ├── loyalty.html       # Loyalty account interface
│   │   ├── loyalty.css        # Loyalty styling
│   │   └── loyalty.js         # Loyalty functionality
│   │
│   ├── edit-account/          # Account management
│   │   ├── edit-account.html  # Account editing interface
│   │   └── edit-account.css   # Account styling
│   │
│   ├── pre-order/             # Advanced ordering system
│   │   ├── pre-order.html     # Order interface
│   │   ├── pre-order.css      # Order styling
│   │   └── pre-order.js       # Order logic
│   │
│   ├── staff-order/           # Staff management system
│   │   ├── index.html         # Staff interface
│   │   ├── staff-order.css    # Staff styling
│   │   └── staff-order.js     # Staff functionality
│   │
│   └── draggable/             # Interactive UI components
│       ├── draggable.css      # Draggable styling
│       └── draggable.js       # Draggable functionality
│
├── 🖼️ Assets & Resources
│   ├── image/                 # UI images and icons
│   ├── products/              # Product images and branding
│   └── qr/                    # QR scanner utilities
│
└── 🔧 Utility Files
    ├── modal.js               # Modal functionality
    ├── problem.js             # Problem reporting system
    ├── firebaseInit.js        # Firebase integration
    └── statistics.html        # Analytics dashboard
```

## 🎯 Core Components

### 1. Homepage (`home.html`)
**Main entry point** featuring:
- **Interactive Menu Display** - Complete product catalog with images
- **Draggable Order Circle** - Morphing UI element for quick access
- **Student Discount System** - Checkbox-based discount application
- **Category Filtering** - Type-based menu organization
- **Responsive Navigation** - Bootstrap-based navigation system

**Key Features:**
- Vue.js reactive data binding
- Dynamic pricing calculations
- Pagination for large menus
- Search and filter capabilities

### 2. Loyalty System (`loyalty/`)
**Customer rewards program** including:
- **Account Management** - User registration and login
- **QR Code Generation** - Unique loyalty codes for each customer
- **Streak Tracking** - Visit frequency monitoring
- **Reward System** - Free coffee after 10 visits

**Technical Implementation:**
- Local storage for user sessions
- QR code generation via external API
- Secure PIN-based authentication
- Real-time streak updates

### 3. Pre-Order System (`pre-order/`)
**Advanced ordering platform** featuring:
- **Customization Options** - Size, milk, syrup selections
- **Real-time Pricing** - Dynamic cost calculations
- **Order Management** - Cart functionality and order history
- **ETA System** - Arrival time estimation
- **Student Discounts** - Automatic price adjustments

**Order Flow:**
1. Customer name entry
2. Menu browsing with filters
3. Item customization
4. Cart management
5. Order confirmation
6. Status tracking

### 4. Staff Management (`staff-order/`)
**Professional staff interface** with:
- **Order Processing** - Real-time order management
- **Customer Management** - Membership and account oversight
- **QR Code Scanning** - Camera-based loyalty verification
- **Menu Access** - Complete product catalog view
- **Statistics Dashboard** - Order analytics and reporting

**Staff Features:**
- Direct camera access for QR scanning
- Customer password reset functionality
- Order status management
- Real-time order updates
- Membership administration

### 5. Interactive UI (`draggable/`)
**Enhanced user experience** including:
- **Morphing Interface** - Expandable order circle
- **Touch Support** - Mobile-optimized interactions
- **Visual Feedback** - Hover effects and animations
- **Navigation Integration** - Seamless page transitions

## 🍽️ Menu System

### Product Categories
- **Coffee** - 12 varieties (Latte, Cappuccino, Flat White, etc.)
- **Teas** - 6 varieties (Chai, Earl Grey, Green Tea, etc.)
- **Chocolate Drinks** - 3 varieties (Hot/Cold Chocolate, Babycino)
- **Snacks** - 8 varieties (Muffins, Tarts, Yogurt, etc.)
- **Meals** - 4 varieties (Pies, Noodles, Dim Sum)
- **Beverages** - 7 varieties (Water, Energy Drinks, Soft Drinks)
- **Fruits** - 2 varieties (Apple, Banana)
- **Extras** - 3 varieties (Extra Shot, Decaf, Extra Syrup)

### Pricing Structure
- **Size-based Pricing** - Small, Medium, Large options
- **Student Discounts** - Automatic price reductions
- **Dynamic Calculations** - Real-time total updates
- **Currency Support** - Australian Dollar (AUD)

## 🔐 Authentication & Security

### User Management
- **PIN-based Authentication** - 6-digit secure codes
- **Session Management** - Local storage implementation
- **Role-based Access** - Customer vs. Staff permissions
- **Secure API Calls** - HTTPS endpoint integration

### Data Protection
- **Input Validation** - Client-side data verification
- **Error Handling** - Graceful failure management
- **Permission Checks** - Access control validation

## 📱 Responsive Design

### Mobile Optimization
- **Touch-friendly Interface** - Optimized for mobile devices
- **Responsive Grid** - Bootstrap-based layout system
- **Adaptive Images** - Optimized for various screen sizes
- **Gesture Support** - Swipe and touch interactions

### Cross-Platform Compatibility
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - iOS Safari, Android Chrome
- **Progressive Web App** - PWA capabilities
- **Offline Support** - Local storage functionality

## 🚀 Performance Features

### Optimization Techniques
- **Lazy Loading** - Images and content loading
- **Caching Strategy** - Local storage optimization
- **Minified Assets** - Compressed CSS and JavaScript
- **CDN Integration** - External library loading

### User Experience
- **Fast Loading** - Optimized asset delivery
- **Smooth Animations** - CSS transitions and keyframes
- **Real-time Updates** - Live data synchronization
- **Error Recovery** - Graceful failure handling

## 🔧 Development & Deployment

### Local Development
```bash
# Navigate to project directory
cd static/

# Open in web browser
# Use Live Server or similar for local development
```

### Production Deployment
- **Vercel Platform** - Automatic deployment
- **Environment Variables** - Configuration management
- **API Integration** - Backend service connection
- **SSL Certificate** - Secure HTTPS connections

### API Endpoints
- **Base URL**: `https://auburn-coffee-backend.vercel.app/api`
- **Local Development**: `http://localhost:3000/api`
- **QR Processing**: `POST /qr/read`
- **User Management**: `GET/POST /users`, `PUT /user/edit`
- **Order Processing**: `GET /orders/with-items`

## 📊 Analytics & Monitoring

### Statistics Dashboard
- **Order Analytics** - Sales and performance metrics
- **Customer Insights** - Loyalty program statistics
- **Product Performance** - Menu item popularity
- **Real-time Updates** - Live data monitoring

### Problem Reporting
- **Issue Tracking** - Customer feedback system
- **Bug Reporting** - Technical problem logging
- **Support Integration** - Customer service tools

## 🌟 Special Features

### Student Discount System
- **Automatic Detection** - Checkbox-based activation
- **Price Adjustments** - Real-time discount application
- **Verification Support** - Staff validation capabilities

### Loyalty Program
- **Streak Tracking** - Visit frequency monitoring
- **Reward System** - Free coffee after 10 visits
- **QR Code Integration** - Easy loyalty verification
- **Account Management** - Self-service customer portal

### Staff Tools
- **Order Management** - Real-time order processing
- **Customer Support** - Account and loyalty assistance
- **Menu Access** - Complete product information
- **Analytics Dashboard** - Performance monitoring

## 🔮 Future Enhancements

### Planned Features
- **Payment Integration** - Online payment processing
- **Inventory Management** - Stock level tracking
- **Advanced Analytics** - Business intelligence tools
- **Mobile App** - Native mobile application
- **AI Integration** - Smart recommendations

### Technical Improvements
- **Service Workers** - Enhanced offline capabilities
- **WebSocket Integration** - Real-time communication
- **Advanced Caching** - Improved performance
- **Progressive Enhancement** - Modern web standards

## 📚 Technical Documentation

### Code Standards
- **ES6+ JavaScript** - Modern JavaScript features
- **CSS3 Best Practices** - Responsive design principles
- **HTML5 Semantics** - Accessible markup structure
- **Vue.js Patterns** - Reactive component architecture

### Browser Support
- **Chrome 80+** - Full feature support
- **Firefox 75+** - Complete functionality
- **Safari 13+** - Full compatibility
- **Edge 80+** - Complete support

## 🤝 Contributing

### Development Guidelines
1. **Code Style** - Follow existing patterns
2. **Testing** - Verify functionality across browsers
3. **Documentation** - Update relevant documentation
4. **Performance** - Maintain optimization standards

### Issue Reporting
- **Bug Reports** - Detailed problem descriptions
- **Feature Requests** - Enhancement suggestions
- **Documentation** - Improvement recommendations

## 📄 License

This project is proprietary software developed for The Auburn Coffee. All rights reserved.

## 📞 Support

For technical support or questions about the application:
- **Email**: waynepreston999@gmail.com
- **Location**: Auburn Station, Melbourne, Victoria, Australia
- **Business Hours**: Monday-Friday, 7:30 AM - 8:00 PM

---

**The Auburn Coffee** - Serving Melbourne's finest Arabica coffee with modern digital convenience. ☕✨
