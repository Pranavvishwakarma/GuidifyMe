# Mentorheal Community

## Steps to install

1. Install Yarn

```
npm install --global yarn
```

2. Clone the repository

```
git clone https://github.com/arpankumarde/mentorheal-community.git
```

3. Go to project directory

```
cd mentorheal-community
```

4. Run yarn to install all dependencies

```
yarn
```

5. Add an `.env` file in the root of the project with necessary credentials

```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_measurementId=
```

## Running on Localhost

```
yarn dev
```

## Building for production

1. Check common issues with a Linter

```
yarn lint
```

2. Build the production bundle

```
yarn build
```
