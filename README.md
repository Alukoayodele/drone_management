# Drone Management

## Table of Contents

- [Pre-Installation](#preinstallation)
- [Installation](#installation)

## Pre-Installation

Kindly follow this steps to install "PostgresQL" on docker

- Download Docker Decktop
- Signin/ Signup to Docker Hub https://hub.docker.com/
- Search for "postgres" image
- Follow the installation guide or watch this youtube video https://www.youtube.com/watch?v=Dm0CmZz-QyI

After successful installation of postgres on your local machine

Run this bash script to start up postgres

```bash
## Pre-Installation
docker compose up

```

Once postgres is up and run on docker
Create a .env file(kindly refer to .env-example for the enivornment variable's examples)

## Installation

These are the step by step command to start the project.

```bash
git clone https://github.com/Alukoayodele/drone_management.git
cd drone_management
yarn run install
yarn run dev # To run the project in development mode
yarn run build
yarn run start # To run the built project
```
