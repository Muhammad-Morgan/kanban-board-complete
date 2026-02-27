import * as React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { Input } from "@/components/atom/input";
import { Button } from "@/components/atom/button";
import { Eye, EyeClosed, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atom/select";

type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  className?: string;
  step?: number;
  min?: number;
  placeholder?: string;
};

export function CustomFormField<T extends FieldValues>({
  name,
  control,
  label,
  type,
  className,
  step,
  min,
  placeholder,
}: CustomFormFieldProps<T>) {
  const [visible, setVisible] = React.useState(false);
  const inputType =
    type === "password" ? (visible ? "text" : "password") : type;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize tracking-wide">
            {label ?? name}
          </FormLabel>
          <div className="relative">
            <FormControl className={className}>
              <Input
                {...field}
                type={inputType}
                step={step ?? undefined}
                min={min ?? undefined}
                placeholder={placeholder ?? undefined}
                className="bg-background! !dark:bg-background"
              />
            </FormControl>
            {type === "password" ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 hover:bg-none  hover:shadow-none cursor-pointer"
                onClick={() => setVisible((prev) => !prev)}
              >
                {visible ? <Eye /> : <EyeClosed />}
              </Button>
            ) : null}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}

type CustomDateFieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  labelText?: string;
  className?: string;
  inputProps?: Omit<
    React.ComponentProps<"input">,
    "type" | "value" | "onChange"
  >;
};

export function CustomDateField<T extends FieldValues>({
  name,
  control,
  labelText,
  className,
  inputProps,
}: CustomDateFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value = field.value
          ? field.value.toISOString().split("T")[0]
          : field.value
            ? String(field.value)
            : "";
        return (
          <FormItem>
            <FormLabel className="capitalize">{labelText ?? name}</FormLabel>
            <FormControl className={className}>
              <Input
                type="date"
                value={value}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  field.onChange(nextValue ? new Date(nextValue) : undefined);
                }}
                className="bg-background! !dark:bg-background"
                {...inputProps}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

type CustomFormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  defaultLabel?: string;
  items:
    | string[]
    | {
        id: string;
        title: string;
      }[];
  labelText?: string;
  className?: string;
};

export function CustomFormSelect<T extends FieldValues>({
  name,
  control,
  defaultLabel,
  items,
  labelText,
  className,
}: CustomFormSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value ?? defaultLabel}
          >
            <FormControl className={`w-full ${className}`}>
              <SelectTrigger className="bg-background! !dark:bg-background">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items?.map((item: string | { id: string; title: string }) => {
                if (typeof item === "string") {
                  return (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  );
                } else {
                  return (
                    <SelectItem key={item.id} value={item.id}>
                      {item.title}
                    </SelectItem>
                  );
                }
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
type CheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  labelText?: string;
};

export function CustomFormCheckbox<T extends FieldValues>({
  control,
  name,
  labelText,
}: CheckboxProps<T>) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    checked: boolean,
    onChange: (value: boolean) => void,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onChange(!checked);
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <label className="flex gap-2 cursor-pointer select-none text-sm font-normal">
              <span className="capitalize tracking-wider">
                {labelText || name}
              </span>

              <input
                type="checkbox"
                className="sr-only peer"
                checked={field.value}
                onChange={(event) => field.onChange(event.target.checked)}
                onKeyDown={(event) =>
                  handleKeyDown(event, field.value, field.onChange)
                }
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/60 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-primary ${
                  field.value
                    ? "bg-primary text-background border-primary shadow-sm"
                    : "border-primary/40 bg-transparent"
                }`}
                aria-hidden="true"
              >
                {field.value ? <Check className="h-3 w-3" /> : null}
              </span>
            </label>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
