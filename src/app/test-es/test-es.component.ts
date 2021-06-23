import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
//import { ElasticsearchService } from '../elasticsearch.service';
import { ElasticnewsearchService } from '../elasticnewsearch.service';

@Component({
  selector: 'app-test-es',
  templateUrl: './test-es.component.html',
  styleUrls: ['./test-es.component.css']
})
export class TestEsComponent implements OnInit {
  isConnected = false;
  status: string;
  returnedResponse: any;
  searchResponse = '';
  currentPage: number = 1;
  totalHits: number;
  searchTime: number;
  totalPages: any;
  PER_PAGE = 5;
  
  public esData: any[];

  constructor( private es1: ElasticnewsearchService, private cd: ChangeDetectorRef) {
    this.isConnected = false;
  }

  static sanitized(query): string {
    return query.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
  }

  ngOnInit() {
    this.es1.isAvailable().then(() => {
      console.log('Connected ');
      this.status = 'OK';
      this.isConnected = true;
      this.performSearch("exec_inc","_search",1);
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });

    //this.performSearch("exec_inc","_search",1);
  }

  performSearch(query, index, page) {
    console.log('In Search');
    const sanitized = TestEsComponent.sanitized(query);

    if (sanitized.length) {
      this.searchResponse = '';
      this.currentPage = page;
      // Search all indexes on ES
      if (index !== 'all') {
        this.es1.getPaginatedDocuments(sanitized, page, index).then((body) => {
          if (body.hits.total > 0) {
            this.esData = body.hits.hits;
            this.totalHits = body.hits.total;
            this.searchTime = body.hits.time;
            this.totalPages = Array(Math.ceil(body.hits.total / this.PER_PAGE)).fill(4);
          } else {
            this.searchResponse = 'No matches found';
          }
        }, (err) => {
          this.searchResponse = 'Oops! Something went wrong... ERROR: ' + err.error;
        });
      } else {
        this.es1.getPaginatedDocuments(sanitized, page).then((body) => {
          if (body.hits.total > 0) {
            this.esData = body.hits.hits;
            this.totalHits = body.hits.total;
            this.searchTime = body.took;
            this.totalPages = Array(Math.ceil(body.hits.total / this.PER_PAGE)).fill(4);
          } else {
            this.searchResponse = 'No matches found';
          }
        }, (err) => {
          this.searchResponse = 'Oops! Something went wrong... ERROR: ' + err.error;
        });
      }
    } else {
      this.searchResponse = 'Nothing found';
    }
  }



}