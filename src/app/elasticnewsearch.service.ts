import { Client } from 'elasticsearch-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElasticnewsearchService {

  private client: Client;

  constructor() {
    this.client = new Client({
      host: 'localhost:9200',
      log: 'trace',
      auth: {
        username: 'elastic',
        password: 'changeme'
      }
    });
  }

  private queryalldocs = {
    'query': {
      "bool": {
        "should": [
          {
            "term": {
                "param2": "HUMAN"
            }
          },{
            "match": {
              "param1": "param1"
            }
          }
        ]
      }
    }
  };

  getAllDocuments(_index, _type): any {
    return this.client.search({      
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }
}