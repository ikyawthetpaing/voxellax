"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import { isValidStoreId } from "@/lib/actions/store";
import { StoreSchema } from "@/lib/validations/store";
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
import { Textarea } from "@/components/ui/textarea";
import { DebounceInput } from "@/components/debounce-input";
import { StoreMediaFileForm } from "@/components/forms/store-media-file-form";
import { Icons } from "@/components/icons";

interface StoreFormProps {
  form: UseFormReturn<StoreSchema>;
  onSubmit: SubmitHandler<StoreSchema>;
  submitId: string;
  disabled: boolean;
}

export function StoreForm({
  form,
  onSubmit,
  submitId,
  disabled,
}: StoreFormProps) {
  const [validStoreId, setValidStoreId] = useState(true);

  const storeId = form.watch("id");

  useEffect(() => {
    isValidStoreId(storeId)
      .then((result) => {
        setValidStoreId(result);
      })
      .catch((err) => console.error(err));
  }, [storeId]);

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
                  <FormLabel>Store description</FormLabel>
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
          name="id"
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
                  <div className="relative">
                    <Icons.atSign className="absolute top-1/2 ml-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <DebounceInput
                      className="pl-9"
                      placeholder="Type your store handle here..."
                      {...field}
                    />
                  </div>
                </FormControl>
              </div>
              <FormMessage>
                {!validStoreId && "Handle already taken."}
              </FormMessage>
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
                  <div className="relative">
                    <Icons.mail className="absolute top-1/2 ml-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-10" {...field} />
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <input
          type="submit"
          id={submitId}
          hidden
          disabled={!validStoreId || disabled}
        />
      </form>
    </Form>
  );
}

{
  /* <FormField
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
                          {currentLocation ? (
                            <div className="flex items-center gap-4">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={currentLocation.country.flag}
                                  alt={currentLocation.country.name}
                                  className="object-cover"
                                />
                                <AvatarFallback>
                                  {currentLocation.country.iso2}
                                </AvatarFallback>
                              </Avatar>
                              <span className="line-clamp-1">
                                {currentLocation.country.name}
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
                                {countries.length > 0 &&
                                  countries.map((country, index) => (
                                    <CommandItem
                                      key={index}
                                      value={country.name}
                                      onSelect={() => {
                                        field.onChange({
                                          city:
                                            country.iso2 !==
                                            field.value?.countryCode
                                              ? ""
                                              : field.value?.city,
                                          countryCode: country.iso2,
                                        });
                                        setCurrentLocation({
                                          country,
                                        });
                                        setIsCountryOpen(false);
                                      }}
                                      className={cn({
                                        "bg-accent":
                                          country.iso2 ===
                                          field.value?.countryCode,
                                      })}
                                    >
                                      <div className="flex gap-4">
                                        <Avatar className="h-6 w-6">
                                          <AvatarImage
                                            src={country.flag}
                                            alt={country.name}
                                            className="object-cover"
                                          />
                                          <AvatarFallback>
                                            {country.iso2}
                                          </AvatarFallback>
                                        </Avatar>
                                        <span className="line-clamp-1">
                                          {country.name}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                              </div>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormControl>
                    <Popover open={isStateOpen} onOpenChange={setIsStateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isStateOpen}
                          className="flex w-full justify-between px-3 hover:bg-transparent"
                          disabled={!field.value?.countryCode}
                        >
                          {field.value?.state
                            ? field.value.state
                            : "Select state"}
                          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-0 p-0">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Type a command or search..." />
                          <CommandList>
                            {states.length > 0 ? (
                              <>
                                <CommandEmpty>No state found.</CommandEmpty>
                                <CommandGroup>
                                  {states.map(({ name }, index) => (
                                    <CommandItem
                                      key={index}
                                      value={name}
                                      onSelect={() => {
                                        field.onChange({
                                          state: name,
                                          countryCode:
                                            field.value?.countryCode || "",
                                        });
                                        setCurrentLocation({
                                          ...currentLocation,
                                          state: name,
                                        });
                                        setIsStateOpen(false);
                                      }}
                                      className={cn({
                                        "bg-accent":
                                          field.value?.state &&
                                          name === field.value.state,
                                      })}
                                    >
                                      <span className="line-clamp-1">
                                        {name}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </>
                            ) : (
                              <div className="py-6 text-center text-sm">
                                No state found.
                              </div>
                            )}
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
                          disabled={!field.value?.state}
                        >
                          {field.value?.city ? field.value.city : "Select city"}
                          <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full border-0 p-0">
                        <Command className="rounded-lg border shadow-md">
                          <CommandInput placeholder="Type a command or search..." />
                          <CommandList>
                            {cities.length > 0 ? (
                              <>
                                <CommandEmpty>No cities found.</CommandEmpty>
                                <CommandGroup>
                                  {cities.map((name, index) => (
                                    <CommandItem
                                      key={index}
                                      value={name}
                                      onSelect={() => {
                                        field.onChange({
                                          city: name,
                                          state: field.value.state,
                                          countryCode:
                                            field.value?.countryCode || "",
                                        });
                                        setIsCityOpen(false);
                                      }}
                                      className={cn({
                                        "bg-accent":
                                          field.value?.city &&
                                          name === field.value.city,
                                      })}
                                    >
                                      <span className="line-clamp-1">
                                        {name.toString()}
                                      </span>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </>
                            ) : (
                              <div className="py-6 text-center text-sm">
                                No cities found.
                              </div>
                            )}
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
        /> */
}
