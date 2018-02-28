
import {Component} from '@angular/core';
import {PaginationService} from "../services/PaginationService";

@Component({
  selector: 'ngbd-pagination-basic',
  templateUrl: './pagination.component.html'
})
export class NgbdPaginationBasic {
  itemsPerPage: number;
  totalItems: number;
  page: number;
  boundaryLinks: boolean;
  isDisabled: boolean;
  maxSize: number;

  constructor(private service: PaginationService) {
    this.boundaryLinks = true;
    this.itemsPerPage = service.getPageSize();
    this.isDisabled = service.isPaginationDisabled();
    this.totalItems = service.getNumberOfItems();
    this.page = 0;
    this.maxSize = 3;

    this.service.totalItemsChange.subscribe((value) => {
      this.totalItems = value;
    });

    this.service.activePageChange.subscribe((value) => {
      this.page = value;
      this.loadPage(value);
    });
  }

  /**
   * This function executes when the user clicks a new pageNumber/first/last page
   * on the pagination bar. Its used to set the items displayed on that page.
   * @param page - pageNumber clicked by the user
   */
  loadPage(page: number): void {
    this.totalItems = this.service.getNumberOfItems();
    this.boundaryLinks = (this.totalItems > (this.itemsPerPage * (this.maxSize + 1))) ? true : false;
    this.service.setItemsToDisplay(page);
  }
}
