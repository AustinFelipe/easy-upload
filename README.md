# EasyUpload

![Publish package](https://github.com/AustinFelipe/easy-upload/workflows/Publish%20package/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/AustinFelipe/easy-upload/badge.svg?branch=master)](https://coveralls.io/github/AustinFelipe/easy-upload?branch=master)

File/Video upload wrapper to ease bucket/storage/space/cdn integration 😛👊

# TL;DR

EasyUpload provides an easy way to send files/videos to a server. It provides abstraction to uploaders given one way to communicate to mutiple providers.

# How to use it

You can install it using either Github or Npmjs.

```javascript

npm install @austinfelipe/easy-upload

```

The easiest way to use it is installing one of [available provides]() and get an _EasyUpload_ instance.

Example:

```javascript
const uploaderImpl = new SomeUploaderImplementation();
const newFile = new FileInfoImplementation();
const uploader = new EasyUpload(uploaderImpl);

await uploader.sendFile(newFile);
```

# Available providers

- Amazon S3
- Azure Storage
- Digital Ocean Spaces

# How to build

```javascript

yarn
yarn run build

```
