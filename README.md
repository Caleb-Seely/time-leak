 # TimeLeak Website

> More life, less likes.

This is the public-facing web component for the **TimeLeak** project. It provides a clean, simple interface for anyone to look up aggregated screen time statistics associated with a phone number.

This website allows you to take control of your screen time and reclaim your digital well-being with TimeLeak - the app that helps you live more and scroll less using peer pressure.

## About The Project

TimeLeak is an ecosystem designed to promote digital wellness. It consists of two main parts:

1.  **The TimeLeak Android App**: A background service that automatically and securely tracks user screen time and app usage, syncing the data daily to Firebase.
2.  **The TimeLeak Website (This Repository)**: A web application that allows users and their friends to view high-level, non-sensitive screen time data. This is intended to be a fun way to encourage awareness and accountability for digital habits.

This website fetches data from Firebase Firestore, displaying results in a user-friendly format while respecting user privacy by only showing aggregated statistics.

## Features

-   **Phone Number Lookup**: Easily search for screen time data using a phone number.
-   **Data Visualization**: Displays key metrics like total screen time, time spent on social media, and more.
-   **Dynamic Content**: Features a rotating tagline fetched from a live database.
-   **Secure & Private**: Built with security in mind, ensuring that detailed, sensitive app usage data remains private to the user.
-   **Modern & Responsive**: A clean, beautiful interface that works on any device.

## Tech Stack

This project is built with a modern web stack:

-   **Framework**: [React](https://reactjs.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Backend**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
