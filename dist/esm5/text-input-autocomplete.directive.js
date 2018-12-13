/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Directive, ElementRef, EventEmitter, HostListener, Injector, Input, Output, ViewContainerRef } from '@angular/core';
import getCaretCoordinates from 'textarea-caret';
import { takeUntil } from 'rxjs/operators';
import { TextInputAutocompleteMenuComponent } from './text-input-autocomplete-menu.component';
import { Subject } from 'rxjs';
/**
 * @record
 */
export function ChoiceSelectedEvent() { }
/** @type {?} */
ChoiceSelectedEvent.prototype.choice;
/** @type {?} */
ChoiceSelectedEvent.prototype.insertedAt;
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
export { TextInputAutocompleteDirective };
if (false) {
    /**
     * The character that will trigger the menu to appear
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.triggerCharacter;
    /**
     * The regular expression that will match the search text after the trigger character
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.searchRegexp;
    /**
     * The menu component to show with available options.
     * You can extend the built in `TextInputAutocompleteMenuComponent` component to use a custom template
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuComponent;
    /**
     * Called when the options menu is shown
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuShown;
    /**
     * Called when the options menu is hidden
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.menuHidden;
    /**
     * Called when a choice is selected
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.choiceSelected;
    /**
     * A function that formats the selected choice once selected.
     * @type {?}
     */
    TextInputAutocompleteDirective.prototype.getChoiceLabel;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.valueKey;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.labelKey;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.choices;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.menu;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.menuHidden$;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.componentFactoryResolver;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.viewContainerRef;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.injector;
    /** @type {?} */
    TextInputAutocompleteDirective.prototype.elm;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sbUJBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7SUFvRTdCLHdDQUNVLDBCQUNBLGtCQUNBLFVBQ0E7UUFIQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsYUFBUSxHQUFSLFFBQVE7UUFDUixRQUFHLEdBQUgsR0FBRzs7OztnQ0F0RGUsR0FBRzs7Ozs0QkFLUCxPQUFPOzs7Ozs2QkFNTixrQ0FBa0M7Ozs7eUJBS3JDLElBQUksWUFBWSxFQUFFOzs7OzBCQUtqQixJQUFJLFlBQVksRUFBRTs7Ozs4QkFLZCxJQUFJLFlBQVksRUFBdUI7Ozs7OEJBS2YsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEVBQU4sQ0FBTTs7d0JBR3ZDLElBQUk7d0JBRUosTUFBTTsyQkFZWixJQUFJLE9BQU8sRUFBRTtLQU8vQjs7Ozs7SUFFSixvREFBVzs7OztJQUFYLFVBQVksVUFBa0I7UUFBOUIsaUJBS0M7UUFKQyxPQUFPLElBQUksQ0FBQyxPQUFPLENB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LFFBQUE7b0JBQ04sVUFBVSxFQUFFO3dCQUNWLEtBQUssRUFBRSxVQUFVO3dCQUNqQixHQUFHLEVBQUUsVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNO3FCQUMvQjtpQkFDRixDQUFDLENBQUM7YUFDSixDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3ZCOzs7OztJQUdLLGlEQUFROzs7O1FBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3ZCOzs7OztJQUdILG9EQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNqQjs7Z0JBcE1GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQ04saUZBQWlGO2lCQUNwRjs7OztnQkE1QkMsd0JBQXdCO2dCQVV4QixnQkFBZ0I7Z0JBSmhCLFFBQVE7Z0JBSFIsVUFBVTs7O21DQThCVCxLQUFLOytCQUtMLEtBQUs7Z0NBTUwsS0FBSzs0QkFLTCxNQUFNOzZCQUtOLE1BQU07aUNBS04sTUFBTTtpQ0FLTixLQUFLOzJCQUdMLEtBQUs7MkJBRUwsS0FBSzswQkFFTCxLQUFLOzZCQTBCTCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDOzJCQU92QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7eUJBNEM3QyxZQUFZLFNBQUMsTUFBTTs7eUNBckp0Qjs7U0E4QmEsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDb250YWluZXJSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgZ2V0Q2FyZXRDb29yZGluYXRlcyBmcm9tICd0ZXh0YXJlYS1jYXJldCc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50IH0gZnJvbSAnLi90ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hvaWNlU2VsZWN0ZWRFdmVudCB7XG4gIGNob2ljZTogYW55O1xuICBpbnNlcnRlZEF0OiB7XG4gICAgc3RhcnQ6IG51bWJlcjtcbiAgICBlbmQ6IG51bWJlcjtcbiAgfTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICd0ZXh0YXJlYVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdLGlucHV0W3R5cGU9XCJ0ZXh0XCJdW213bFRleHRJbnB1dEF1dG9jb21wbGV0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFRleHRJbnB1dEF1dG9jb21wbGV0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgY2hhcmFjdGVyIHRoYXQgd2lsbCB0cmlnZ2VyIHRoZSBtZW51IHRvIGFwcGVhclxuICAgKi9cbiAgQElucHV0KCkgdHJpZ2dlckNoYXJhY3RlciA9ICdAJztcblxuICAvKipcbiAgICogVGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiB0aGF0IHdpbGwgbWF0Y2ggdGhlIHNlYXJjaCB0ZXh0IGFmdGVyIHRoZSB0cmlnZ2VyIGNoYXJhY3RlclxuICAgKi9cbiAgQElucHV0KCkgc2VhcmNoUmVnZXhwID0gL15cXHcqJC87XG5cbiAgLyoqXG4gICAqIFRoZSBtZW51IGNvbXBvbmVudCB0byBzaG93IHdpdGggYXZhaWxhYmxlIG9wdGlvbnMuXG4gICAqIFlvdSBjYW4gZXh0ZW5kIHRoZSBidWlsdCBpbiBgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudGAgY29tcG9uZW50IHRvIHVzZSBhIGN1c3RvbSB0ZW1wbGF0ZVxuICAgKi9cbiAgQElucHV0KCkgbWVudUNvbXBvbmVudCA9IFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQ7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgc2hvd25cbiAgICovXG4gIEBPdXRwdXQoKSBtZW51U2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBvcHRpb25zIG1lbnUgaXMgaGlkZGVuXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudUhpZGRlbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYSBjaG9pY2UgaXMgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKSBjaG9pY2VTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hvaWNlU2VsZWN0ZWRFdmVudD4oKTtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGZvcm1hdHMgdGhlIHNlbGVjdGVkIGNob2ljZSBvbmNlIHNlbGVjdGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0Q2hvaWNlTGFiZWw6IChjaG9pY2U6IGFueSkgPT4gc3RyaW5nID0gY2hvaWNlID0+IGNob2ljZTtcblxuICAvKiB0c2xpbnQ6ZGlzYWJsZSBtZW1iZXItb3JkZXJpbmcgKi9cbiAgQElucHV0KCkgdmFsdWVLZXk6IHN0cmluZyA9ICdpZCc7XG5cbiAgQElucHV0KCkgbGFiZWxLZXk6IHN0cmluZyA9ICduYW1lJztcblxuICBASW5wdXQoKSBjaG9pY2VzOiBhbnlbXTtcblxuICBwcml2YXRlIG1lbnU6XG4gICAgfCB7XG4gICAgICAgIGNvbXBvbmVudDogQ29tcG9uZW50UmVmPFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnQ+O1xuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IG51bWJlcjtcbiAgICAgICAgbGFzdENhcmV0UG9zaXRpb24/OiBudW1iZXI7XG4gICAgICB9XG4gICAgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBtZW51SGlkZGVuJCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBlbG06IEVsZW1lbnRSZWZcbiAgKSB7fVxuXG4gIGZpbmRDaG9pY2VzKHNlYXJjaFRleHQ6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKGMgPT5cbiAgICAgIGNbdGhpcy5sYWJlbEtleV0udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCkpXG4gICAgICB8fCBjW3RoaXMudmFsdWVLZXldID09IHNlYXJjaFRleHRcbiAgICApXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdrZXlwcmVzcycsIFsnJGV2ZW50LmtleSddKVxuICBvbktleXByZXNzKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtleSA9PT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyKSB7XG4gICAgICB0aGlzLnNob3dNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudC50YXJnZXQudmFsdWUnXSlcbiAgb25DaGFuZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIGlmICh2YWx1ZVt0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uXSAhPT0gdGhpcy50cmlnZ2VyQ2hhcmFjdGVyKSB7XG4gICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIGlmIChjdXJzb3IgPCB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uKSB7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNlYXJjaFRleHQgPSB2YWx1ZS5zbGljZShcbiAgICAgICAgICAgIHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24gKyAxLFxuICAgICAgICAgICAgY3Vyc29yXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoIXNlYXJjaFRleHQubWF0Y2godGhpcy5zZWFyY2hSZWdleHApKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VhcmNoVGV4dCA9IHNlYXJjaFRleHQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UubGFiZWxLZXkgPSB0aGlzLmxhYmVsS2V5O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5maW5kQ2hvaWNlcyhzZWFyY2hUZXh0KSlcbiAgICAgICAgICAgICAgLnRoZW4oY2hvaWNlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgb25CbHVyKCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5sYXN0Q2FyZXRQb3NpdGlvbiA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzaG93TWVudSgpIHtcbiAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgY29uc3QgbWVudUZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxcbiAgICAgICAgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudFxuICAgICAgPih0aGlzLm1lbnVDb21wb25lbnQpO1xuICAgICAgdGhpcy5tZW51ID0ge1xuICAgICAgICBjb21wb25lbnQ6IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoXG4gICAgICAgICAgbWVudUZhY3RvcnksXG4gICAgICAgICAgMCxcbiAgICAgICAgICB0aGlzLmluamVjdG9yXG4gICAgICAgICksXG4gICAgICAgIHRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjogdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGxpbmVIZWlnaHQgPSArZ2V0Q29tcHV0ZWRTdHlsZShcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudFxuICAgICAgKS5saW5lSGVpZ2h0IS5yZXBsYWNlKC9weCQvLCAnJyk7XG4gICAgICBjb25zdCB7IHRvcCwgbGVmdCB9ID0gZ2V0Q2FyZXRDb29yZGluYXRlcyhcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudCxcbiAgICAgICAgdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UucG9zaXRpb24gPSB7XG4gICAgICAgIHRvcDogdG9wICsgbGluZUhlaWdodCxcbiAgICAgICAgbGVmdFxuICAgICAgfTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWxlY3RDaG9pY2VcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMubWVudUhpZGRlbiQpKVxuICAgICAgICAuc3Vic2NyaWJlKGNob2ljZSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdldENob2ljZUxhYmVsKGNob2ljZSk7XG4gICAgICAgICAgY29uc3QgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgPSB0ZXh0YXJlYS52YWx1ZTtcbiAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5tZW51IS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb247XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPSB2YWx1ZS5zbGljZSgwLCBzdGFydEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID1cbiAgICAgICAgICAgIHRoaXMubWVudSEubGFzdENhcmV0UG9zaXRpb24gfHwgdGV4dGFyZWEuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgY29uc3QgZW5kID0gdmFsdWUuc2xpY2UoY2FyZXRQb3NpdGlvbik7XG4gICAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBzdGFydCArIGxhYmVsICsgZW5kO1xuICAgICAgICAgIC8vIGZvcmNlIG5nIG1vZGVsIC8gZm9ybSBjb250cm9sIHRvIHVwZGF0ZVxuICAgICAgICAgIHRleHRhcmVhLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdpbnB1dCcpKTtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgICAgY29uc3Qgc2V0Q3Vyc29yQXQgPSAoc3RhcnQgKyBsYWJlbCkubGVuZ3RoO1xuICAgICAgICAgIHRleHRhcmVhLnNldFNlbGVjdGlvblJhbmdlKHNldEN1cnNvckF0LCBzZXRDdXJzb3JBdCk7XG4gICAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgICB0aGlzLmNob2ljZVNlbGVjdGVkLmVtaXQoe1xuICAgICAgICAgICAgY2hvaWNlLFxuICAgICAgICAgICAgaW5zZXJ0ZWRBdDoge1xuICAgICAgICAgICAgICBzdGFydDogc3RhcnRJbmRleCxcbiAgICAgICAgICAgICAgZW5kOiBzdGFydEluZGV4ICsgbGFiZWwubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5tZW51U2hvd24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGlkZU1lbnUoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5kZXN0cm95KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4kLm5leHQoKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbi5lbWl0KCk7XG4gICAgICB0aGlzLm1lbnUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5oaWRlTWVudSgpO1xuICB9XG59XG4iXX0=