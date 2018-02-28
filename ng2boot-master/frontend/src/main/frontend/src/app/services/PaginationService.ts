import {Injectable, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";


@Injectable()
export class PaginationService implements OnInit {
  private itemsToDisplay: any[];
  private totalItems: any[];
  private activePage: number;
  private pageSize: number;
  private paginationDisabled: boolean;
  private tempTotalItems: any[];
  private filterAltered: boolean;

  /*
    DECLARATION OF OBSERVABLES

    OBSERVABLES ARE USED SO THAT ANY CHANGES ON THE SERVICE, CAN BE COMMUNICATED
    TO THE SUBSCRIBED COMPONENTS
  */
  itemsToDisplayChange: Subject<any[]> = new Subject<any[]>();
  totalItemsChange: Subject<number> = new Subject<number>();
  activePageChange: Subject<number> = new Subject<number>();

  /*
    END OF OBSERVABLES
  */

  constructor() {
    this.itemsToDisplay = [];
    this.totalItems = [];
    this.activePage = 0;
    this.pageSize = 10;
    this.paginationDisabled = false;
    this.filterAltered = false;
  }

  ngOnInit() {
    this.filterAltered = false;
  }

  getTotalItems(): any[] {
    return this.totalItems;
  }

  getNumberOfItems(): number {
    return this.totalItems.length;
  }

  setPaginationDisabled(value: boolean): void {
    this.paginationDisabled = value;
  }

  isPaginationDisabled(): boolean {
    return this.paginationDisabled;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  setTotalItems(value: any[]): void {
    this.totalItems = value;
    this.totalItemsChange.next(this.totalItems.length);
  }

  setItemsToDisplay(page): void {
    let startIndex = this.getStartIndex(page);
    let endIndex = this.getEndIndex(startIndex);
    this.itemsToDisplay = this.totalItems.slice(startIndex, endIndex);
    this.itemsToDisplayChange.next(this.itemsToDisplay);
  }

  getStartIndex(page: number): number {
    return (page - 1) * this.pageSize;
  }

  getEndIndex(startIndex: number): number {
    return Math.min(startIndex + this.pageSize - 1,
      this.totalItems.length);
  }

  setActivePage(activePage: number): void {
    this.activePage = activePage;
    this.setItemsToDisplay(activePage);
    this.activePageChange.next(this.activePage);
  }

  applyFilter(filterText: string): void {
    if (!this.filterAltered) {
      this.tempTotalItems = this.totalItems;
      this.filterAltered = true;
    }

    if (filterText != "") {
      filterText = filterText.toUpperCase();
      this.itemsToDisplay = [];
      this.totalItems = [];
      this.tempTotalItems.forEach(element => {
        for (let property in element) {
          if (element.hasOwnProperty(property) && typeof element[property] === "string") {
            if (element[property].toUpperCase().indexOf(filterText) >= 0) {
              this.totalItems.push(element);
              break;
            }
          }
        }
      });
      this.totalItemsChange.next(this.totalItems.length);
      this.setItemsToDisplay(1);
    } else {
      this.clearFilter();
    }
  }

  clearFilter() {
    this.totalItems = this.tempTotalItems;
    this.totalItemsChange.next(this.totalItems.length);
    this.setItemsToDisplay(1);
    this.setActivePage(0);
  }
}
