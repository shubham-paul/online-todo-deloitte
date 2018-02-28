import {Column} from "../models/Column";
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {PaginationService} from "../services/PaginationService";
import {GridLoadUtil} from "../util/GridLoadUtil";
import {ProgressBarService} from "../services/ProgressBarService";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'xfd-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [PaginationService, GridLoadUtil, ProgressBarService]
})
export class TableComponent implements OnInit, OnChanges {
  get columns(): Column[] {
    return this.tableLoader.columns;
  }

  @Input()
  set columns(cols: Column[]) {
    this.tableLoader.setColumns(cols);
  }

  get totalRows(): any[] {
    return this._totalRows;
  }

  @Input()
  set totalRows(row: any[]) {
    this._totalRows = row.slice(0);
  }

  get enableAddNavigation(): boolean {
    return this._enableAddNavigation;
  }

  @Input()
  set enableAddNavigation(enable: boolean) {
    this._enableAddNavigation = enable;
  }

  get enableEditNavigation(): boolean {
    return this._enableEditNavigation;
  }

  @Input()
  set enableEditNavigation(enable: boolean) {
    this._enableEditNavigation = enable;
  }

  get enableDelete(): boolean {
    return this._enableDelete;
  }

  @Input()
  set enableDelete(enable: boolean) {
    this._enableDelete = enable;
  }

  get enableFilter(): boolean {
    return this._enableFilter;
  }

  @Input()
  set enableFilter(enable: boolean) {
    this._enableFilter = enable;
  }

  _enableAddNavigation: boolean;
  _enableEditNavigation: boolean;
  _enableDelete: boolean;
  _enableFilter: boolean;
  _totalRows: any[];
  rows: any[] = [];
  searchText: string;
  routerLinked: string;
  showFilter: boolean;
  isLoaded: boolean;
  @Output() navigateNew = new EventEmitter<boolean>();
  @Output() navigateEdit = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() completeRow = new EventEmitter<any>();

  constructor(private paginService: PaginationService,
              private tableLoader: GridLoadUtil,
              //private progressBarService: ProgressBarService,
              private route: ActivatedRoute,
              private router: Router) {
    this.paginService.itemsToDisplayChange.subscribe((value) => {
      this.rows = value
    });
  }

  ngOnInit() {
    this.isLoaded = false;
    this.beforeDataLoaded();
    //this.progressBarService.startProgress();
    this.routerLinked = this.route.snapshot.url[0].path.replace('Grid', '') + '/';
    this.showFilter = true;
  }

  beforeDataLoaded(): void {
    this.paginService.setPaginationDisabled(true);
    this.paginService.setTotalItems([]);
  }

  afterDataLoaded(data): void {
    this.paginService.setTotalItems(data);
    this.paginService.setPaginationDisabled((data.length == 0));
    this.paginService.setActivePage(1);
  }

  navigateToCreate() {
    this.navigateNew.emit(true);
  }

  navigateToEdit(row) {
    this.navigateEdit.emit(row);
  }

  delete(row) {
    this.deleteRow.emit(row);
  }

  complete(row){
    this.completeRow.emit(row);
  }

  applyFilter() {
    this.paginService.applyFilter(this.searchText);
  }

  clearFilter() {
    this.searchText = '';
    this.paginService.clearFilter();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.totalRows !== undefined && !changes.totalRows.isFirstChange()) {
      this.afterDataLoaded(changes.totalRows.currentValue);
      //this.progressBarService.endProgress();
      this.isLoaded = true;
    }
  }
}
