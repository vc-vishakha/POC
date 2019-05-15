import { Component, OnInit , ViewChild, Inject, Renderer2, ViewEncapsulation  } from '@angular/core';

import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar  } from '@angular/material';
import { DOCUMENT } from '@angular/common';


export interface IScript {
  name: string;
  src: string;
  attr?: string;
  attrValue?: string;
  type: string;
}

export const externalScripts: IScript[] = [
  { name : 'custom-element', src: `custom-element.js`,  type: 'text/javascript' },
  // { name : 'runtime', src: `custom-element-runtime.js`, type: 'text/javascript' },
  // { name : 'es2015-polyfills', src: `custom-element-es2015-polyfills.js`, attr: 'nomodule', attrValue: '', type: 'text/javascript' },
  // { name : 'polyfills', src: `custom-element-polyfills.js`,  type: 'text/javascript' },
  // { name : 'scripts', src: `custom-element-scripts.js`, type: 'text/javascript' },
  // { name : 'main', src: `custom-element-main.js`, type: 'text/javascript' },
  { name : 'styles', src: `styles.css`, type: 'stylesheet' },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public file = '';

  displayedColumns = ['firstName' , 'lastName', 'email', 'mobile' , 'action'];
  dataSource: MatTableDataSource<any>;
  userData: any = [];
  imagePath = 'http://localhost:4200/';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router ,
    public snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
  ) { }

  // TABLE SEARCH FILTER
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  initTable() {
    this.dataSource = new MatTableDataSource(this.userData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.renderUsers();
    // this.loadScripts();
  }

  renderUsers() {
    if ( localStorage.getItem('userListData') !== undefined && localStorage.getItem('userListData') != null ) {
      this.userData = JSON.parse(localStorage.getItem('userListData'));
    }
    this.initTable();
  }

  // OPENS SNACK BAR WITH DATA AND ACTION
  openSnackBar(msg: string , action ?: string ) {
    this.snackBar.open(msg, action ,  {
      duration: 1500,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

  }

  logOut() {
    localStorage.removeItem('pocLoggedUser');
    this.router.navigate(['/login']);
  }

  editUser(index: any) {
    this.router.navigate([`${index}/user`]);
  }

  deleteUser(index: any) {
    const confirmDelete = confirm('Are you sure you want to delete?');
    if ( !confirmDelete ) {
      return false;
    } else {
      this.userData.splice(index , 1);
      localStorage.setItem('userListData', JSON.stringify(this.userData)) ;
      this.renderUsers();
    }

  }

  /**
   * Dynamically Load Custom Element dependency scripts
   */
  loadScripts(): void {

    if ( this.document.getElementById('customSliderContainer') ) {

      if ( externalScripts.length > 0 ) {


        externalScripts.forEach((element: IScript, index: number) => {

          // Create & append script elements
          if ( element.type.toLowerCase() !== 'stylesheet' ) {

              const eleScriptTag: HTMLScriptElement = this.renderer2.createElement(`script`);
              eleScriptTag.type = element.type;
              eleScriptTag.src = `${this.imagePath}assets/custom-element/${element.src}`;
              if ( element.attr !== undefined && element.attr.trim() !== '' ) {
                eleScriptTag.setAttribute(element.attr, element.attrValue ? element.attrValue : '');
              }
              this.renderer2.appendChild(this.document.body, eleScriptTag);

          } else { // Create & append stylesheet elements

            const eleLinkTag: HTMLLinkElement = this.renderer2.createElement(`link`);
            eleLinkTag.rel = element.type;
            eleLinkTag.href = `${this.imagePath}assets/custom-element/${element.src}`;
            if ( element.attr !== undefined && element.attr.trim() !== '' ) {
              eleLinkTag.setAttribute(element.attr, element.attrValue ? element.attrValue : '');
            }

            this.renderer2.appendChild(this.document.head, eleLinkTag);

          }

        });

      }

    }

  }

}
