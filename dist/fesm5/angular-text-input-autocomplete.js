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
            return c[_this.labelKey].toLowerCase().includes(searchText.toLowerCase())
                || c[_this.valueKey] == searchText;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudC50cyIsIm5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHVsIFxuICAgICAgKm5nSWY9XCJjaG9pY2VzPy5sZW5ndGggPiAwXCJcbiAgICAgICNkcm9wZG93bk1lbnVcbiAgICAgIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiXG4gICAgICBbc3R5bGUudG9wLnB4XT1cInBvc2l0aW9uPy50b3BcIlxuICAgICAgW3N0eWxlLmxlZnQucHhdPVwicG9zaXRpb24/LmxlZnRcIj5cbiAgICAgIDxsaVxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlIG9mIGNob2ljZXM7IHRyYWNrQnk6dHJhY2tCeUlkXCJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJhY3RpdmVDaG9pY2UgPT09IGNob2ljZVwiPlxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OjtcIlxuICAgICAgICAgIChjbGljayk9XCJzZWxlY3RDaG9pY2UubmV4dChjaG9pY2UpXCI+XG4gICAgICAgICAge3sgY2hvaWNlW2xhYmVsS2V5XSA/ICBjaG9pY2VbbGFiZWxLZXldIDogY2hvaWNlIH19XG4gICAgICAgIDwvYT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgbWF4LWhlaWdodDogMjAwcHg7XG4gICAgICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdkcm9wZG93bk1lbnUnKSBkcm9wZG93bk1lbnVFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxVTGlzdEVsZW1lbnQ+O1xuICBwb3NpdGlvbjogeyB0b3A6IG51bWJlcjsgbGVmdDogbnVtYmVyIH07XG4gIHNlbGVjdENob2ljZSA9IG5ldyBTdWJqZWN0KCk7XG4gIGFjdGl2ZUNob2ljZTogYW55O1xuICBzZWFyY2hUZXh0OiBzdHJpbmc7XG4gIGNob2ljZUxvYWRFcnJvcjogYW55O1xuICBjaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gIGxhYmVsS2V5ID0gJ25hbWUnO1xuICBwcml2YXRlIF9jaG9pY2VzOiBhbnlbXTtcbiAgdHJhY2tCeUlkID0gKGluZGV4OiBudW1iZXIsIGNob2ljZTogYW55KSA9PlxuICAgIHR5cGVvZiBjaG9pY2UuaWQgIT09ICd1bmRlZmluZWQnID8gY2hvaWNlLmlkIDogY2hvaWNlO1xuXG4gIHNldCBjaG9pY2VzKGNob2ljZXM6IGFueVtdKSB7XG4gICAgdGhpcy5fY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgaWYgKGNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPT09IC0xICYmIGNob2ljZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hY3RpdmVDaG9pY2UgPSBjaG9pY2VzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGdldCBjaG9pY2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9jaG9pY2VzO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd0Rvd24nLCBbJyRldmVudCddKVxuICBvbkFycm93RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCArIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5BcnJvd1VwJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd1VwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuY2hvaWNlcy5pbmRleE9mKHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICBpZiAodGhpcy5jaG9pY2VzW2luZGV4IC0gMV0pIHtcbiAgICAgIHRoaXMuc2Nyb2xsVG9DaG9pY2UoaW5kZXggLSAxKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duLkVudGVyJywgWyckZXZlbnQnXSlcbiAgb25FbnRlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmICh0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSkgPiAtMSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VsZWN0Q2hvaWNlLm5leHQodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2Nyb2xsVG9DaG9pY2UoaW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gdGhpcy5fY2hvaWNlc1tpbmRleF07XG4gICAgaWYgKHRoaXMuZHJvcGRvd25NZW51RWxlbWVudCkge1xuICAgICAgY29uc3QgdWxQb3NpdGlvbiA9IHRoaXMuZHJvcGRvd25NZW51RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbGkgPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG4gICAgICBjb25zdCBsaVBvc2l0aW9uID0gbGkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAobGlQb3NpdGlvbi50b3AgPCB1bFBvc2l0aW9uLnRvcCkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgfSBlbHNlIGlmIChsaVBvc2l0aW9uLmJvdHRvbSA+IHVsUG9zaXRpb24uYm90dG9tKSB7XG4gICAgICAgIGxpLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXIgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIEBJbnB1dCgpIHZhbHVlS2V5OiBzdHJpbmcgPSAnaWQnO1xuXG4gIEBJbnB1dCgpIGxhYmVsS2V5OiBzdHJpbmcgPSAnbmFtZSc7XG5cbiAgQElucHV0KCkgY2hvaWNlczogYW55W107XG5cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBmaW5kQ2hvaWNlcyhzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihjID0+XG4gICAgICBjW3RoaXMubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKVxuICAgICAgfHwgY1t0aGlzLnZhbHVlS2V5XSA9PSBzZWFyY2hUZXh0XG4gICAgKVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudC5rZXknXSlcbiAgb25LZXlwcmVzcyhrZXk6IHN0cmluZykge1xuICAgIGlmIChrZXkgPT09IHRoaXMudHJpZ2dlckNoYXJhY3Rlcikge1xuICAgICAgdGhpcy5zaG93TWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQudGFyZ2V0LnZhbHVlJ10pXG4gIG9uQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICBpZiAodmFsdWVbdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbl0gIT09IHRoaXMudHJpZ2dlckNoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBpZiAoY3Vyc29yIDwgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbikge1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXh0ID0gdmFsdWUuc2xpY2UoXG4gICAgICAgICAgICB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uICsgMSxcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFzZWFyY2hUZXh0Lm1hdGNoKHRoaXMuc2VhcmNoUmVnZXhwKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmxhYmVsS2V5ID0gdGhpcy5sYWJlbEtleTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmluZENob2ljZXMoc2VhcmNoVGV4dCkpXG4gICAgICAgICAgICAgIC50aGVuKGNob2ljZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUubGFzdENhcmV0UG9zaXRpb24gPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd01lbnUoKSB7XG4gICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgIGNvbnN0IG1lbnVGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8XG4gICAgICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgICAgID4odGhpcy5tZW51Q29tcG9uZW50KTtcbiAgICAgIHRoaXMubWVudSA9IHtcbiAgICAgICAgY29tcG9uZW50OiB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIG1lbnVGYWN0b3J5LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICApLFxuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgIH07XG4gICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gK2dldENvbXB1dGVkU3R5bGUoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnRcbiAgICAgICkubGluZUhlaWdodCEucmVwbGFjZSgvcHgkLywgJycpO1xuICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGdldENhcmV0Q29vcmRpbmF0ZXMoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IHRvcCArIGxpbmVIZWlnaHQsXG4gICAgICAgIGxlZnRcbiAgICAgIH07XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VsZWN0Q2hvaWNlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm1lbnVIaWRkZW4kKSlcbiAgICAgICAgLnN1YnNjcmliZShjaG9pY2UgPT4ge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRDaG9pY2VMYWJlbChjaG9pY2UpO1xuICAgICAgICAgIGNvbnN0IHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50ID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGV4dGFyZWEudmFsdWU7XG4gICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMubWVudSEudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdmFsdWUuc2xpY2UoMCwgc3RhcnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9XG4gICAgICAgICAgICB0aGlzLm1lbnUhLmxhc3RDYXJldFBvc2l0aW9uIHx8IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHZhbHVlLnNsaWNlKGNhcmV0UG9zaXRpb24pO1xuICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gc3RhcnQgKyBsYWJlbCArIGVuZDtcbiAgICAgICAgICAvLyBmb3JjZSBuZyBtb2RlbCAvIGZvcm0gY29udHJvbCB0byB1cGRhdGVcbiAgICAgICAgICB0ZXh0YXJlYS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIGNvbnN0IHNldEN1cnNvckF0ID0gKHN0YXJ0ICsgbGFiZWwpLmxlbmd0aDtcbiAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShzZXRDdXJzb3JBdCwgc2V0Q3Vyc29yQXQpO1xuICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5jaG9pY2VTZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICAgIGNob2ljZSxcbiAgICAgICAgICAgIGluc2VydGVkQXQ6IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIGVuZDogc3RhcnRJbmRleCArIGxhYmVsLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWVudVNob3duLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVNZW51KCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuJC5uZXh0KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ213bC10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1jb250YWluZXInLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgOmhvc3Qge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuICBgXG4gIF0sXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50IHt9XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICBdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZXhwb3J0czogW1xuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNb2R1bGUge31cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7OzRCQW9DaUIsSUFBSSxPQUFPLEVBQUU7NkJBSVosS0FBSzt3QkFDVixNQUFNO3lCQUVMLFVBQUMsS0FBYSxFQUFFLE1BQVc7WUFDckMsT0FBQSxPQUFPLE1BQU0sQ0FBQyxFQUFFLEtBQUssV0FBVyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTTtTQUFBOztJQUV2RCxzQkFBSSx1REFBTzs7OztRQU9YO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ3RCOzs7OztRQVRELFVBQVksT0FBYztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN4QixJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9B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