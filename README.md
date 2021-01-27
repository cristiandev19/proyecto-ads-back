# Express API example


Esta es el ejemplo de un backend hecho en express usando:
- Mongoose
- Passport
- JWT 


## Ejemplo de peticion HTTP por JS con Bearer
```js
fetch("http://localhost:8089/protected", {
  "method": "GET",
  "headers": {
    "Bearer": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuc290b21heW9yMTkxMkBnbWFpbC5jb20iLCJpc0xvZ2VkIjp0cnVlLCJpYXQiOjE2MTEyMDAxMjMsImV4cCI6MTYxMTIwMTYyM30.ZPspcTr6ioPeJ7LJ36HE2HB-L4Dgv7w0OZiggeJ4Lys",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuc290b21heW9yMTkxMkBnbWFpbC5jb20iLCJpc0xvZ2VkIjp0cnVlLCJpYXQiOjE2MTEyMDAxMjMsImV4cCI6MTYxMTIwMTYyM30.ZPspcTr6ioPeJ7LJ36HE2HB-L4Dgv7w0OZiggeJ4Lys"
  }
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});
```

## Contribuidores
- Cristian Sotomayor

