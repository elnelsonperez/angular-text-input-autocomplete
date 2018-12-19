import { Component, ElementRef, HostListener, ViewChild, ComponentFactoryResolver, Directive, EventEmitter, Injector, Input, Output, ViewContainerRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextInputAutocompleteMenuComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextInputAutocompleteDirective {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} viewContainerRef
     * @param {?} injector
     * @param {?} elm
     */
    constructor(componentFactoryResolver, viewContainerRef, injector, elm) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.elm = elm;
        /**
         * The character that will trigger the menu to appear
         */
        this.triggerCharacter = '@';
        /**
         * The regular expression that will match the search text after the trigger character
         */
        this.searchRegexp = /^\w*$/;
        /**
         * The menu component to show with available options.
         * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
         */
        this.menuComponent = TextInputAutocompleteMenuComponent;
        /**
         * Called when the options menu is shown
         */
        this.menuShown = new EventEmitter();
        /**
         * Called when the options menu is hidden
         */
        this.menuHidden = new EventEmitter();
        /**
         * Called when a choice is selected
         */
        this.choiceSelected = new EventEmitter();
        /**
         * A function that formats the selected choice once selected.
         */
        this.getChoiceLabel = choice => choice;
        /* tslint:disable member-ordering */
        this.valueKey = 'id';
        this.labelKey = 'name';
        this.menuHidden$ = new Subject();
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    findChoices(searchText) {
        return this.choices.filter(c => c[this.labelKey].toLowerCase().includes(searchText.toLowerCase()) ||
            c[this.valueKey] == searchText);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    onKeypress(key) {
        if (key === this.triggerCharacter) {
            this.showMenu();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChange(value) {
        if (this.menu) {
            if (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter) {
                this.hideMenu();
            }
            else {
                /** @type {?} */
                const cursor = this.elm.nativeElement.selectionStart;
                if (cursor < this.menu.triggerCharacterPosition) {
                    this.hideMenu();
                }
                else {
                    /** @type {?} */
                    const searchText = value.slice(this.menu.triggerCharacterPosition + 1, cursor);
                    if (!searchText.match(this.searchRegexp)) {
                        this.hideMenu();
                    }
                    else {
                        this.menu.component.instance.searchText = searchText;
                        this.menu.component.instance.choices = [];
                        this.menu.component.instance.labelKey = this.labelKey;
                        this.menu.component.instance.choiceLoadError = undefined;
                        this.menu.component.instance.choiceLoading = true;
                        this.menu.component.changeDetectorRef.detectChanges();
                        Promise.resolve(this.findChoices(searchText))
                            .then(choices => {
                            if (this.menu) {
                                this.menu.component.instance.choices = choices;
                                this.menu.component.instance.choiceLoading = false;
                                this.menu.component.changeDetectorRef.detectChanges();
                            }
                        })
                            .catch(err => {
                            if (this.menu) {
                                this.menu.component.instance.choiceLoading = false;
                                this.menu.component.instance.choiceLoadError = err;
                                this.menu.component.changeDetectorRef.detectChanges();
                            }
                        });
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.menu) {
            this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
        }
    }
    /**
     * @return {?}
     */
    showMenu() {
        if (!this.menu) {
            /** @type {?} */
            const menuFactory = this.componentFactoryResolver.resolveComponentFactory(this.menuComponent);
            this.menu = {
                component: this.viewContainerRef.createComponent(menuFactory, 0, this.injector),
                triggerCharacterPosition: this.elm.nativeElement.selectionStart
            };
            /** @type {?} */
            const lineHeight = +/** @type {?} */ ((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
            const { top, left } = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart);
            this.menu.component.instance.position = {
                top: top + lineHeight,
                left
            };
            this.menu.component.changeDetectorRef.detectChanges();
            this.menu.component.instance.selectChoice
                .pipe(takeUntil(this.menuHidden$))
                .subscribe(choice => {
                /** @type {?} */
                const label = this.getChoiceLabel(choice);
                /** @type {?} */
                const textarea = this.elm.nativeElement;
                /** @type {?} */
                const value = textarea.value;
                /** @type {?} */
                const startIndex = /** @type {?} */ ((this.menu)).triggerCharacterPosition;
                /** @type {?} */
                const start = value.slice(0, startIndex);
                /** @type {?} */
                const caretPosition = /** @type {?} */ ((this.menu)).lastCaretPosition || textarea.selectionStart;
                /** @type {?} */
                const end = value.slice(caretPosition);
                textarea.value = start + label + end;
                // force ng model / form control to update
                textarea.dispatchEvent(new Event('input'));
                this.hideMenu();
                /** @type {?} */
                const setCursorAt = (start + label).length;
                textarea.setSelectionRange(setCursorAt, setCursorAt);
                textarea.focus();
                this.choiceSelected.emit({
                    choice,
                    insertedAt: {
                        start: startIndex,
                        end: startIndex + label.length
                    }
                });
            });
            this.menuShown.emit();
        }
    }
    /**
     * @return {?}
     */
    hideMenu() {
        if (this.menu) {
            this.menu.component.destroy();
            this.menuHidden$.next();
            this.menuHidden.emit();
            this.menu = undefined;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.hideMenu();
    }
}
TextInputAutocompleteDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
            },] },
];
/** @nocollapse */
TextInputAutocompleteDirective.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ViewContainerRef },
    { type: Injector },
    { type: ElementRef }
];
TextInputAutocompleteDirective.propDecorators = {
    triggerCharacter: [{ type: Input }],
    searchRegexp: [{ type: Input }],
    menuComponent: [{ type: Input }],
    menuShown: [{ type: Output }],
    menuHidden: [{ type: Output }],
    choiceSelected: [{ type: Output }],
    getChoiceLabel: [{ type: Input }],
    valueKey: [{ type: Input }],
    labelKey: [{ type: Input }],
    choices: [{ type: Input }],
    onKeypress: [{ type: HostListener, args: ['keypress', ['$event.key'],] }],
    onChange: [{ type: HostListener, args: ['input', ['$event.target.value'],] }],
    onBlur: [{ type: HostListener, args: ['blur',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextInputAutocompleteContainerComponent {
}
TextInputAutocompleteContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'mwl-text-input-autocomplete-container',
                styles: [
                    `
    :host {
      position: relative;
      display: block;
    }
  `
                ],
                template: '<ng-content></ng-content>'
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextInputAutocompleteModule {
}
TextInputAutocompleteModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TextInputAutocompleteDirective,
                    TextInputAutocompleteContainerComponent,
                    TextInputAutocompleteMenuComponent
                ],
                imports: [CommonModule],
                exports: [
                    TextInputAutocompleteDirective,
                    TextInputAutocompleteContainerComponent,
                    TextInputAutocompleteMenuComponent
                ],
                entryComponents: [TextInputAutocompleteMenuComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TextInputAutocompleteMenuComponent, TextInputAutocompleteModule, TextInputAutocompleteContainerComponent as ɵb, TextInputAutocompleteDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFxuICAgICAgKm5nSWY9XCJjaG9pY2VzPy5sZW5ndGggPiAwXCJcbiAgICAgICNkcm9wZG93bk1lbnVcbiAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXG4gICAgICBbc3R5bGUudG9wLnB4XT1cInBvc2l0aW9uPy50b3BcIlxuICAgICAgW3N0eWxlLmxlZnQucHhdPVwicG9zaXRpb24/LmxlZnRcIj5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGNob2ljZXM7IHRyYWNrQnk6dHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVDaG9pY2UgPT09IGNob2ljZVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDaG9pY2UubmV4dChjaG9pY2UpXCI+XG4gICAgICAgICAge3sgY2hvaWNlW2xhYmVsS2V5XSA/ICBjaG9pY2VbbGFiZWxLZXldIDogY2hvaWNlIH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93bk1lbnUnKSBkcm9wZG93bk1lbnVFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuICBwb3NpdGlvbjogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gIHNlbGVjdENob2ljZSA9IG5ldyBTdWJqZWN0KCk7XG4gIGFjdGl2ZUNob2ljZTogYW55O1xuICBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gIGNob2ljZUxvYWRFcnJvcjogYW55O1xuICBjaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gIGxhYmVsS2V5ID0gJ25hbWUnO1xuICBwcml2YXRlIF9jaG9pY2VzOiBhbnlbXTtcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIGNob2ljZTogYW55KSA9PlxuICAgIHR5cGVvZiBjaG9pY2UuaWQgIT09ICd1bmRlZmluZWQnID8gY2hvaWNlLmlkIDogY2hvaWNlO1xuXG4gIHNldCBjaG9pY2VzKGNob2ljZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgaWYgKGNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPT09IC0xICYmIGNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVDaG9pY2UgPSBjaG9pY2VzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaG9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCArIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd1VwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4IC0gMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggLSAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPiAtMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0Q2hvaWNlLm5leHQodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9DaG9pY2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gdGhpcy5fY2hvaWNlc1tpbmRleF07XG4gICAgaWYgKHRoaXMuZHJvcGRvd25NZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgdWxQb3NpdGlvbiA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGkgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBsaVBvc2l0aW9uID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAobGlQb3NpdGlvbi50b3AgPCB1bFBvc2l0aW9uLnRvcCkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSBlbHNlIGlmIChsaVBvc2l0aW9uLmJvdHRvbSA+IHVsUG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXIgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIEBJbnB1dCgpIHZhbHVlS2V5OiBzdHJpbmcgPSAnaWQnO1xuXG4gIEBJbnB1dCgpIGxhYmVsS2V5OiBzdHJpbmcgPSAnbmFtZSc7XG5cbiAgQElucHV0KCkgY2hvaWNlczogYW55W107XG5cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBmaW5kQ2hvaWNlcyhzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihcbiAgICAgIGMgPT5cbiAgICAgICAgY1t0aGlzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgY1t0aGlzLnZhbHVlS2V5XSA9PSBzZWFyY2hUZXh0XG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQua2V5J10pXG4gIG9uS2V5cHJlc3Moa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArIDEsXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5sYWJlbEtleSA9IHRoaXMubGFiZWxLZXk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNZW51KCkge1xuICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICBjb25zdCBtZW51RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFxuICAgICAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gICAgICA+KHRoaXMubWVudUNvbXBvbmVudCk7XG4gICAgICB0aGlzLm1lbnUgPSB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBtZW51RmFjdG9yeSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICB9O1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9ICtnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50XG4gICAgICApLmxpbmVIZWlnaHQhLnJlcGxhY2UoL3B4JC8sICcnKTtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiB0b3AgKyBsaW5lSGVpZ2h0LFxuICAgICAgICBsZWZ0XG4gICAgICB9O1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs0QkFvQ2lCLElBQUksT0FBTyxFQUFFOzZCQUlaLEtBQUs7d0JBQ1YsTUFBTTt5QkFFTCxDQUFDLEtBQWEsRUFBRSxNQUFXLEtBQ3JDLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNOzs7Ozs7SUFFdkQsSUFBSSxPQUFPLENBQUMsT0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7Ozs7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7S0FDdEI7Ozs7O0lBR0QsV0FBVyxDQUFDLEtBQW9CO1FBQzlCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7UUFDdkIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEM7S0FDRjs7Ozs7SUFHRCxTQUFTLENBQUMsS0FBb0I7UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOztRQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNoQztLQUNGOzs7OztJQUdELE9BQU8sQ0FBQyxLQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNoRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQzNDO0tBQ0Y7Ozs7O0lBRU8sY0FBYyxDQUFDLEtBQWE7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFOztZQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O1lBQ2xGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUNsRSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM5QyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDbkMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3JCO2lCQUFNLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUNoRCxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7Ozs7WUEzRkosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQ0FBa0M7Z0JBQzVDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOOzs7Ozs7S0FNQztpQkFDRjthQUNGOzs7a0NBRUUsU0FBUyxTQUFDLGNBQWM7MEJBdUJ4QixZQUFZLFNBQUMsNEJBQTRCLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBU3JELFlBQVksU0FBQywwQkFBMEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFTbkQsWUFBWSxTQUFDLHdCQUF3QixFQUFFLENBQUMsUUFBUSxDQUFDOzs7Ozs7O0FDM0VwRDs7Ozs7OztJQW9GRSxZQUNVLDBCQUNBLGtCQUNBLFVBQ0E7UUFIQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsYUFBUSxHQUFSLFFBQVE7UUFDUixRQUFHLEdBQUgsR0FBRzs7OztnQ0F0RGUsR0FBRzs7Ozs0QkFLUCxPQUFPOzs7Ozs2QkFNTixrQ0FBa0M7Ozs7eUJBS3JDLElBQUksWUFBWSxFQUFFOzs7OzBCQUtqQixJQUFJLFlBQVksRUFBRTs7Ozs4QkFLZCxJQUFJLFlBQVksRUFBdUI7Ozs7OEJBS2YsTUFBTSxJQUFJLE1BQU07O3dCQUd2QyxJQUFJO3dCQUVKLE1BQU07MkJBWVosSUFBSSxPQUFPLEVBQUU7S0FPL0I7Ozs7O0lBRUosV0FBVyxDQUFDLFVBQWtCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3hCLENBQUMsSUFDQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxVQUFVLENBQ2pDLENBQUM7S0FDSDs7Ozs7SUFHRCxVQUFVLENBQUMsR0FBVztRQUNwQixJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDakMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0tBQ0Y7Ozs7O0lBR0QsUUFBUSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO2lCQUFNOztnQkFDTCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUM7Z0JBQ3JELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQUU7b0JBQy9DLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakI7cUJBQU07O29CQUNMLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxFQUN0QyxNQUFNLENBQ1AsQ0FBQztvQkFDRixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUU7d0JBQ3hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDakI7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7d0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO3dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO3dCQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzt3QkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7d0JBQ3RELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQzs2QkFDMUMsSUFBSSxDQUFDLE9BQU87NEJBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQ0FDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7NkJBQ3ZEO3lCQUNGLENBQUM7NkJBQ0QsS0FBSyxDQUFDLEdBQUc7NEJBQ1IsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dDQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztnQ0FDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7NkJBQ3ZEO3lCQUNGLENBQUMsQ0FBQztxQkFDTjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjs7OztJQUdELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztTQUNyRTtLQUNGOzs7O0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOztZQUNkLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FFdkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzlDLFdBQVcsRUFDWCxDQUFDLEVBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FDZDtnQkFDRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjO2FBQ2hFLENBQUM7O1lBQ0YsTUFBTSxVQUFVLEdBQUcsb0JBQUMsZ0JBQWdCLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUN2QixDQUFDLFVBQVUsR0FBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsbUJBQW1CLENBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQ3RDLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHO2dCQUN0QyxHQUFHLEVBQUUsR0FBRyxHQUFHLFVBQVU7Z0JBQ3JCLElBQUk7YUFDTCxDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVk7aUJBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNqQyxTQUFTLENBQUMsTUFBTTs7Z0JBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Z0JBQzFDLE1BQU0sUUFBUSxHQUF3QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzs7Z0JBQzdELE1BQU0sS0FBSyxHQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUM7O2dCQUNyQyxNQUFNLFVBQVUsc0JBQUcsSUFBSSxDQUFDLElBQUksR0FBRSx3QkFBd0IsQ0FBQzs7Z0JBQ3ZELE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDOztnQkFDekMsTUFBTSxhQUFhLHNCQUNqQixJQUFJLENBQUMsSUFBSSxHQUFFLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUM7O2dCQUMxRCxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUN2QyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDOztnQkFFckMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O2dCQUNoQixNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUMzQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRCxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUN2QixNQUFNO29CQUNOLFVBQVUsRUFBRTt3QkFDVixLQUFLLEVBQUUsVUFBVTt3QkFDakIsR0FBRyxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTTtxQkFDL0I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2Qjs7Ozs7SUFHSyxRQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCOzs7OztJQUdILFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7OztZQXJNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUNOLGlGQUFpRjthQUNwRjs7OztZQTVCQyx3QkFBd0I7WUFVeEIsZ0JBQWdCO1lBSmhCLFFBQVE7WUFIUixVQUFVOzs7K0JBOEJULEtBQUs7MkJBS0wsS0FBSzs0QkFNTCxLQUFLO3dCQUtMLE1BQU07eUJBS04sTUFBTTs2QkFLTixNQUFNOzZCQUtOLEtBQUs7dUJBR0wsS0FBSzt1QkFFTCxLQUFLO3NCQUVMLEtBQUs7eUJBMkJMLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUM7dUJBT3ZDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztxQkE0QzdDLFlBQVksU0FBQyxNQUFNOzs7Ozs7O0FDdEp0Qjs7O1lBRUMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1Q0FBdUM7Z0JBQ2pELE1BQU0sRUFBRTtvQkFDTjs7Ozs7R0FLRDtpQkFDQTtnQkFDRCxRQUFRLEVBQUUsMkJBQTJCO2FBQ3RDOzs7Ozs7O0FDYkQ7OztZQU1DLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1osOEJBQThCO29CQUM5Qix1Q0FBdUM7b0JBQ3ZDLGtDQUFrQztpQkFDbkM7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUU7b0JBQ1AsOEJBQThCO29CQUM5Qix1Q0FBdUM7b0JBQ3ZDLGtDQUFrQztpQkFDbkM7Z0JBQ0QsZUFBZSxFQUFFLENBQUMsa0NBQWtDLENBQUM7YUFDdEQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==