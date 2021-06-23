// import { Injectable } from '@angular/core';
// import { Client } from 'elasticsearch-browser';
// import * as elasticsearch from 'elasticsearch-browser';

// @Injectable({
//   providedIn: 'root'
// })
// export class ElasticsearchService {

//   private client: Client;

//   constructor() {
//     if (!this.client) {
//       this._connect();
//     }
//   }

//   private _connect() {
//     this.client = new elasticsearch.Client({
//       host: 'localhost:9200',
//       log: 'trace',
//       auth: {
//         username: 'elastic',
//         password: 'changeme'
//       }
//     });
//   }

//   isAvailable(): any {
//     return this.client.ping({
//       requestTimeout: Infinity,
//       body: 'Elastic Search Connected'
//     });
//   }

//   performSearch(): any {
//     var objQuery = {
//       "query": {
//         "bool": {
//           "should": [
//             {
//               "term": {
//                   "param2": "HUMAN"
//               }
//             },{
//               "match": {
//                 "param1": "param1"
//               }
//             }
//           ]
//         }
//       }
//     }

//     this.client.search({
//       index: 'masterindex',
//       body: {
//         "size":0,
//         "query": JSON.stringify(objQuery)        
//       }
//     },(error, response)=> {
//       console.log(response);
//       console.log(error);
//     })

//     this.client.search({
//       index: 'my-index',
//       body: { foo: 'bar' }
//     }, (err, { body, statusCode, headers, warnings }) => {
//       if (err) console.log(err)
//     })
    
//   }
// }