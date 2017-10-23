# Registration/Authentication/Authorization

As these are somewhat related concerns, they are discussed in the same document.

## Registration

The registration process is pretty simple. It only requires a unique username and a strong-enough password. If the requirements are met, a new user is created. 

## Authentication

For authentication purposes, JWT is used. When the user signs in using their username and password, they receive a new JWT which should be included in every subsequent request.

## Authorization