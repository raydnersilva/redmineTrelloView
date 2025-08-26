import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cn } from '../../../lib/utils';

@Component({
    selector: 'app-input',
    imports: [CommonModule],
    template: `
    <input
      [type]="type"
      [value]="value"
      [placeholder]="placeholder"
      (input)="onInput($event)"
      (blur)="onTouched()"
      [disabled]="disabled"
      [ngClass]="cn('flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', customClass)"
    />
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent implements ControlValueAccessor {
    @Input() type = 'text';
    @Input() placeholder = '';
    @Input() customClass = '';

    cn = cn;
    value: string = '';
    disabled = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    onInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.onChange(value);
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}