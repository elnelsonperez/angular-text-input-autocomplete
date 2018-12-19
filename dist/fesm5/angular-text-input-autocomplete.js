import { Component, ElementRef, HostListener, ViewChild, ComponentFactoryResolver, Directive, EventEmitter, Injector, Input, Output, ViewContainerRef, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextInputAutocompleteDirective = /** @class */ (function () {
    function TextInputAutocompleteDirective(componentFactoryResolver, viewContainerRef, injector, elm) {
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
        this.getChoiceLabel = function (choice) { return choice; };
        /* tslint:disable member-ordering */
        this.valueKey = 'id';
        this.labelKey = 'name';
        this.menuHidden$ = new Subject();
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.findChoices = /**
     * @param {?} searchText
     * @return {?}
     */
    function (searchText) {
        var _this = this;
        return this.choices.filter(function (c) {
            return c[_this.labelKey].toLowerCase().includes(searchText.toLowerCase()) ||
                c[_this.valueKey] == searchText;
        });
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.onKeypress = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (key === this.triggerCharacter) {
            this.showMenu();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.menu) {
            if (value[this.menu.triggerCharacterPosition] !== this.triggerCharacter) {
                this.hideMenu();
            }
            else {
                /** @type {?} */
                var cursor = this.elm.nativeElement.selectionStart;
                if (cursor < this.menu.triggerCharacterPosition) {
                    this.hideMenu();
                }
                else {
                    /** @type {?} */
                    var searchText = value.slice(this.menu.triggerCharacterPosition + 1, cursor);
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
                            .then(function (choices) {
                            if (_this.menu) {
                                _this.menu.component.instance.choices = choices;
                                _this.menu.component.instance.choiceLoading = false;
                                _this.menu.component.changeDetectorRef.detectChanges();
                            }
                        })
                            .catch(function (err) {
                            if (_this.menu) {
                                _this.menu.component.instance.choiceLoading = false;
                                _this.menu.component.instance.choiceLoadError = err;
                                _this.menu.component.changeDetectorRef.detectChanges();
                            }
                        });
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.menu) {
            this.menu.lastCaretPosition = this.elm.nativeElement.selectionStart;
        }
    };
    /**
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.showMenu = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.menu) {
            /** @type {?} */
            var menuFactory = this.componentFactoryResolver.resolveComponentFactory(this.menuComponent);
            this.menu = {
                component: this.viewContainerRef.createComponent(menuFactory, 0, this.injector),
                triggerCharacterPosition: this.elm.nativeElement.selectionStart
            };
            /** @type {?} */
            var lineHeight = +/** @type {?} */ ((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
            var _a = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart), top_1 = _a.top, left = _a.left;
            this.menu.component.instance.position = {
                top: top_1 + lineHeight,
                left: left
            };
            this.menu.component.changeDetectorRef.detectChanges();
            this.menu.component.instance.selectChoice
                .pipe(takeUntil(this.menuHidden$))
                .subscribe(function (choice) {
                /** @type {?} */
                var label = _this.getChoiceLabel(choice);
                /** @type {?} */
                var textarea = _this.elm.nativeElement;
                /** @type {?} */
                var value = textarea.value;
                /** @type {?} */
                var startIndex = /** @type {?} */ ((_this.menu)).triggerCharacterPosition;
                /** @type {?} */
                var start = value.slice(0, startIndex);
                /** @type {?} */
                var caretPosition = /** @type {?} */ ((_this.menu)).lastCaretPosition || textarea.selectionStart;
                /** @type {?} */
                var end = value.slice(caretPosition);
                textarea.value = start + label + end;
                // force ng model / form control to update
                textarea.dispatchEvent(new Event('input'));
                _this.hideMenu();
                /** @type {?} */
                var setCursorAt = (start + label).length;
                textarea.setSelectionRange(setCursorAt, setCursorAt);
                textarea.focus();
                _this.choiceSelected.emit({
                    choice: choice,
                    insertedAt: {
                        start: startIndex,
                        end: startIndex + label.length
                    }
                });
            });
            this.menuShown.emit();
        }
    };
    /**
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.hideMenu = /**
     * @return {?}
     */
    function () {
        if (this.menu) {
            this.menu.component.destroy();
            this.menuHidden$.next();
            this.menuHidden.emit();
            this.menu = undefined;
        }
    };
    /**
     * @return {?}
     */
    TextInputAutocompleteDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.hideMenu();
    };
    TextInputAutocompleteDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
                },] },
    ];
    /** @nocollapse */
    TextInputAutocompleteDirective.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ViewContainerRef },
        { type: Injector },
        { type: ElementRef }
    ]; };
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
    return TextInputAutocompleteDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextInputAutocompleteContainerComponent = /** @class */ (function () {
    function TextInputAutocompleteContainerComponent() {
    }
    TextInputAutocompleteContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'mwl-text-input-autocomplete-container',
                    styles: [
                        "\n    :host {\n      position: relative;\n      display: block;\n    }\n  "
                    ],
                    template: '<ng-content></ng-content>'
                },] },
    ];
    return TextInputAutocompleteContainerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextInputAutocompleteModule = /** @class */ (function () {
    function TextInputAutocompleteModule() {
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
    return TextInputAutocompleteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { TextInputAutocompleteMenuComponent, TextInputAutocompleteModule, TextInputAutocompleteContainerComponent as ɵb, TextInputAutocompleteDirective as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFxuICAgICAgKm5nSWY9XCJjaG9pY2VzPy5sZW5ndGggPiAwXCJcbiAgICAgICNkcm9wZG93bk1lbnVcbiAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXG4gICAgICBbc3R5bGUudG9wLnB4XT1cInBvc2l0aW9uPy50b3BcIlxuICAgICAgW3N0eWxlLmxlZnQucHhdPVwicG9zaXRpb24/LmxlZnRcIj5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGNob2ljZXM7IHRyYWNrQnk6dHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVDaG9pY2UgPT09IGNob2ljZVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDaG9pY2UubmV4dChjaG9pY2UpXCI+XG4gICAgICAgICAge3sgY2hvaWNlW2xhYmVsS2V5XSA/ICBjaG9pY2VbbGFiZWxLZXldIDogY2hvaWNlIH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93bk1lbnUnKSBkcm9wZG93bk1lbnVFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuICBwb3NpdGlvbjogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gIHNlbGVjdENob2ljZSA9IG5ldyBTdWJqZWN0KCk7XG4gIGFjdGl2ZUNob2ljZTogYW55O1xuICBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gIGNob2ljZUxvYWRFcnJvcjogYW55O1xuICBjaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gIGxhYmVsS2V5ID0gJ25hbWUnO1xuICBwcml2YXRlIF9jaG9pY2VzOiBhbnlbXTtcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIGNob2ljZTogYW55KSA9PlxuICAgIHR5cGVvZiBjaG9pY2UuaWQgIT09ICd1bmRlZmluZWQnID8gY2hvaWNlLmlkIDogY2hvaWNlO1xuXG4gIHNldCBjaG9pY2VzKGNob2ljZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgaWYgKGNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPT09IC0xICYmIGNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVDaG9pY2UgPSBjaG9pY2VzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaG9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCArIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd1VwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4IC0gMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggLSAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPiAtMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0Q2hvaWNlLm5leHQodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9DaG9pY2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gdGhpcy5fY2hvaWNlc1tpbmRleF07XG4gICAgaWYgKHRoaXMuZHJvcGRvd25NZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgdWxQb3NpdGlvbiA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGkgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBsaVBvc2l0aW9uID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAobGlQb3NpdGlvbi50b3AgPCB1bFBvc2l0aW9uLnRvcCkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSBlbHNlIGlmIChsaVBvc2l0aW9uLmJvdHRvbSA+IHVsUG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXIgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIEBJbnB1dCgpIHZhbHVlS2V5OiBzdHJpbmcgPSAnaWQnO1xuXG4gIEBJbnB1dCgpIGxhYmVsS2V5OiBzdHJpbmcgPSAnbmFtZSc7XG5cbiAgQElucHV0KCkgY2hvaWNlczogYW55W107XG5cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBmaW5kQ2hvaWNlcyhzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihcbiAgICAgIGMgPT5cbiAgICAgICAgY1t0aGlzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkgfHxcbiAgICAgICAgY1t0aGlzLnZhbHVlS2V5XSA9PSBzZWFyY2hUZXh0XG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQua2V5J10pXG4gIG9uS2V5cHJlc3Moa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArIDEsXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5sYWJlbEtleSA9IHRoaXMubGFiZWxLZXk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNZW51KCkge1xuICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICBjb25zdCBtZW51RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFxuICAgICAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gICAgICA+KHRoaXMubWVudUNvbXBvbmVudCk7XG4gICAgICB0aGlzLm1lbnUgPSB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBtZW51RmFjdG9yeSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICB9O1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9ICtnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50XG4gICAgICApLmxpbmVIZWlnaHQhLnJlcGxhY2UoL3B4JC8sICcnKTtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiB0b3AgKyBsaW5lSGVpZ2h0LFxuICAgICAgICBsZWZ0XG4gICAgICB9O1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs0QkFvQ2lCLElBQUksT0FBTyxFQUFFOzZCQUlaLEtBQUs7d0JBQ1YsTUFBTTt5QkFFTCxVQUFDLEtBQWEsRUFBRSxNQUFXO1lBQ3JDLE9BQUEsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFdBQVcsR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLE1BQU07U0FBQTs7SUFFdkQsc0JBQUksdURBQU87Ozs7UUFPWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0Qjs7Ozs7UUFURCxVQUFZLE9BQWM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFD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