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
export class TextInputAutocompleteDirective {
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
        return this.choices.filter(c => c[this.labelKey].toLowerCase().includes(searchText.toLowerCase())
            || c[this.valueKey] == searchText);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1pbnB1dC1hdXRvY29tcGxldGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci10ZXh0LWlucHV0LWF1dG9jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInRleHQtaW5wdXQtYXV0b2NvbXBsZXRlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUV4QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osUUFBUSxFQUNSLEtBQUssRUFFTCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sbUJBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7OztBQWMvQixNQUFNOzs7Ozs7O0lBc0RKLFlBQ1UsMEJBQ0Esa0JBQ0EsVUFDQTtRQUhBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIscUJBQWdCLEdBQWhCLGdCQUFnQjtRQUNoQixhQUFRLEdBQVIsUUFBUTtRQUNSLFFBQUcsR0FBSCxHQUFHOzs7O2dDQXREZSxHQUFHOzs7OzRCQUtQLE9BQU87Ozs7OzZCQU1OLGtDQUFrQzs7Ozt5QkFLckMsSUFBSSxZQUFZLEVBQUU7Ozs7MEJBS2pCLElBQUksWUFBWSxFQUFFOzs7OzhCQUtkLElBQUksWUFBWSxFQUF1Qjs7Ozs4QkFLZixNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU07O3dCQUd2QyxJQUFJO3dCQUVKLE1BQU07MkJBWVosSUFBSSxPQUFPLEVBQUU7S0FPL0I7Ozs7O0lBRUosV0FBVyxDQUFDLFVBQWtCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO2VBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksVUFBVSxDQUNsQyxDQUFBO0tBQ0Y7Ozs7O0lBR0QsVUFBVSxDQUFDLEdBQVc7UUFDcEIsSUFBSSxHQUFHLEtBQUssSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNqQjtLQUNGOzs7OztJQUdELFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3ZFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTs7Z0JBQ0wsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO2dCQUNyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO29CQUMvQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pCO3FCQUFNOztvQkFDTCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsRUFDdEMsTUFBTSxDQUNQLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO3dCQUN4QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7cUJBQ2pCO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQzt3QkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7d0JBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7NkJBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs0QkFDZCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0NBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7Z0NBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dDQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs2QkFDdkQ7eUJBQ0YsQ0FBQzs2QkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dDQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dDQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztnQ0FDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7NkJBQ3ZEO3lCQUNGLENBQUMsQ0FBQztxQkFDTjtpQkFDRjthQUNGO1NBQ0Y7S0FDRjs7OztJQUdELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztTQUNyRTtLQUNGOzs7O0lBRU8sUUFBUTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOztZQUNkLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FFdkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsU0FBUyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQzlDLFdBQVcsRUFDWCxDQUFDLEVBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FDZDtnQkFDRCx3QkFBd0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjO2FBQ2hFLENBQUM7O1lBQ0YsTUFBTSxVQUFVLEdBQUcsb0JBQUMsZ0JBQWdCLENBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUN2QixDQUFDLFVBQVUsR0FBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsbUJBQW1CLENBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQ3RDLENBQUM7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHO2dCQUN0QyxHQUFHLEVBQUUsR0FBRyxHQUFHLFVBQVU7Z0JBQ3JCLElBQUk7YUFDTCxDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVk7aUJBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNqQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztnQkFDMUMsTUFBTSxRQUFRLEdBQXdCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDOztnQkFDN0QsTUFBTSxLQUFLLEdBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3JDLE1BQU0sVUFBVSxzQkFBRyxJQUFJLENBQUMsSUFBSSxHQUFFLHdCQUF3QixDQUFDOztnQkFDdkQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7O2dCQUN6QyxNQUFNLGFBQWEsc0JBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUUsaUJBQWlCLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQzs7Z0JBQzFELE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3ZDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7O2dCQUVyQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7Z0JBQ2hCLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDM0MsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDckQsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztvQkFDdkIsTUFBTTtvQkFDTixVQUFVLEVBQUU7d0JBQ1YsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLEdBQUcsRUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU07cUJBQy9CO2lCQUNGLENBQUMsQ0FBQzthQUNKLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdkI7Ozs7O0lBR0ssUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUN2Qjs7Ozs7SUFHSCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2pCOzs7WUFwTUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFDTixpRkFBaUY7YUFDcEY7Ozs7WUE1QkMsd0JBQXdCO1lBVXhCLGdCQUFnQjtZQUpoQixRQUFRO1lBSFIsVUFBVTs7OytCQThCVCxLQUFLOzJCQUtMLEtBQUs7NEJBTUwsS0FBSzt3QkFLTCxNQUFNO3lCQUtOLE1BQU07NkJBS04sTUFBTTs2QkFLTixLQUFLO3VCQUdMLEtBQUs7dUJBRUwsS0FBSztzQkFFTCxLQUFLO3lCQTBCTCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsWUFBWSxDQUFDO3VCQU92QyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7cUJBNEM3QyxZQUFZLFNBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBWaWV3Q29udGFpbmVyUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGdldENhcmV0Q29vcmRpbmF0ZXMgZnJvbSAndGV4dGFyZWEtY2FyZXQnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dElucHV0QXV0b2NvbXBsZXRlTWVudUNvbXBvbmVudCB9IGZyb20gJy4vdGV4dC1pbnB1dC1hdXRvY29tcGxldGUtbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENob2ljZVNlbGVjdGVkRXZlbnQge1xuICBjaG9pY2U6IGFueTtcbiAgaW5zZXJ0ZWRBdDoge1xuICAgIHN0YXJ0OiBudW1iZXI7XG4gICAgZW5kOiBudW1iZXI7XG4gIH07XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAndGV4dGFyZWFbbXdsVGV4dElucHV0QXV0b2NvbXBsZXRlXSxpbnB1dFt0eXBlPVwidGV4dFwiXVttd2xUZXh0SW5wdXRBdXRvY29tcGxldGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUZXh0SW5wdXRBdXRvY29tcGxldGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIGNoYXJhY3RlciB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgbWVudSB0byBhcHBlYXJcbiAgICovXG4gIEBJbnB1dCgpIHRyaWdnZXJDaGFyYWN0ZXIgPSAnQCc7XG5cbiAgLyoqXG4gICAqIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhhdCB3aWxsIG1hdGNoIHRoZSBzZWFyY2ggdGV4dCBhZnRlciB0aGUgdHJpZ2dlciBjaGFyYWN0ZXJcbiAgICovXG4gIEBJbnB1dCgpIHNlYXJjaFJlZ2V4cCA9IC9eXFx3KiQvO1xuXG4gIC8qKlxuICAgKiBUaGUgbWVudSBjb21wb25lbnQgdG8gc2hvdyB3aXRoIGF2YWlsYWJsZSBvcHRpb25zLlxuICAgKiBZb3UgY2FuIGV4dGVuZCB0aGUgYnVpbHQgaW4gYFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRgIGNvbXBvbmVudCB0byB1c2UgYSBjdXN0b20gdGVtcGxhdGVcbiAgICovXG4gIEBJbnB1dCgpIG1lbnVDb21wb25lbnQgPSBUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIHNob3duXG4gICAqL1xuICBAT3V0cHV0KCkgbWVudVNob3duID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgb3B0aW9ucyBtZW51IGlzIGhpZGRlblxuICAgKi9cbiAgQE91dHB1dCgpIG1lbnVIaWRkZW4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGEgY2hvaWNlIGlzIHNlbGVjdGVkXG4gICAqL1xuICBAT3V0cHV0KCkgY2hvaWNlU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENob2ljZVNlbGVjdGVkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBmb3JtYXRzIHRoZSBzZWxlY3RlZCBjaG9pY2Ugb25jZSBzZWxlY3RlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldENob2ljZUxhYmVsOiAoY2hvaWNlOiBhbnkpID0+IHN0cmluZyA9IGNob2ljZSA9PiBjaG9pY2U7XG5cbiAgLyogdHNsaW50OmRpc2FibGUgbWVtYmVyLW9yZGVyaW5nICovXG4gIEBJbnB1dCgpIHZhbHVlS2V5OiBzdHJpbmcgPSAnaWQnO1xuXG4gIEBJbnB1dCgpIGxhYmVsS2V5OiBzdHJpbmcgPSAnbmFtZSc7XG5cbiAgQElucHV0KCkgY2hvaWNlczogYW55W107XG5cbiAgcHJpdmF0ZSBtZW51OlxuICAgIHwge1xuICAgICAgICBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxUZXh0SW5wdXRBdXRvY29tcGxldGVNZW51Q29tcG9uZW50PjtcbiAgICAgICAgdHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uOiBudW1iZXI7XG4gICAgICAgIGxhc3RDYXJldFBvc2l0aW9uPzogbnVtYmVyO1xuICAgICAgfVxuICAgIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgbWVudUhpZGRlbiQgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgZWxtOiBFbGVtZW50UmVmXG4gICkge31cblxuICBmaW5kQ2hvaWNlcyhzZWFyY2hUZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihjID0+XG4gICAgICBjW3RoaXMubGFiZWxLZXldLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dC50b0xvd2VyQ2FzZSgpKVxuICAgICAgfHwgY1t0aGlzLnZhbHVlS2V5XSA9PSBzZWFyY2hUZXh0XG4gICAgKVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudC5rZXknXSlcbiAgb25LZXlwcmVzcyhrZXk6IHN0cmluZykge1xuICAgIGlmIChrZXkgPT09IHRoaXMudHJpZ2dlckNoYXJhY3Rlcikge1xuICAgICAgdGhpcy5zaG93TWVudSgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQudGFyZ2V0LnZhbHVlJ10pXG4gIG9uQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICBpZiAodmFsdWVbdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbl0gIT09IHRoaXMudHJpZ2dlckNoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLmhpZGVNZW51KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjdXJzb3IgPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICBpZiAoY3Vyc29yIDwgdGhpcy5tZW51LnRyaWdnZXJDaGFyYWN0ZXJQb3NpdGlvbikge1xuICAgICAgICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzZWFyY2hUZXh0ID0gdmFsdWUuc2xpY2UoXG4gICAgICAgICAgICB0aGlzLm1lbnUudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uICsgMSxcbiAgICAgICAgICAgIGN1cnNvclxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKCFzZWFyY2hUZXh0Lm1hdGNoKHRoaXMuc2VhcmNoUmVnZXhwKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnNlYXJjaFRleHQgPSBzZWFyY2hUZXh0O1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VzID0gW107XG4gICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmxhYmVsS2V5ID0gdGhpcy5sYWJlbEtleTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlTG9hZEVycm9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuZmluZENob2ljZXMoc2VhcmNoVGV4dCkpXG4gICAgICAgICAgICAgIC50aGVuKGNob2ljZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2UuY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVudSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LmNvbXBvbmVudC5pbnN0YW5jZS5jaG9pY2VMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLmNob2ljZUxvYWRFcnJvciA9IGVycjtcbiAgICAgICAgICAgICAgICAgIHRoaXMubWVudS5jb21wb25lbnQuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICB0aGlzLm1lbnUubGFzdENhcmV0UG9zaXRpb24gPSB0aGlzLmVsbS5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvd01lbnUoKSB7XG4gICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgIGNvbnN0IG1lbnVGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8XG4gICAgICAgIFRleHRJbnB1dEF1dG9jb21wbGV0ZU1lbnVDb21wb25lbnRcbiAgICAgID4odGhpcy5tZW51Q29tcG9uZW50KTtcbiAgICAgIHRoaXMubWVudSA9IHtcbiAgICAgICAgY29tcG9uZW50OiB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgICAgIG1lbnVGYWN0b3J5LFxuICAgICAgICAgIDAsXG4gICAgICAgICAgdGhpcy5pbmplY3RvclxuICAgICAgICApLFxuICAgICAgICB0cmlnZ2VyQ2hhcmFjdGVyUG9zaXRpb246IHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgIH07XG4gICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gK2dldENvbXB1dGVkU3R5bGUoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnRcbiAgICAgICkubGluZUhlaWdodCEucmVwbGFjZSgvcHgkLywgJycpO1xuICAgICAgY29uc3QgeyB0b3AsIGxlZnQgfSA9IGdldENhcmV0Q29vcmRpbmF0ZXMoXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHRoaXMuZWxtLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICk7XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50Lmluc3RhbmNlLnBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IHRvcCArIGxpbmVIZWlnaHQsXG4gICAgICAgIGxlZnRcbiAgICAgIH07XG4gICAgICB0aGlzLm1lbnUuY29tcG9uZW50LmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuaW5zdGFuY2Uuc2VsZWN0Q2hvaWNlXG4gICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm1lbnVIaWRkZW4kKSlcbiAgICAgICAgLnN1YnNjcmliZShjaG9pY2UgPT4ge1xuICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZXRDaG9pY2VMYWJlbChjaG9pY2UpO1xuICAgICAgICAgIGNvbnN0IHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50ID0gdGhpcy5lbG0ubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nID0gdGV4dGFyZWEudmFsdWU7XG4gICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMubWVudSEudHJpZ2dlckNoYXJhY3RlclBvc2l0aW9uO1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gdmFsdWUuc2xpY2UoMCwgc3RhcnRJbmRleCk7XG4gICAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9XG4gICAgICAgICAgICB0aGlzLm1lbnUhLmxhc3RDYXJldFBvc2l0aW9uIHx8IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHZhbHVlLnNsaWNlKGNhcmV0UG9zaXRpb24pO1xuICAgICAgICAgIHRleHRhcmVhLnZhbHVlID0gc3RhcnQgKyBsYWJlbCArIGVuZDtcbiAgICAgICAgICAvLyBmb3JjZSBuZyBtb2RlbCAvIGZvcm0gY29udHJvbCB0byB1cGRhdGVcbiAgICAgICAgICB0ZXh0YXJlYS5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnaW5wdXQnKSk7XG4gICAgICAgICAgdGhpcy5oaWRlTWVudSgpO1xuICAgICAgICAgIGNvbnN0IHNldEN1cnNvckF0ID0gKHN0YXJ0ICsgbGFiZWwpLmxlbmd0aDtcbiAgICAgICAgICB0ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZShzZXRDdXJzb3JBdCwgc2V0Q3Vyc29yQXQpO1xuICAgICAgICAgIHRleHRhcmVhLmZvY3VzKCk7XG4gICAgICAgICAgdGhpcy5jaG9pY2VTZWxlY3RlZC5lbWl0KHtcbiAgICAgICAgICAgIGNob2ljZSxcbiAgICAgICAgICAgIGluc2VydGVkQXQ6IHtcbiAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0SW5kZXgsXG4gICAgICAgICAgICAgIGVuZDogc3RhcnRJbmRleCArIGxhYmVsLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIHRoaXMubWVudVNob3duLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVNZW51KCkge1xuICAgIGlmICh0aGlzLm1lbnUpIHtcbiAgICAgIHRoaXMubWVudS5jb21wb25lbnQuZGVzdHJveSgpO1xuICAgICAgdGhpcy5tZW51SGlkZGVuJC5uZXh0KCk7XG4gICAgICB0aGlzLm1lbnVIaWRkZW4uZW1pdCgpO1xuICAgICAgdGhpcy5tZW51ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuaGlkZU1lbnUoKTtcbiAgfVxufVxuIl19