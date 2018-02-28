

import {Component, OnInit} from "@angular/core";
import {PaginationService} from "../services/PaginationService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'xfd-gridbar',
  templateUrl: './gridbar.component.html'
})
export class GridBarComponent implements OnInit {
  searchText: string;
  routerLinked: string;

  constructor(private paginService: PaginationService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.routerLinked = this.route.snapshot.url[0].path + '/';
    console.log(this.routerLinked);
  }

  navigateToCreate() {
    this.router.navigate([this.routerLinked]);
  }

  applyFilter() {
    this.paginService.applyFilter(this.searchText);
  }

  clearFilter() {
    this.searchText = '';
    this.paginService.clearFilter();
  }
}
