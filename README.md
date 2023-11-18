<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [❓ FAQ (OPTIONAL)](#faq)
- [📝 License](#license)

<!-- PROJECT DESCRIPTION -->

# 📖 Get Knowledge <a name="about-project"></a>

**Get Knowledge** Get Knowledge is a web application where you can check for courses, create a profile, enroll in courses and check your progress, made as part of alemeno Full-stack internship assignment.

## 🛠 Built With <a name="built-with"></a>
- Back-End: `Node.js`

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node.js</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<details>
<summary>Front-End</summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js</a></li>
  </ul>
</details>

<!-- Features -->

### Key Features <a name="key-features"></a>

- **[Registration and login using JWT]**
- **[Users can enroll in courses]**
- **[Users can mark course as completed and check the course as completed]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Live Demo -->

## 🚀 Live Demo <a name="live-demo">

[Video presentation](https://drive.google.com/file/d/1t6VLhVgv7Z3pBFl7OHJKCMX1n6x6qv_Z/view?usp=sharing)

[Live demo on vercel](https://getknowledge.vercel.app/)

<!-- GETTING STARTED -->

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need:
- Node version 18.08.0 or later
- Mongo atlas account

### Setup
#### For the Back-end:
Clone this repository to your desired folder:

```sh
  git https://https://github.com/Alejandro-Bernal-M/courses-API.git
  cd courses-API
```

### Install

Install this project with:

  `npm install`

### Set up enviroment variables
 - Create a file called ".env" in your root directory
 - Create the following variables:
    - PORT=2000 (the port of your election)
    - MONGO=YOUR-MONGO-URI (Eg:mongodb+srv://<username>:<password>@cluster0.qolkg7x.mongodb.net/<collection>?retryWrites=true&w=majority )
    - ADMIN_PASSWORD=YOUR_ADMIN_PASSWORD
    - JWT_SECRET=YOUR_JWT_SECRET(for decode the jwt)
    - ORIGIN=http://localhost:3000 ( The url of your request for CORS )

### Usage

To start the server, execute the following command:

`npm run dev`

### docs

you can check the API docs after start the server in the /docs route

#### For the Front-end:

Clone this repository to your desired folder:

```sh
  git https://https://github.com/Alejandro-Bernal-M/courses-front.git
  cd courses-front
```

### Install

Install this project with:

  `npm i`

### Usage

To start the server, execute the following command:

`npm run dev`



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Alejandro**
- GitHub: [Alejandro](https://github.com/Alejandro-Bernal-M)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/alejandro-bernal-marin)

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **[Task counter on the columns]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/Alejandro-Bernal-M/courses-front/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SUPPORT -->

## ⭐️ Show your support <a name="support"></a>

If you like this project please give it a star ⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGEMENTS -->

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank 
- alemeno for the opportunity.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

