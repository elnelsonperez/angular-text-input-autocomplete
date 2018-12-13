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
                    return c[_this.labelKey].toLowerCase().includes(searchText.toLowerCase());
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLnRzIiwibmc6Ly9hbmd1bGFyLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItdGV4dC1pbnB1dC1hdXRvY29tcGxldGUvdGV4dC1pbnB1dC1hdXRvY29tcGxldGUubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx1bCBcbiAgICAgICpuZ0lmPVwiY2hvaWNlcz8ubGVuZ3RoID4gMFwiXG4gICAgICAjZHJvcGRvd25NZW51XG4gICAgICBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIlxuICAgICAgW3N0eWxlLnRvcC5weF09XCJwb3NpdGlvbj8udG9wXCJcbiAgICAgIFtzdHlsZS5sZWZ0LnB4XT1cInBvc2l0aW9uPy5sZWZ0XCI+XG4gICAgICA8bGlcbiAgICAgICAgKm5nRm9yPVwibGV0IGNob2ljZSBvZiBjaG9pY2VzOyB0cmFja0J5OnRyYWNrQnlJZFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlQ2hvaWNlID09PSBjaG9pY2VcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiamF2YXNjcmlwdDo7XCJcbiAgICAgICAgICAoY2xpY2spPVwic2VsZWN0Q2hvaWNlLm5leHQoY2hvaWNlKVwiPlxuICAgICAgICAgIHt7IGNob2ljZVtsYWJlbEtleV0gPyAgY2hvaWNlW2xhYmVsS2V5XSA6IGNob2ljZSB9fVxuICAgICAgICA8L2E+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIG1heC1oZWlnaHQ6IDIwMHB4O1xuICAgICAgICBvdmVyZmxvdy15OiBhdXRvO1xuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IHtcbiAgQFZpZXdDaGlsZCgnZHJvcGRvd25NZW51JykgZHJvcGRvd25NZW51RWxlbWVudDogRWxlbWVudFJlZjxIVE1MVUxpc3RFbGVtZW50PjtcbiAgcG9zaXRpb246IHsgdG9wOiBudW1iZXI7IGxlZnQ6IG51bWJlciB9O1xuICBzZWxlY3RDaG9pY2UgPSBuZXcgU3ViamVjdCgpO1xuICBhY3RpdmVDaG9pY2U6IGFueTtcbiAgc2VhcmNoVGV4dDogc3RyaW5nO1xuICBjaG9pY2VMb2FkRXJyb3I6IGFueTtcbiAgY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICBsYWJlbEtleSA9ICduYW1lJztcbiAgcHJpdmF0ZSBfY2hvaWNlczogYW55W107XG4gIHRyYWNrQnlJZCA9IChpbmRleDogbnVtYmVyLCBjaG9pY2U6IGFueSkgPT5cbiAgICB0eXBlb2YgY2hvaWNlLmlkICE9PSAndW5kZWZpbmVkJyA/IGNob2ljZS5pZCA6IGNob2ljZTtcblxuICBzZXQgY2hvaWNlcyhjaG9pY2VzOiBhbnlbXSkge1xuICAgIHRoaXMuX2Nob2ljZXMgPSBjaG9pY2VzO1xuICAgIGlmIChjaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID09PSAtMSAmJiBjaG9pY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuYWN0aXZlQ2hvaWNlID0gY2hvaWNlc1swXTtcbiAgICB9XG4gIH1cblxuICBnZXQgY2hvaWNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlcztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcbiAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpO1xuICAgIGlmICh0aGlzLmNob2ljZXNbaW5kZXggKyAxXSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0Nob2ljZShpbmRleCArIDEpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXG4gIG9uQXJyb3dVcChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmNob2ljZXMuaW5kZXhPZih0aGlzLmFjdGl2ZUNob2ljZSk7XG4gICAgaWYgKHRoaXMuY2hvaWNlc1tpbmRleCAtIDFdKSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQ2hvaWNlKGluZGV4IC0gMSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5FbnRlcicsIFsnJGV2ZW50J10pXG4gIG9uRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jaG9pY2VzLmluZGV4T2YodGhpcy5hY3RpdmVDaG9pY2UpID4gLTEpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNlbGVjdENob2ljZS5uZXh0KHRoaXMuYWN0aXZlQ2hvaWNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQ2hvaWNlKGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZUNob2ljZSA9IHRoaXMuX2Nob2ljZXNbaW5kZXhdO1xuICAgIGlmICh0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHVsUG9zaXRpb24gPSB0aGlzLmRyb3Bkb3duTWVudUVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IGxpID0gdGhpcy5kcm9wZG93bk1lbnVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5baW5kZXhdO1xuICAgICAgY29uc3QgbGlQb3NpdGlvbiA9IGxpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKGxpUG9zaXRpb24udG9wIDwgdWxQb3NpdGlvbi50b3ApIHtcbiAgICAgICAgbGkuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgIH0gZWxzZSBpZiAobGlQb3NpdGlvbi5ib3R0b20gPiB1bFBvc2l0aW9uLmJvdHRvbSkge1xuICAgICAgICBsaS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQge1xuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgVmlld0NvbnRhaW5lclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCBnZXRDYXJldENvb3JkaW5hdGVzIGZyb20gJ3RleHRhcmVhLWNhcmV0JztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDaG9pY2VTZWxlY3RlZEV2ZW50IHtcbiAgY2hvaWNlOiBhbnk7XG4gIGluc2VydGVkQXQ6IHtcbiAgICBzdGFydDogbnVtYmVyO1xuICAgIGVuZDogbnVtYmVyO1xuICB9O1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6XG4gICAgJ3RleHRhcmVhW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0saW5wdXRbdHlwZT1cInRleHRcIl1bbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFRoZSBjaGFyYWN0ZXIgdGhhdCB3aWxsIHRyaWdnZXIgdGhlIG1lbnUgdG8gYXBwZWFyXG4gICAqL1xuICBASW5wdXQoKSB0cmlnZ2VyQ2hhcmFjdGVyID0gJ0AnO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVndWxhciBleHByZXNzaW9uIHRoYXQgd2lsbCBtYXRjaCB0aGUgc2VhcmNoIHRleHQgYWZ0ZXIgdGhlIHRyaWdnZXIgY2hhcmFjdGVyXG4gICAqL1xuICBASW5wdXQoKSBzZWFyY2hSZWdleHAgPSAvXlxcdyokLztcblxuICAvKipcbiAgICogVGhlIG1lbnUgY29tcG9uZW50IHRvIHNob3cgd2l0aCBhdmFpbGFibGUgb3B0aW9ucy5cbiAgICogWW91IGNhbiBleHRlbmQgdGhlIGJ1aWx0IGluIGBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50YCBjb21wb25lbnQgdG8gdXNlIGEgY3VzdG9tIHRlbXBsYXRlXG4gICAqL1xuICBASW5wdXQoKSBtZW51Q29tcG9uZW50ID0gVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudDtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBzaG93blxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVTaG93biA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIG9wdGlvbnMgbWVudSBpcyBoaWRkZW5cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51SGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhIGNob2ljZSBpcyBzZWxlY3RlZFxuICAgKi9cbiAgQE91dHB1dCgpIGNob2ljZVNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxDaG9pY2VTZWxlY3RlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgZm9ybWF0cyB0aGUgc2VsZWN0ZWQgY2hvaWNlIG9uY2Ugc2VsZWN0ZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXRDaG9pY2VMYWJlbDogKGNob2ljZTogYW55KSA9PiBzdHJpbmcgPSBjaG9pY2UgPT4gY2hvaWNlO1xuXG4gIC8qIHRzbGludDpkaXNhYmxlIG1lbWJlci1vcmRlcmluZyAqL1xuICBASW5wdXQoKSB2YWx1ZUtleTogc3RyaW5nID0gJ2lkJztcblxuICBASW5wdXQoKSBsYWJlbEtleTogc3RyaW5nID0gJ25hbWUnO1xuXG4gIEBJbnB1dCgpIGNob2ljZXM6IGFueVtdO1xuXG4gIHByaXZhdGUgbWVudTpcbiAgICB8IHtcbiAgICAgICAgY29tcG9uZW50OiBDb21wb25lbnRSZWY8VGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudD47XG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogbnVtYmVyO1xuICAgICAgICBsYXN0Q2FyZXRQb3NpdGlvbj86IG51bWJlcjtcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIG1lbnVIaWRkZW4kID0gbmV3IFN1YmplY3QoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIGVsbTogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgZmluZENob2ljZXMoc2VhcmNoVGV4dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIoYyA9PlxuICAgICAgY1t0aGlzLmxhYmVsS2V5XS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQudG9Mb3dlckNhc2UoKSkpXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50LmtleSddKVxuICBvbktleXByZXNzKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtleSA9PT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyKSB7XG4gICAgICB0aGlzLnNob3dNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudC50YXJnZXQudmFsdWUnXSlcbiAgb25DaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIGlmICh2YWx1ZVt0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uXSAhPT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGlmIChjdXJzb3IgPCB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uKSB7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNlYXJjaFRleHQgPSB2YWx1ZS5zbGljZShcbiAgICAgICAgICAgIHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24gKyAxLFxuICAgICAgICAgICAgY3Vyc29yXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIXNlYXJjaFRleHQubWF0Y2godGhpcy5zZWFyY2hSZWdleHApKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UubGFiZWxLZXkgPSB0aGlzLmxhYmVsS2V5O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5maW5kQ2hvaWNlcyhzZWFyY2hUZXh0KSlcbiAgICAgICAgICAgICAgLnRoZW4oY2hvaWNlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5sYXN0Q2FyZXRQb3NpdGlvbiA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93TWVudSgpIHtcbiAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgY29uc3QgbWVudUZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxcbiAgICAgICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICAgICAgPih0aGlzLm1lbnVDb21wb25lbnQpO1xuICAgICAgdGhpcy5tZW51ID0ge1xuICAgICAgICBjb21wb25lbnQ6IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgbWVudUZhY3RvcnksXG4gICAgICAgICAgMCxcbiAgICAgICAgICB0aGlzLmluamVjdG9yXG4gICAgICAgICksXG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSArZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudFxuICAgICAgKS5saW5lSGVpZ2h0IS5yZXBsYWNlKC9weCQvLCAnJyk7XG4gICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZ2V0Q2FyZXRDb29yZGluYXRlcyhcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UucG9zaXRpb24gPSB7XG4gICAgICAgIHRvcDogdG9wICsgbGluZUhlaWdodCxcbiAgICAgICAgbGVmdFxuICAgICAgfTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWxlY3RDaG9pY2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubWVudUhpZGRlbiQpKVxuICAgICAgICAuc3Vic2NyaWJlKGNob2ljZSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldENob2ljZUxhYmVsKGNob2ljZSk7XG4gICAgICAgICAgY29uc3QgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5tZW51IS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb247XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSB2YWx1ZS5zbGljZSgwLCBzdGFydEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID1cbiAgICAgICAgICAgIHRoaXMubWVudSEubGFzdENhcmV0UG9zaXRpb24gfHwgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgY29uc3QgZW5kID0gdmFsdWUuc2xpY2UoY2FyZXRQb3NpdGlvbik7XG4gICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBzdGFydCArIGxhYmVsICsgZW5kO1xuICAgICAgICAgIC8vIGZvcmNlIG5nIG1vZGVsIC8gZm9ybSBjb250cm9sIHRvIHVwZGF0ZVxuICAgICAgICAgIHRleHRhcmVhLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgY29uc3Qgc2V0Q3Vyc29yQXQgPSAoc3RhcnQgKyBsYWJlbCkubGVuZ3RoO1xuICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHNldEN1cnNvckF0LCBzZXRDdXJzb3JBdCk7XG4gICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNob2ljZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgY2hvaWNlLFxuICAgICAgICAgICAgaW5zZXJ0ZWRBdDoge1xuICAgICAgICAgICAgICBzdGFydDogc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgZW5kOiBzdGFydEluZGV4ICsgbGFiZWwubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tZW51U2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZU1lbnUoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4kLm5leHQoKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlTWVudSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXdsLXRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLWNvbnRhaW5lcicsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICA6aG9zdCB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICB9XG4gIGBcbiAgXSxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVDb250YWluZXJDb21wb25lbnQge31cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlIH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQgfSBmcm9tICcuL3RleHQtaW5wdXQtYXV0b2NvbXBsZXRlLW1lbnUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlLFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gIF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBleHBvcnRzOiBbXG4gICAgVGV4dElucHV0QXV0b2NvbXBsZXRlRGlyZWN0aXZlLFxuICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZUNvbnRhaW5lckNvbXBvbmVudCxcbiAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1RleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1vZHVsZSB7fVxuIl0sIm5hbWVzIjpbIlN1YmplY3QiLCJDb21wb25lbnQiLCJWaWV3Q2hpbGQiLCJIb3N0TGlzdGVuZXIiLCJFdmVudEVtaXR0ZXIiLCJ0YWtlVW50aWwiLCJEaXJlY3RpdmUiLCJDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIiLCJWaWV3Q29udGFpbmVyUmVmIiwiSW5qZWN0b3IiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7O2dDQW9DaUIsSUFBSUEsWUFBTyxFQUFFO2lDQUlaLEtBQUs7NEJBQ1YsTUFBTTs2QkFFTCxVQUFDLEtBQWEsRUFBRSxNQUFXO2dCQUNyQyxPQUFBLE9BQU8sTUFBTSxDQUFDLEVBQUUsS0FBSyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxNQUFNO2FBQUE7O1FBRXZELHNCQUFJLHVEQUFPOzs7Z0JBT1g7Z0JB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