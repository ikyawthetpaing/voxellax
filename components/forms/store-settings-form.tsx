"use client";

import { useState } from "react";
import {
  countries,
  getCountryCities,
  getCountryFlag,
  getCountryName,
  getCurrencies,
} from "@/constants/countries";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { StoreSettingsSchema } from "@/lib/validations/store";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { StoreMediaFileForm } from "./store-media-file-form";

interface StoreSettingsFormProps {
  form: UseFormReturn<StoreSettingsSchema>;
  onSubmit: SubmitHandler<StoreSettingsSchema>;
  submitId: string;
}

export function StoreSettingsForm({
  form,
  onSubmit,
  submitId,
}: StoreSettingsFormProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectCurrencyOpen, setSelectCurrencyOpen] = useState(false);

  const currencies = getCurrencies();
  const cities = getCountryCities(form.watch("location.countryCode"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <StoreMediaFileForm form={form} />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store name *</FormLabel>
                  <FormDescription>
                    Appears on receipts, invoices, and more
                  </FormDescription>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store description *</FormLabel>
                  <FormDescription>
                    Give your store a short, clear description.
                  </FormDescription>
                </div>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Store handle *</FormLabel>
                  <FormDescription>
                    Your store is visible at this address
                  </FormDescription>
                </div>
                <FormControl>
                  <div className="flex gap-2">
                    <div className="h-10 rounded-md border px-3 py-2 text-muted-foreground">
                      {siteConfig.url}/store/
                    </div>
                    <Input {...field} />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Location *</FormLabel>
                  <FormDescription>
                    Where your store is registered
                  </FormDescription>
                </div>
                <div className="flex gap-4">
                  <FormControl>
                    <Popover
                      open={isCountryOpen}
                      onOpenChange={setIsCountryOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isCountryOpen}
                          className="flex w-full justify-between px-3 hover:bg-transparent"
                        >
                          {field.value?.countryCode ? (
                            <div className="flex items-center gap-4">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={getCountryFlag(field.value.countryCode)}
                                  alt={field.value.countryCode}
                                  className="object-cover"
                                />
                                <AvatarFallback>
                                  {field.value.countryCode}
                                </AvatarFallback>
                              </Avatar>
                              <span className="line-clamp-1">
                                {getCountryName(field.value.countryCode)}
                              </span>
                            </div>
                          ) : (
                            "Select country"
                          )}
                          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-0 p-0">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Type a command or search..." />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              <div className="grid gap-1">
                                {countries.map(
                                  (
                                    { name, iso2, flag, unicodeFlag },
                                    index
                                  ) => (
                                    <CommandItem
                                      key={index}
                                      value={name}
                                      onSelect={() => {
                                        field.onChange({
                                          city:
                                            iso2 !== field.value?.countryCode
                                              ? ""
                                              : field.value?.city,
                                          countryCode: iso2,
                                        });
                                        setIsCountryOpen(false);
                                      }}
                                      className={cn({
                                        "bg-accent":
                                          iso2 === field.value?.countryCode,
                                      })}
                                    >
                                      <div className="flex gap-4">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage
                                            src={flag}
                                            alt={name}
                                            className="object-cover"
                                          />
                                          <AvatarFallback>
                                            {unicodeFlag}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="line-clamp-1">
                                          {name}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  )
                                )}
                              </div>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormControl>
                    <Popover open={isCityOpen} onOpenChange={setIsCityOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isCountryOpen}
                          className="flex w-full justify-between px-3 hover:bg-transparent"
                          disabled={!field.value?.countryCode}
                        >
                          {field.value?.city ? field.value.city : "Select city"}
                          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-0 p-0">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Type a command or search..." />
                          <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                              {cities.map((city, index) => (
                                <CommandItem
                                  key={index}
                                  value={city}
                                  onSelect={() => {
                                    field.onChange({
                                      city,
                                      countryCode:
                                        field.value?.countryCode || "",
                                    });
                                    setIsCityOpen(false);
                                  }}
                                  className={cn({
                                    "bg-accent":
                                      field.value.city &&
                                      city === field.value.city,
                                  })}
                                >
                                  <span className="line-clamp-1">{city}</span>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Currency *</FormLabel>
                  <FormDescription>
                    Your store&apos;s main currency
                  </FormDescription>
                </div>
                <FormControl>
                  <Popover
                    open={selectCurrencyOpen}
                    onOpenChange={setSelectCurrencyOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCountryOpen}
                        className="flex w-full justify-between px-3 hover:bg-transparent"
                      >
                        {field.value
                          ? `${field.value?.currency} - ${getCountryName(
                              field.value?.countryCode
                            )}`
                          : "Select currency"}
                        <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full border-0 p-0">
                      <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-full">
                              <div className="grid gap-1">
                                {currencies.map(
                                  ({ currency, countryCode }, index) =>
                                    currency && (
                                      <CommandItem
                                        key={index}
                                        value={`${currency} - ${getCountryName(
                                          countryCode
                                        )}`}
                                        onSelect={() => {
                                          field.onChange({
                                            currency,
                                            countryCode,
                                          });
                                          setSelectCurrencyOpen(false);
                                        }}
                                        className={cn({
                                          "bg-accent":
                                            currency ===
                                              field.value?.currency &&
                                            countryCode ===
                                              field.value?.countryCode,
                                        })}
                                      >
                                        <span className="line-clamp-1">
                                          {currency} -{" "}
                                          {getCountryName(countryCode)}
                                        </span>
                                      </CommandItem>
                                    )
                                )}
                              </div>
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <div className="grid gap-2 lg:grid-cols-2">
                <div>
                  <FormLabel>Contact email *</FormLabel>
                  <FormDescription>
                    Where customers can contact you for support. Appears on
                    receipts and invoices.
                  </FormDescription>
                </div>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" id={submitId} hidden />
      </form>
    </Form>
  );
}
