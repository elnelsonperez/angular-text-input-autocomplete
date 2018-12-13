/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
var TextInputAutocompleteMenuComponent = /** @class */ (function () {
    function TextInputAutocompleteMenuComponent() {
        this.selectChoice = new Subject();
        this.choiceLoading = false;
        this.labelKey = 'name';
        this.trackById = function (index, choice) {
            return typeof choice.id !== 'undefined' ? choice.id : choice;
        };
    }
    Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "choices", {
        get: /**
         * @return {?}
         */
        function () {
            return this._choices;
        },
        set: /**
         * @param {?} choices
         * @return {?}
         */
        function (choices) {
            this._choices = choices;
            if (choices.indexOf(this.activeChoice) === -1 && choices.length > 0) {
                this.activeChoice = choices[0];
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    TextInputAutocompleteMenuComponent.prototype.onArrowDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        /** @type {?} */
        var index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index + 1]) {
            this.scrollToChoice(index + 1);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TextInputAutocompleteMenuComponent.prototype.onArrowUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        /** @type {?} */
        var index = this.choices.indexOf(this.activeChoice);
        if (this.choices[index - 1]) {
            this.scrollToChoice(index - 1);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TextInputAutocompleteMenuComponent.prototype.onEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.choices.indexOf(this.activeChoice) > -1) {
            event.preventDefault();
            this.selectChoice.next(this.activeChoice);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    TextInputAutocompleteMenuComponent.prototype.scrollToChoice = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.activeChoice = this._choices[index];
        if (this.dropdownMenuElement) {
            /** @type {?} */
            var ulPosition = this.dropdownMenuElement.nativeElement.getBoundingClientRect();
            /** @type {?} */
            var li = this.dropdownMenuElement.nativeElement.children[index];
            /** @type {?} */
            var liPosition = li.getBoundingClientRect();
            if (liPosition.top < ulPosition.top) {
                li.scrollIntoView();
            }
            else if (liPosition.bottom > ulPosition.bottom) {
                li.scrollIntoView(false);
            }
        }
    };
    TextInputAutocompleteMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-text-input-autocomplete-menu',
                    template: "\n    <ul \n      *ngIf=\"choices?.length > 0\"\n      #dropdownMenu\n      class=\"dropdown-menu\"\n      [style.top.px]=\"position?.top\"\n      [style.left.px]=\"position?.left\">\n      <li\n        *ngFor=\"let choice of choices; trackBy:trackById\"\n        [class.active]=\"activeChoice === choice\">\n        <a\n          href=\"javascript:;\"\n          (click)=\"selectChoice.next(choice)\">\n          {{ choice[labelKey] ?  choice[labelKey] : choice }}\n        </a>\n      </li>\n    </ul>\n  ",
                    styles: [
                        "\n      .dropdown-menu {\n        display: block;\n        max-height: 200px;\n        overflow-y: auto;\n      }\n    "
                    ]
                },] },
    ];
    TextInputAutocompleteMenuComponent.propDecorators = {
        dropdownMenuElement: [{ type: ViewChild, args: ['dropdownMenu',] }],
        onArrowDown: [{ type: HostListener, args: ['document:keydown.ArrowDown', ['$event'],] }],
        onArrowUp: [{ type: HostListener, args: ['document:keydown.ArrowUp', ['$event'],] }],
        onEnter: [{ type: HostListener, args: ['document:keydown.Enter', ['$event'],] }]
    };
    return TextInputAutocompleteMenuComponent;
}());
export { TextInputAutocompleteMenuComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLyIsInNvdXJjZXMiOlsidGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7OzRCQW1DZCxJQUFJLE9BQU8sRUFBRTs2QkFJWixLQUFLO3dCQUNWLE1BQU07eUJBRUwsVUFBQyxLQUFhLEVBQUUsTUFBVztZQUNyQyxPQUFBLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFBckQsQ0FBcUQ7O0lBRXZELHNCQUFJLHVEQUFPOzs7O1FBT1g7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7Ozs7O1FBVEQsVUFBWSxPQUFjO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lBQ3hCLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hDO1NBQ0Y7OztPQUFBOzs7OztJQU9ELHdEQUFXOzs7O0lBRFgsVUFDWSxLQUFvQjtRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBQ3ZCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7O0lBR0Qsc0RBQVM7Ozs7SUFEVCxVQUNVLEtBQW9CO1FBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFDdkIsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEM7S0FDRjs7Ozs7SUFHRCxvREFBTzs7OztJQURQLFVBQ1EsS0FBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDaEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzQztLQUNGOzs7OztJQUVPLDJEQUFjOzs7O2NBQUMsS0FBYTtRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7O1lBQzVCLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7WUFDbEYsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBQ2xFLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzlDLElBQUksVUFBVSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNuQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDckI7aUJBQU0sSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7U0FDRjs7O2dCQTNGSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGtDQUFrQztvQkFDNUMsUUFBUSxFQUFFLDZmQWlCVDtvQkFDRCxNQUFNLEVBQUU7d0JBQ04seUhBTUM7cUJBQ0Y7aUJBQ0Y7OztzQ0FFRSxTQUFTLFNBQUMsY0FBYzs4QkF1QnhCLFlBQVksU0FBQyw0QkFBNEIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0QkFTckQsWUFBWSxTQUFDLDBCQUEwQixFQUFFLENBQUMsUUFBUSxDQUFDOzBCQVNuRCxZQUFZLFNBQUMsd0JBQXdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7OzZDQTNFcEQ7O1NBaUNhLGtDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bCBcbiAgICAgICpuZ0lmPVwiY2hvaWNlcz8ubGVuZ3RoID4gMFwiXG4gICAgICAjZHJvcGRvd25NZW51XG4gICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIlxuICAgICAgW3N0eWxlLnRvcC5weF09XCJwb3NpdGlvbj8udG9wXCJcbiAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInBvc2l0aW9uPy5sZWZ0XCI+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBjaG9pY2VzOyB0cmFja0J5OnRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlQ2hvaWNlID09PSBjaG9pY2VcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2hvaWNlLm5leHQoY2hvaWNlKVwiPlxuICAgICAgICAgIHt7IGNob2ljZVtsYWJlbEtleV0gPyAgY2hvaWNlW2xhYmVsS2V5XSA6IGNob2ljZSB9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25NZW51JykgZHJvcGRvd25NZW51RWxlbWVudDogRWxlbWVudFJlZjxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcG9zaXRpb246IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9O1xuICBzZWxlY3RDaG9pY2UgPSBuZXcgU3ViamVjdCgpO1xuICBhY3RpdmVDaG9pY2U6IGFueTtcbiAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICBjaG9pY2VMb2FkRXJyb3I6IGFueTtcbiAgY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICBsYWJlbEtleSA9ICduYW1lJztcbiAgcHJpdmF0ZSBfY2hvaWNlczogYW55W107XG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCBjaG9pY2U6IGFueSkgPT5cbiAgICB0eXBlb2YgY2hvaWNlLmlkICE9PSAndW5kZWZpbmVkJyA/IGNob2ljZS5pZCA6IGNob2ljZTtcblxuICBzZXQgY2hvaWNlcyhjaG9pY2VzOiBhbnlbXSkge1xuICAgIHRoaXMuX2Nob2ljZXMgPSBjaG9pY2VzO1xuICAgIGlmIChjaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID09PSAtMSAmJiBjaG9pY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gY2hvaWNlc1swXTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hvaWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlcztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggKyAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCAtIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5FbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID4gLTEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdENob2ljZS5uZXh0KHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQ2hvaWNlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IHRoaXMuX2Nob2ljZXNbaW5kZXhdO1xuICAgIGlmICh0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHVsUG9zaXRpb24gPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxpID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY29uc3QgbGlQb3NpdGlvbiA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKGxpUG9zaXRpb24udG9wIDwgdWxQb3NpdGlvbi50b3ApIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH0gZWxzZSBpZiAobGlQb3NpdGlvbi5ib3R0b20gPiB1bFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=