/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
export class TextInputAutocompleteMenuComponent {
    constructor() {
        this.selectChoice = new Subject();
        this.choiceLoading = false;
        this.labelKey = 'name';
        this.trackById = (index, choice) => typeof choice.id !== 'undefined' ? choice.id : choice;
    }
    /**
     * @param {?} choices
     * @return {?}
     */
    set choices(choices) {
        this._choices = choices;
        if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
            this.activeChoice = choices[0];
        }
    }
    /**
     * @return {?}
     */
    get choices() {
        return this._choices;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onArrowDown(event) {
        event.preventDefault();
        /** @type {?} */
        const index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index + 1]) {
            this.scrollToChoice(index + 1);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onArrowUp(event) {
        event.preventDefault();
        /** @type {?} */
        const index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index - 1]) {
            this.scrollToChoice(index - 1);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onEnter(event) {
        if (this.choices.indexOf(this.activeChoice) > -1) {
            event.preventDefault();
            this.selectChoice.next(this.activeChoice);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    scrollToChoice(index) {
        this.activeChoice = this._choices[index];
        if (this.dropdownMenuElement) {
            /** @type {?} */
            const ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
            /** @type {?} */
            const li = this.dropdownMenuElement.nativeElement.children[index];
            /** @type {?} */
            const liPosition = li.getBoundingClientRect();
            if (liPosition.top < ulPosition.top) {
                li.scrollIntoView();
            }
            else if (liPosition.bottom > ulPosition.bottom) {
                li.scrollIntoView(false);
            }
        }
    }
}
TextInputAutocompleteMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-text-input-autocomplete-menu',
                template: `
    <ul 
      *ngIf="choices?.length > 0"
      #dropdownMenu
      class="dropdown-menu"
      [style.top.px]="position?.top"
      [style.left.px]="position?.left">
      <li
        *ngFor="let choice of choices; trackBy:trackById"
        [class.active]="activeChoice === choice">
        <a
          href="javascript:;"
          (click)="selectChoice.next(choice)">
          {{ choice[labelKey] ?  choice[labelKey] : choice }}
        </a>
      </li>
    </ul>
  `,
                styles: [
                    `
      .dropdown-menu {
        display: block;
        max-height: 200px;
        overflow-y: auto;
      }
    `
                ]
            },] },
];
TextInputAutocompleteMenuComponent.propDecorators = {
    dropdownMenuElement: [{ type: ViewChild, args: ['dropdownMenu',] }],
    onArrowDown: [{ type: HostListener, args: ['document:keydown.ArrowDown', ['$event'],] }],
    onArrowUp: [{ type: HostListener, args: ['document:keydown.ArrowUp', ['$event'],] }],
    onEnter: [{ type: HostListener, args: ['document:keydown.Enter', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.dropdownMenuElement;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.position;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.selectChoice;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.activeChoice;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.searchText;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.choiceLoadError;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.choiceLoading;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.labelKey;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype._choices;
    /** @type {?} */
    TextInputAutocompleteMenuComponent.prototype.trackById;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQWdDL0IsTUFBTTs7NEJBR1csSUFBSSxPQUFPLEVBQUU7NkJBSVosS0FBSzt3QkFDVixNQUFNO3lCQUVMLENBQUMsS0FBYSxFQUFFLE1BQVcsRUFBRSxFQUFFLENBQ3pDLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07Ozs7OztJQUV2RCxJQUFJLE9BQU8sQ0FBQyxPQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkUsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEM7S0FDRjs7OztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBb0I7UUFDOUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOztRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7OztJQUdELFNBQVMsQ0FBQyxLQUFvQjtRQUM1QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7O0lBR0QsT0FBTyxDQUFDLEtBQW9CO1FBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2hELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0M7S0FDRjs7Ozs7SUFFTyxjQUFjLENBQUMsS0FBYTtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7O1lBQzVCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7WUFDbEYsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ2xFLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlDLElBQUksVUFBVSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDckI7aUJBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7OztZQTNGSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztnQkFDNUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDtnQkFDRCxNQUFNLEVBQUU7b0JBQ047Ozs7OztLQU1DO2lCQUNGO2FBQ0Y7OztrQ0FFRSxTQUFTLFNBQUMsY0FBYzswQkF1QnhCLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFTckQsWUFBWSxTQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDO3NCQVNuRCxZQUFZLFNBQUMsd0JBQXdCLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dWwgXG4gICAgICAqbmdJZj1cImNob2ljZXM/Lmxlbmd0aCA+IDBcIlxuICAgICAgI2Ryb3Bkb3duTWVudVxuICAgICAgY2xhc3M9XCJkcm9wZG93bi1tZW51XCJcbiAgICAgIFtzdHlsZS50b3AucHhdPVwicG9zaXRpb24/LnRvcFwiXG4gICAgICBbc3R5bGUubGVmdC5weF09XCJwb3NpdGlvbj8ubGVmdFwiPlxuICAgICAgPGxpXG4gICAgICAgICpuZ0Zvcj1cImxldCBjaG9pY2Ugb2YgY2hvaWNlczsgdHJhY2tCeTp0cmFja0J5SWRcIlxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cImFjdGl2ZUNob2ljZSA9PT0gY2hvaWNlXCI+XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6O1wiXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdENob2ljZS5uZXh0KGNob2ljZSlcIj5cbiAgICAgICAgICB7eyBjaG9pY2VbbGFiZWxLZXldID8gIGNob2ljZVtsYWJlbEtleV0gOiBjaG9pY2UgfX1cbiAgICAgICAgPC9hPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBtYXgtaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcbiAgICAgIH1cbiAgICBgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duTWVudScpIGRyb3Bkb3duTWVudUVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTFVMaXN0RWxlbWVudD47XG4gIHBvc2l0aW9uOiB7IHRvcDogbnVtYmVyOyBsZWZ0OiBudW1iZXIgfTtcbiAgc2VsZWN0Q2hvaWNlID0gbmV3IFN1YmplY3QoKTtcbiAgYWN0aXZlQ2hvaWNlOiBhbnk7XG4gIHNlYXJjaFRleHQ6IHN0cmluZztcbiAgY2hvaWNlTG9hZEVycm9yOiBhbnk7XG4gIGNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgbGFiZWxLZXkgPSAnbmFtZSc7XG4gIHByaXZhdGUgX2Nob2ljZXM6IGFueVtdO1xuICB0cmFja0J5SWQgPSAoaW5kZXg6IG51bWJlciwgY2hvaWNlOiBhbnkpID0+XG4gICAgdHlwZW9mIGNob2ljZS5pZCAhPT0gJ3VuZGVmaW5lZCcgPyBjaG9pY2UuaWQgOiBjaG9pY2U7XG5cbiAgc2V0IGNob2ljZXMoY2hvaWNlczogYW55W10pIHtcbiAgICB0aGlzLl9jaG9pY2VzID0gY2hvaWNlcztcbiAgICBpZiAoY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA9PT0gLTEgJiYgY2hvaWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IGNob2ljZXNbMF07XG4gICAgfVxuICB9XG5cbiAgZ2V0IGNob2ljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXM7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93RG93bicsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4ICsgMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggKyAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkFycm93VXAnLCBbJyRldmVudCddKVxuICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggLSAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uRW50ZXInLCBbJyRldmVudCddKVxuICBvbkVudGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKSA+IC0xKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZWxlY3RDaG9pY2UubmV4dCh0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzY3JvbGxUb0Nob2ljZShpbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVDaG9pY2UgPSB0aGlzLl9jaG9pY2VzW2luZGV4XTtcbiAgICBpZiAodGhpcy5kcm9wZG93bk1lbnVFbGVtZW50KSB7XG4gICAgICBjb25zdCB1bFBvc2l0aW9uID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBjb25zdCBsaSA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuW2luZGV4XTtcbiAgICAgIGNvbnN0IGxpUG9zaXRpb24gPSBsaS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmIChsaVBvc2l0aW9uLnRvcCA8IHVsUG9zaXRpb24udG9wKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICB9IGVsc2UgaWYgKGxpUG9zaXRpb24uYm90dG9tID4gdWxQb3NpdGlvbi5ib3R0b20pIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19