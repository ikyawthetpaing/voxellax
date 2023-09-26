"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { getCategories } from "@/config/category";

import { approveSellerAction } from "@/lib/actions/user";
import { catchError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { LoadingButton } from "../loading-button";

const stepOneSchema = z.object({
  firstName: z.string().min(3).max(50),
  lastName: z.string().min(3).max(50),
  category: z.string(),
  workUrl: z.string(),
});

const stepTwoSchema = z.object({
  answers: z.array(z.object({ question: z.string(), answer: z.string() })),
});

type StepTwoOption = {
  question: string;
  answers: string[];
};

const stepTwoOptions: StepTwoOption[] = [
  {
    question: "What motivates you to sell products on Voxellax?",
    answers: [
      "I aim for Voxellax to generate passive income with minimal effort on my part.",
      "Voxellax serves as an experimental side project, and any earnings would be a welcome bonus.",
      "I prioritize the validation I receive from users liking or saving my products over the earnings.",
      "I intend to invest significant time and effort to make Voxellax my primary source of income.",
    ],
  },
  {
    question: "What is your level of experience as an online seller?",
    answers: [
      "I'm new to the realm of selling creative products online.",
      "I possess experience in selling solely through my personal website.",
      "I have experience selling exclusively on online marketplaces.",
      "I engage in selling across multiple marketplaces as well as through my personal website.",
    ],
  },
  {
    question:
      "What strategy do you plan to employ for marketing your products on Voxellax?",
    answers: [
      "I have a few ideas for endeavors such as advertisements and promoting on social media that I intend to experiment with.",
      "I have meticulously planned out how I will showcase and market my products, involving various forms of promotional activities.",
      "I do not view marketing as a necessary aspect of selling on Voxellax.",
      "I seek guidance regarding marketing approaches for my products.",
    ],
  },
];

interface ApplySellerApplicationFormProps {
  user: User;
}

export function ApplySellerApplicationForm({
  user,
}: ApplySellerApplicationFormProps) {
  const [firstName, lastName] = user.name?.split(" ") || ["", ""];
  const categories = getCategories();

  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const stepOneForm = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });
  const stepTwoForm = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
  });

  function stepOneOnSubmit(values: z.infer<typeof stepOneSchema>) {
    setStep(2);
    console.log(values);
  }
  function stepTwoOnSubmit(values: z.infer<typeof stepTwoSchema>) {
    console.log(values);
    startTransition(async () => {
      try {
        await approveSellerAction(user.id);
        router.refresh();
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <Card className="grid gap-6 border-0 p-0 sm:border sm:p-6">
      {step === 1 ? (
        <>
          <CardHeader className="grid gap-4 p-0">
            <CardTitle className="flex items-end justify-between gap-4">
              <span>Share your work with us</span>
              <span className="text-sm">Step {step} of 2</span>
            </CardTitle>
            <CardDescription>
              To maintain quality within our marketplace, we limit our seller
              community to the most qualified creators. Let us get to know you
              and your work!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...stepOneForm}>
              <form
                onSubmit={stepOneForm.handleSubmit(stepOneOnSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={stepOneForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={stepOneForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={stepOneForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        What category of products will you mainly sell?
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: typeof field.value) =>
                            field.onChange(value)
                          }
                        >
                          <SelectTrigger className="capitalize">
                            <SelectValue placeholder={field.value} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categories.map(({ label, value }) => (
                                <SelectItem
                                  key={value}
                                  value={value}
                                  className="capitalize"
                                >
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={stepOneForm.control}
                  name="workUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Share a URL where we can view your work
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a URL for your behance portfolio, dribbble page, or portfolio site"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div></div>
                  <Button>Next</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader className="grid gap-4 p-0">
            <CardTitle className="flex items-end justify-between gap-4">
              <span>Tell us a little about yourself</span>
              <span className="text-sm">Step {step} of 2</span>
            </CardTitle>
            <CardDescription>
              Your answers will help us better understand you as a shop owner.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Form {...stepTwoForm}>
              <form
                onSubmit={stepTwoForm.handleSubmit(stepTwoOnSubmit)}
                className="space-y-8"
              >
                {stepTwoOptions.map(({ question, answers }, index) => (
                  <FormField
                    key={index}
                    control={stepTwoForm.control}
                    name={`answers.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{question}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value?.answer}
                            onValueChange={(value: typeof field.value.answer) =>
                              field.onChange({
                                question: question,
                                answer: value,
                              })
                            }
                          >
                            <SelectTrigger className="h-full text-left">
                              <SelectValue placeholder="Select Answer" />
                            </SelectTrigger>
                            <SelectContent className="w-min">
                              <SelectGroup>
                                {answers.map((answer, index) => (
                                  <SelectItem key={index} value={answer}>
                                    {answer}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <LoadingButton isLoading={isPending} disabled={isPending}>
                    Submit Application
                  </LoadingButton>
                </div>
              </form>
            </Form>
          </CardContent>
        </>
      )}
    </Card>
  );
}
