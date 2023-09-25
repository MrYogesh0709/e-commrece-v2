# E-Commerce

## install dependencies

### install client dependencies

```
npm run install-client
```

### install server dependencies

```
npm install
```

### setup frontend environment in client folder root level

```
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
```

### setup backend environment root level

```
MONGO_URL=YOUR_MONGO_URL
WEBHOOK_ENDPOINT=YOUR_WEBHOOK_ENDPOINT
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
SESSION_KEY=YOUR_SESSION_KEY
USER_MAIL=YOUR_USER_MAIL
USER_PASSWORD=YOUR_USER_PASSWORD
CLOUDINARY_CLOUD_NAME = YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY = YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET = YOUR_CLOUDINARY_API_SECRET
```

### start development server

```
npm run start
```

#### Hosted on render server will disable after 15 minutes if no request comes so wait for 30 seconds to restart server automatically
