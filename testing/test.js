import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 1000,
  duration: "30s"
}

// PRODUCT
export default function () {
  const min = 1;
  const max = 1000011;
  const id = Math.floor(Math.random() * (max - min)) + min;
  let res = http.get(`http://localhost:80/products/1/`)
  check (res, {
    'is status 200': (r) => r.status === 200,
  })

  console.log('Response time was ' + String(res.timings.duration) + ' ms');
  sleep(10)
}

// ALL PRODUCT
// export default function () {
//   const min = 1;
//   const max = 1000011;
//   const id = Math.floor(Math.random() * (max - min)) + min;
//   let res = http.get(`http://localhost:3000/products/`)
//   check (res, {
//     'is status 200': (r) => r.status === 200,
//   })

//   console.log('Response time was ' + String(res.timings.duration) + ' ms');
//   sleep(Math.random() * 5)
// }


// RELATED ITEMS
// export default function () {
//   const min = 1;
//   const max = 1000011;
//   const id = Math.floor(Math.random() * (max - min)) + min;
//   let res = http.get(`http://localhost:3000/products/${id}/related`)
//   check (res, {
//     'is status 200': (r) => r.status === 200,
//   })

//   console.log('Response time was ' + String(res.timings.duration) + ' ms');
//   sleep(Math.random() * 5)
// }


// STYLES
// export default function () {
//   const min = 1;
//   const max = 1000011;
//   const id = Math.floor(Math.random() * (max - min)) + min;
//   let res = http.get(`http://localhost:80/products/${id}/styles`)
//   check (res, {
//     'is status 200': (r) => r.status === 200,
//   })

//   console.log('Response time was ' + String(res.timings.duration) + ' ms');
//   sleep(Math.random() * 5)
// }
