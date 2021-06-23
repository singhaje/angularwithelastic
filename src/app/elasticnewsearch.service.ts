import { Client } from 'elasticsearch-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElasticnewsearchService {

  private client: Client;
  perPage = 5000;

  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private queryalldocs = {
    'query': {
      "bool": {
        "should": [
          {
            "term": {
              "param2": "HUMAN"
            }
          }, {
            "match": {
              "param1": "param1"
            }
          }
        ]
      }
    }
  };

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'Hello JOAC Search!'
    });
  }

  // constructor() {
  //   this.client = new Client({
  //     host: 'localhost:9200',
  //     log: 'trace',
  //     auth: {
  //       username: 'elastic',
  //       password: 'changeme'
  //     }
  //   });
  // } 

  getAllDocuments(_index, _type): any {
    return this.client.search({
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }

  getPaginatedDocuments(_query, _page, _index?, _type?): any {
    return this.client.search({
      q: this.queryalldocs,
      from: 0,
      size: 200
    });

    // if (_index !== undefined) {
    //   if (_type !== undefined) {
    //     return this.client.search({
    //       q: _query,
    //       index: _index,
    //       type: _type,
    //       from: (_page - 1) * this.perPage,
    //       size: this.perPage
    //     });
    //   }
    //   return this.client.search({
    //     q: _query,
    //     index: _index,
    //     from: (_page - 1) * this.perPage,
    //     size: this.perPage
    //   });
    // } else {
    //   if (_type !== undefined) {
    //     return this.client.search({
    //       q: _query,
    //       type: _type,
    //       from: (_page - 1) * this.perPage,
    //       size: this.perPage
    //     });
    //   }
    //   return this.client.search({
    //     q: _query,
    //     from: (_page - 1) * this.perPage,
    //     size: this.perPage
    //   });
    // }
  }

  private connect() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace',
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    });
  }

}