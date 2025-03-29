"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  /* FormDescription, */
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { DatePicker } from "./DatePicker";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  passport: z.string(),
  gender: z.string(),
  // dateOfBirth: z.date(),
  dateOfBirth: z.coerce.date({ message: "Invalid date" }),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  nationality: z.string(),
  address: z.string().min(10, "Minimal 10 karakter"),
  email: z.string().email(),
});

export function ProfileForm() {
  // ...
  const form = useForm({
    defaultValues: {
      fullname: "",
      passport: "",
      gender: "",
      dateOfBirth: new Date(),
      height: 0,
      weight: 0,
      nationality: "",
      address: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const phoneNumber = "6285186884843"; // jen
    // const phoneNumber = "6281775109531"; // paozan
    const text = encodeURIComponent(`
      Traveller details:
      - Full Name (as per passport): ${values.fullname}
      - Passport Number: ${values.passport}
      - Gender: ${values.gender}
      - Date of Birth: ${format(values.dateOfBirth, "PPP")}
      - Height: ${values.height}
      - Weight: ${values.weight}
      - Nationality: ${values.nationality}
      - Address: ${values.address}
      - E-mail Address: ${values.email}
      `);

    // Open iphone WA
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
    window.location.href = waUrl;

    // Buka WhatsApp Web dengan pesan yang sudah diformat
    // window.open(
    //   `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${text}`,
    //   "_blank"
    // );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-5 md:grid-cols-2 m-5">
          {/* bagian kiri */}
          {/* <div className="flex flex-col gap-10"> */}

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name (as per passport):</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport Number: */}
          <FormField
            control={form.control}
            name="passport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passport Number:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth: */}
          {/* <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth:</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className="w-[200px] justify-start text-left"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Date of Birth: */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth: "YYYY-MM-DD"</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover> */}
                    <Input
                      type="text"
                      placeholder="YYYY-MM-DD"
                      onChange={(e) => {
                        const value = e.target.value;
                        console.log(value);
                        if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
                          console.log("value");
                          field.onChange(new Date(value));
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Height: */}
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Weight: */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nationality */}
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adult">USA</SelectItem>
                      <SelectItem value="Children 3-12 Years Old">
                        Germany
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Write your address..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
          {/* </div> */}
        </div>
      </form>
    </Form>
  );
}
