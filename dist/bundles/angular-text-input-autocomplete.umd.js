(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('textarea-caret'), require('rxjs/operators'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-text-input-autocomplete', ['exports', '@angular/core', 'rxjs', 'textarea-caret', 'rxjs/operators', '@angular/common'], factory) :
    (factory((global['angular-text-input-autocomplete'] = {}),global.ng.core,global.rxjs,global.getCaretCoordinates,global.rxjs.operators,global.ng.common));
}(this, (function (exports,core,rxjs,getCaretCoordinates,operators,common) { 'use strict';

    getCaretCoordinates = getCaretCoordinates && getCaretCoordinates.hasOwnProperty('default') ? getCaretCoordinates['default'] : getCaretCoordinates;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TextInputAutocompleteMenuComponent = /** @class */ (function () {
        function TextInputAutocompleteMenuComponent() {
            this.selectChoice = new rxjs.Subject();
            this.choiceLoading = false;
            this.labelKey = 'name';
            this.trackById = function (index, choice) {
                return typeof choice.id !== 'undefined' ? choice.id : choice;
            };
        }
        Object.defineProperty(TextInputAutocompleteMenuComponent.prototype, "choices", {
            get: /**
             * @return {?}
             */ function () {
                return this._choices;
            },
            set: /**
             * @param {?} choices
             * @return {?}
             */ function (choices) {
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
            { type: core.Component, args: [{
                        selector: 'mwl-text-input-autocomplete-menu',
                        template: "\n    <ul \n      *ngIf=\"choices?.length > 0\"\n      #dropdownMenu\n      class=\"dropdown-menu\"\n      [style.top.px]=\"position?.top\"\n      [style.left.px]=\"position?.left\">\n      <li\n        *ngFor=\"let choice of choices; trackBy:trackById\"\n        [class.active]=\"activeChoice === choice\">\n        <a\n          href=\"javascript:;\"\n          (click)=\"selectChoice.next(choice)\">\n          {{ choice[labelKey] ?  choice[labelKey] : choice }}\n        </a>\n      </li>\n    </ul>\n  ",
                        styles: [
                            "\n      .dropdown-menu {\n        display: block;\n        max-height: 200px;\n        overflow-y: auto;\n      }\n    "
                        ]
                    },] },
        ];
        TextInputAutocompleteMenuComponent.propDecorators = {
            dropdownMenuElement: [{ type: core.ViewChild, args: ['dropdownMenu',] }],
            onArrowDown: [{ type: core.HostListener, args: ['document:keydown.ArrowDown', ['$event'],] }],
            onArrowUp: [{ type: core.HostListener, args: ['document:keydown.ArrowUp', ['$event'],] }],
            onEnter: [{ type: core.HostListener, args: ['document:keydown.Enter', ['$event'],] }]
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
            this.menuShown = new core.EventEmitter();
            /**
             * Called when the options menu is hidden
             */
            this.menuHidden = new core.EventEmitter();
            /**
             * Called when a choice is selected
             */
            this.choiceSelected = new core.EventEmitter();
            /**
             * A function that formats the selected choice once selected.
             */
            this.getChoiceLabel = function (choice) { return choice; };
            /* tslint:disable member-ordering */
            this.valueKey = 'id';
            this.labelKey = 'name';
            this.menuHidden$ = new rxjs.Subject();
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
                    var lineHeight = +((getComputedStyle(this.elm.nativeElement).lineHeight)).replace(/px$/, '');
                    var _a = getCaretCoordinates(this.elm.nativeElement, this.elm.nativeElement.selectionStart), top_1 = _a.top, left = _a.left;
                    this.menu.component.instance.position = {
                        top: top_1 + lineHeight,
                        left: left
                    };
                    this.menu.component.changeDetectorRef.detectChanges();
                    this.menu.component.instance.selectChoice
                        .pipe(operators.takeUntil(this.menuHidden$))
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
            { type: core.Directive, args: [{
                        selector: 'textarea[mwlTextInputAutocomplete],input[type="text"][mwlTextInputAutocomplete]'
                    },] },
        ];
        /** @nocollapse */
        TextInputAutocompleteDirective.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ViewContainerRef },
                { type: core.Injector },
                { type: core.ElementRef }
            ];
        };
        TextInputAutocompleteDirective.propDecorators = {
            triggerCharacter: [{ type: core.Input }],
            searchRegexp: [{ type: core.Input }],
            menuComponent: [{ type: core.Input }],
            menuShown: [{ type: core.Output }],
            menuHidden: [{ type: core.Output }],
            choiceSelected: [{ type: core.Output }],
            getChoiceLabel: [{ type: core.Input }],
            valueKey: [{ type: core.Input }],
            labelKey: [{ type: core.Input }],
            choices: [{ type: core.Input }],
            onKeypress: [{ type: core.HostListener, args: ['keypress', ['$event.key'],] }],
            onChange: [{ type: core.HostListener, args: ['input', ['$event.target.value'],] }],
            onBlur: [{ type: core.HostListener, args: ['blur',] }]
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
            { type: core.Component, args: [{
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
            { type: core.NgModule, args: [{
                        declarations: [
                            TextInputAutocompleteDirective,
                            TextInputAutocompleteContainerComponent,
                            TextInputAutocompleteMenuComponent
                        ],
                        imports: [common.CommonModule],
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

    exports.TextInputAutocompleteMenuComponent = TextInputAutocompleteMenuComponent;
    exports.TextInputAutocompleteModule = TextInputAutocompleteModule;
    exports.ɵb = TextInputAutocompleteContainerComponent;
    exports.ɵa = TextInputAutocompleteDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bCBcbiAgICAgICpuZ0lmPVwiY2hvaWNlcz8ubGVuZ3RoID4gMFwiXG4gICAgICAjZHJvcGRvd25NZW51XG4gICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIlxuICAgICAgW3N0eWxlLnRvcC5weF09XCJwb3NpdGlvbj8udG9wXCJcbiAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInBvc2l0aW9uPy5sZWZ0XCI+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBjaG9pY2VzOyB0cmFja0J5OnRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlQ2hvaWNlID09PSBjaG9pY2VcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2hvaWNlLm5leHQoY2hvaWNlKVwiPlxuICAgICAgICAgIHt7IGNob2ljZVtsYWJlbEtleV0gPyAgY2hvaWNlW2xhYmVsS2V5XSA6IGNob2ljZSB9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25NZW51JykgZHJvcGRvd25NZW51RWxlbWVudDogRWxlbWVudFJlZjxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcG9zaXRpb246IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9O1xuICBzZWxlY3RDaG9pY2UgPSBuZXcgU3ViamVjdCgpO1xuICBhY3RpdmVDaG9pY2U6IGFueTtcbiAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICBjaG9pY2VMb2FkRXJyb3I6IGFueTtcbiAgY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICBsYWJlbEtleSA9ICduYW1lJztcbiAgcHJpdmF0ZSBfY2hvaWNlczogYW55W107XG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCBjaG9pY2U6IGFueSkgPT5cbiAgICB0eXBlb2YgY2hvaWNlLmlkICE9PSAndW5kZWZpbmVkJyA/IGNob2ljZS5pZCA6IGNob2ljZTtcblxuICBzZXQgY2hvaWNlcyhjaG9pY2VzOiBhbnlbXSkge1xuICAgIHRoaXMuX2Nob2ljZXMgPSBjaG9pY2VzO1xuICAgIGlmIChjaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID09PSAtMSAmJiBjaG9pY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gY2hvaWNlc1swXTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hvaWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlcztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggKyAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCAtIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5FbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID4gLTEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdENob2ljZS5uZXh0KHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQ2hvaWNlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IHRoaXMuX2Nob2ljZXNbaW5kZXhdO1xuICAgIGlmICh0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHVsUG9zaXRpb24gPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxpID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY29uc3QgbGlQb3NpdGlvbiA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKGxpUG9zaXRpb24udG9wIDwgdWxQb3NpdGlvbi50b3ApIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH0gZWxzZSBpZiAobGlQb3NpdGlvbi5ib3R0b20gPiB1bFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBnZXRDYXJldENvb3JkaW5hdGVzIGZyb20gJ3RleHRhcmVhLWNhcmV0JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDaG9pY2VTZWxlY3RlZEV2ZW50IHtcbiAgY2hvaWNlOiBhbnk7XG4gIGluc2VydGVkQXQ6IHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICB9O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgJ3RleHRhcmVhW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0saW5wdXRbdHlwZT1cInRleHRcIl1bbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjaGFyYWN0ZXIgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIG1lbnUgdG8gYXBwZWFyXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2VyQ2hhcmFjdGVyID0gJ0AnO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHRoYXQgd2lsbCBtYXRjaCB0aGUgc2VhcmNoIHRleHQgYWZ0ZXIgdGhlIHRyaWdnZXIgY2hhcmFjdGVyXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hSZWdleHAgPSAvXlxcdyokLztcblxuICAvKipcbiAgICogVGhlIG1lbnUgY29tcG9uZW50IHRvIHNob3cgd2l0aCBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICogWW91IGNhbiBleHRlbmQgdGhlIGJ1aWx0IGluIGBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50YCBjb21wb25lbnQgdG8gdXNlIGEgY3VzdG9tIHRlbXBsYXRlXG4gICAqL1xuICBASW5wdXQoKSBtZW51Q29tcG9uZW50ID0gVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudDtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVTaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51SGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGNob2ljZSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpIGNob2ljZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxDaG9pY2VTZWxlY3RlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgZm9ybWF0cyB0aGUgc2VsZWN0ZWQgY2hvaWNlIG9uY2Ugc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXRDaG9pY2VMYWJlbDogKGNob2ljZTogYW55KSA9PiBzdHJpbmcgPSBjaG9pY2UgPT4gY2hvaWNlO1xuXG4gIC8qIHRzbGludDpkaXNhYmxlIG1lbWJlci1vcmRlcmluZyAqL1xuICBASW5wdXQoKSB2YWx1ZUtleTogc3RyaW5nID0gJ2lkJztcblxuICBASW5wdXQoKSBsYWJlbEtleTogc3RyaW5nID0gJ25hbWUnO1xuXG4gIEBJbnB1dCgpIGNob2ljZXM6IGFueVtdO1xuXG4gIHByaXZhdGUgbWVudTpcbiAgICB8IHtcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8VGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudD47XG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsYXN0Q2FyZXRQb3NpdGlvbj86IG51bWJlcjtcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIG1lbnVIaWRkZW4kID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgZmluZENob2ljZXMoc2VhcmNoVGV4dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIoYyA9PlxuICAgICAgY1t0aGlzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSlcbiAgICAgIHx8IGNbdGhpcy52YWx1ZUtleV0gPT0gc2VhcmNoVGV4dFxuICAgIClcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQua2V5J10pXG4gIG9uS2V5cHJlc3Moa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArIDEsXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5sYWJlbEtleSA9IHRoaXMubGFiZWxLZXk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNZW51KCkge1xuICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICBjb25zdCBtZW51RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFxuICAgICAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gICAgICA+KHRoaXMubWVudUNvbXBvbmVudCk7XG4gICAgICB0aGlzLm1lbnUgPSB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBtZW51RmFjdG9yeSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICB9O1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9ICtnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50XG4gICAgICApLmxpbmVIZWlnaHQhLnJlcGxhY2UoL3B4JC8sICcnKTtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiB0b3AgKyBsaW5lSGVpZ2h0LFxuICAgICAgICBsZWZ0XG4gICAgICB9O1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtd2wtdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtY29udGFpbmVyJyxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgIDpob3N0IHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cbiAgYFxuICBdLFxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCB7fVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGV4cG9ydHM6IFtcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUsXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50LFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlTW9kdWxlIHt9XG4iXSwibmFtZXMiOlsiU3ViamVjdCIsIkNvbXBvbmVudCIsIlZpZXdDaGlsZCIsIkhvc3RMaXN0ZW5lciIsIkV2ZW50RW1pdHRlciIsInRha2VVbnRpbCIsIkRpcmVjdGl2ZSIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIlZpZXdDb250YWluZXJSZWYiLCJJbmplY3RvciIsIkVsZW1lbnRSZWYiLCJJbnB1dCIsIk91dHB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Z0NBb0NpQixJQUFJQSxZQUFPLEVBQUU7aUNBSVosS0FBSzs0QkFDVixNQUFNOzZCQUVMLFVBQUMsS0FBYSxFQUFFLE1BQVc7Z0JBQ3JDLE9BQUEsT0FBTyxNQUFNLENBQUMsRUFBRSxLQUFLLFdBQVcsR0FBRyxNQUFNLENBQUMsRUFB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