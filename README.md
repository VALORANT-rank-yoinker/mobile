# vRY Mobile

A companion android app for VALORANT-Rank-Yoinker.

## Dev Guide

### Installing Deps

```sh
npm i
```

### Seeding Assets

```sh
npm run seed:val-api
```

### Building

```sh
npm run build #for production, npm run build:prod
```

### Syncing Android

```sh
npx cap sync #for the first time, then you can, npx cap copy
```

### Building APK

```sh
cd android && ./gradlew assembleDebug # for Windows Only
```
