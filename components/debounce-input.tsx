"use client";

import { useEffect, useState } from "react";

import { Input, type InputProps } from "@/components/ui/input";

interface DebounceInputProps extends InputProps {
  debounce?: number;
}

export function DebounceInput({
  onChange,
  debounce = 500,
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState(props.value ?? "");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, debounce);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, debounce]);

  useEffect(() => {
    if (debouncedValue !== props.value) {
      // @ts-expect-error
      onChange?.(debouncedValue);
    }
  }, [debouncedValue, onChange, props.value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
