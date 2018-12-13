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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sbUJBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7Ozs7SUFvRTdCLHdDQUNVLDBCQUNBLGtCQUNBLFVBQ0E7UUFIQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0I7UUFDaEIsYUFBUSxHQUFSLFFBQVE7UUFDUixRQUFHLEdBQUgsR0FBRzs7OztnQ0F0RGUsR0FBRzs7Ozs0QkFLUCxPQUFPOzs7Ozs2QkFNTixrQ0FBa0M7Ozs7eUJBS3JDLElBQUksWUFBWSxFQUFFOzs7OzBCQUtqQixJQUFJLFlBQVksRUFBRTs7Ozs4QkFLZCxJQUFJLFlBQVksRUFBdUI7Ozs7OEJBS2YsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEVBQU4sQ0FBTTs7d0JBR3ZDLElBQUk7d0JBRUosTUFBTTsyQkFZWixJQUFJLE9BQU8sRUFBRTtLQU8vQjs7Ozs7SUFFSixvREFBVzs7OztJQUFYLFVBQVksVUFBa0I7UUFBOUIsaUJBR0M7UUFGQyxPQUFPLElBQUksQ0FBQyxPQUFPLENB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akIsR0FBRyxFQUFFLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTTtxQkFDL0I7aUJBQ0YsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2Qjs7Ozs7SUFHSyxpREFBUTs7OztRQUNkLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7SUFHSCxvREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDakI7O2dCQWxNRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUNOLGlGQUFpRjtpQkFDcEY7Ozs7Z0JBNUJDLHdCQUF3QjtnQkFVeEIsZ0JBQWdCO2dCQUpoQixRQUFRO2dCQUhSLFVBQVU7OzttQ0E4QlQsS0FBSzsrQkFLTCxLQUFLO2dDQU1MLEtBQUs7NEJBS0wsTUFBTTs2QkFLTixNQUFNO2lDQUtOLE1BQU07aUNBS04sS0FBSzsyQkFHTCxLQUFLOzJCQUVMLEtBQUs7MEJBRUwsS0FBSzs2QkF3QkwsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQzsyQkFPdkMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLHFCQUFxQixDQUFDO3lCQTRDN0MsWUFBWSxTQUFDLE1BQU07O3lDQW5KdEI7O1NBOEJhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXIgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIEBJbnB1dCgpIHZhbHVlS2V5OiBzdHJpbmcgPSAnaWQnO1xuXG4gIEBJbnB1dCgpIGxhYmVsS2V5OiBzdHJpbmcgPSAnbmFtZSc7XG5cbiAgQElucHV0KCkgY2hvaWNlczogYW55W107XG5cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBmaW5kQ2hvaWNlcyhzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihjID0+XG4gICAgICBjW3RoaXMubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKSlcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXByZXNzJywgWyckZXZlbnQua2V5J10pXG4gIG9uS2V5cHJlc3Moa2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoa2V5ID09PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgIHRoaXMuc2hvd01lbnUoKTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdpbnB1dCcsIFsnJGV2ZW50LnRhcmdldC52YWx1ZSddKVxuICBvbkNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgaWYgKHZhbHVlW3RoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb25dICE9PSB0aGlzLnRyaWdnZXJDaGFyYWN0ZXIpIHtcbiAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgaWYgKGN1cnNvciA8IHRoaXMubWVudS50cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb24pIHtcbiAgICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCA9IHZhbHVlLnNsaWNlKFxuICAgICAgICAgICAgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbiArIDEsXG4gICAgICAgICAgICBjdXJzb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmICghc2VhcmNoVGV4dC5tYXRjaCh0aGlzLnNlYXJjaFJlZ2V4cCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5zZWFyY2hUZXh0ID0gc2VhcmNoVGV4dDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5sYWJlbEtleSA9IHRoaXMubGFiZWxLZXk7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLmZpbmRDaG9pY2VzKHNlYXJjaFRleHQpKVxuICAgICAgICAgICAgICAudGhlbihjaG9pY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkRXJyb3IgPSBlcnI7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgdGhpcy5tZW51Lmxhc3RDYXJldFBvc2l0aW9uID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNob3dNZW51KCkge1xuICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICBjb25zdCBtZW51RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5PFxuICAgICAgICBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50XG4gICAgICA+KHRoaXMubWVudUNvbXBvbmVudCk7XG4gICAgICB0aGlzLm1lbnUgPSB7XG4gICAgICAgIGNvbXBvbmVudDogdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgICAgICBtZW51RmFjdG9yeSxcbiAgICAgICAgICAwLFxuICAgICAgICAgIHRoaXMuaW5qZWN0b3JcbiAgICAgICAgKSxcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICB9O1xuICAgICAgY29uc3QgbGluZUhlaWdodCA9ICtnZXRDb21wdXRlZFN0eWxlKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50XG4gICAgICApLmxpbmVIZWlnaHQhLnJlcGxhY2UoL3B4JC8sICcnKTtcbiAgICAgIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBnZXRDYXJldENvb3JkaW5hdGVzKFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LFxuICAgICAgICB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICApO1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5wb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiB0b3AgKyBsaW5lSGVpZ2h0LFxuICAgICAgICBsZWZ0XG4gICAgICB9O1xuICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlbGVjdENob2ljZVxuICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5tZW51SGlkZGVuJCkpXG4gICAgICAgIC5zdWJzY3JpYmUoY2hvaWNlID0+IHtcbiAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2V0Q2hvaWNlTGFiZWwoY2hvaWNlKTtcbiAgICAgICAgICBjb25zdCB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyA9IHRleHRhcmVhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLm1lbnUhLnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbjtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHZhbHVlLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuICAgICAgICAgIGNvbnN0IGNhcmV0UG9zaXRpb24gPVxuICAgICAgICAgICAgdGhpcy5tZW51IS5sYXN0Q2FyZXRQb3NpdGlvbiB8fCB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICBjb25zdCBlbmQgPSB2YWx1ZS5zbGljZShjYXJldFBvc2l0aW9uKTtcbiAgICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IHN0YXJ0ICsgbGFiZWwgKyBlbmQ7XG4gICAgICAgICAgLy8gZm9yY2UgbmcgbW9kZWwgLyBmb3JtIGNvbnRyb2wgdG8gdXBkYXRlXG4gICAgICAgICAgdGV4dGFyZWEuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2lucHV0JykpO1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgICBjb25zdCBzZXRDdXJzb3JBdCA9IChzdGFydCArIGxhYmVsKS5sZW5ndGg7XG4gICAgICAgICAgdGV4dGFyZWEuc2V0U2VsZWN0aW9uUmFuZ2Uoc2V0Q3Vyc29yQXQsIHNldEN1cnNvckF0KTtcbiAgICAgICAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICAgICAgICAgIHRoaXMuY2hvaWNlU2VsZWN0ZWQuZW1pdCh7XG4gICAgICAgICAgICBjaG9pY2UsXG4gICAgICAgICAgICBpbnNlcnRlZEF0OiB7XG4gICAgICAgICAgICAgIHN0YXJ0OiBzdGFydEluZGV4LFxuICAgICAgICAgICAgICBlbmQ6IHN0YXJ0SW5kZXggKyBsYWJlbC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLm1lbnVTaG93bi5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoaWRlTWVudSgpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmRlc3Ryb3koKTtcbiAgICAgIHRoaXMubWVudUhpZGRlbiQubmV4dCgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuLmVtaXQoKTtcbiAgICAgIHRoaXMubWVudSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmhpZGVNZW51KCk7XG4gIH1cbn1cbiJdfQ==