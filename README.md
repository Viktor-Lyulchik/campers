# Campers Frontend

## Project Overview

This project is the frontend part of **TravelTrucks**, a camper rental company.
The application allows users to browse, filter, and view detailed information
about campers, as well as manage a list of favorites and submit booking
requests.

Built with **Next.js**, **TypeScript**, **Zustand**, and **Axios**.

## Author

**Viktor Liulchyk**

- GitHub: [@Viktor-Lyulchik](https://github.com/Viktor-Lyulchik)
- LinkedIn:
  [linkedin.com/in/viktorliulchyk](https://www.linkedin.com/in/viktorliulchyk/)
- Email: viktor.lyulchik@gmail.com

## Live Demo

- [Live site on Vercel](https://campers-sand.vercel.app)

## Pages

### Home (`/`)

- Banner with main call-to-action button "View Now" to navigate to the catalog.

### Catalog (`/catalog`)

- Displays all available campers.
- Backend filtering by:
  - Location (text input)
  - Camper type (one type at a time)
  - Engine type (one type at a time)
  - Features (AC, kitchen, TV, bathroom, etc.)
- "Show More" button on each camper card to navigate to the camper details page.
- "Load More" button to fetch more campers using backend pagination.
- Add campers to favorites.

### Camper Details (`/catalog/:id`)

- Detailed camper information.
- Gallery of images.
- Pages for **Features** and **Reviews**.
- Displays camper features: transmission, engine, AC, bathroom, kitchen, TV,
  radio, refrigerator, microwave, gas, water.
- Displays camper details: form, length, width, height, tank, consumption.
- Booking form with success notification.

## Technologies Used

- **Next.js** (App Router)
- **TypeScript**
- **Zustand** (state management)
- **Axios** (API requests)

## API

Uses the provided backend API:
[MockAPI](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers)

Endpoints:

- `GET /campers` - fetch all campers with backend filtering and pagination.
- `GET /campers/:id` - fetch a single camper by ID.

## State Management

- Global state stores:
  - Applied filters
  - Favorite campers
- Filters reset previous results when applied to ensure accurate backend
  responses.

## Installation

```bash
git clone YOUR_REPO_URL
cd your-project
npm install
npm run dev
```
