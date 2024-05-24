# Basic anime database with Express

API to manage anime entries made with Express. You can upload pictures with Cloudinary and it's documented with Swagger.

## Requirements

- Node.js
- npm
- Cloudinary account

# Installation

### Clone the repository:

```sh
git clone https://github.com/NotNyarthur/animelistAPI.git
cd animelistAPI
```

### Install dependencies:

```sh
npm install
```

### Configure environment variables

```js
DATABASE_URL=your_postgresql_url
SECRET_KEY=your_secret_key
PORT=your_port
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Running the app

```sh
npm start
```

### API documentation
You access to the API documentation at `/docs` after running the app.