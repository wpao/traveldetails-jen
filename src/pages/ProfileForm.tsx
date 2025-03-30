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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

//
const formSchema = z.object({
  fullname: z.string().min(3, {
    message: "Username must be at least 2 characters.",
  }),
  passport: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  height: z.coerce.number(),
  weight: z.coerce.number(),
  nationality: z.string(),
  address: z.string().min(10, "Minimal 10 karakter"),
  email: z.string().email(),
});

// Fungsi untuk mendapatkan jumlah hari berdasarkan bulan dan tahun
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export function ProfileForm() {
  //
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());

  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  // function
  const updateDateOfBirth = (year: string, month: string, day: string) => {
    // console.log("updateDateOfBirth", year, month, day);
    if (year && month && day) {
      const newDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
        2,
        "0"
      )}`;
      form.setValue("dateOfBirth", newDate); // 🔥 Masukkan nilai ke form
    }
  };

  // ...
  const form = useForm({
    defaultValues: {
      fullname: "",
      passport: "",
      gender: "",
      dateOfBirth: "",
      height: 0,
      weight: 0,
      nationality: "",
      address: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
  });

  //
  const days =
    selectedYear && selectedMonth
      ? getDaysInMonth(parseInt(selectedYear), parseInt(selectedMonth))
      : 31;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // console.log("dateOfBirth", values.dateOfBirth);

    const phoneNumber = "6285186884843"; // jen
    // const phoneNumber = "6281775109531"; // paozan
    const text = encodeURIComponent(`
      Traveller details:
      - Full Name (as per passport): ${values.fullname}
      - Passport Number: ${values.passport}
      - Gender: ${values.gender}
      - Date of Birth: ${values.dateOfBirth}
      - Height: ${values.height}
      - Weight: ${values.weight}
      - Nationality: ${values.nationality}
      - Address: ${values.address}
      - E-mail Address: ${values.email}
      `);

    //! Open iphone WA
    const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
    window.location.href = waUrl;

    //! Buka WhatsApp Web dengan pesan yang sudah diformat
    // window.open(
    //   `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${text}`,
    //   "_blank"
    // );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-5 md:grid-cols-2 m-5">
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
                  <Input placeholder="AAF0326..." {...field} />
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

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth (YYYY-MM-DD)</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Select
                      onValueChange={(value) => {
                        setSelectedYear(value);
                        updateDateOfBirth(value, selectedMonth, selectedDay);

                        // pengecekan sebelum mengubah dateOfBirth
                        if (value && selectedMonth && selectedDay) {
                          const newDate = `${value}-${selectedMonth.padStart(
                            2,
                            "0"
                          )}-${selectedDay.padStart(2, "0")}`;
                          field.onChange(newDate);
                        }

                        // const newDate = `${value}-${selectedMonth.padStart(
                        //   2,
                        //   "0"
                        // )}-${selectedDay.padStart(2, "0")}`;
                        // field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger id="year" name="year">
                        {" "}
                        {/* ✅ Tambahkan id & name */}
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Pilihan Bulan */}
                    <Select
                      onValueChange={(value) => {
                        setSelectedMonth(value);
                        updateDateOfBirth(selectedYear, value, selectedDay);

                        // pengecekan sebelum mengubah dateOfBirth
                        if (value && selectedMonth && selectedDay) {
                          const newDate = `${value}-${selectedYear.padStart(
                            2,
                            "0"
                          )}-${selectedDay.padStart(2, "0")}`;
                          field.onChange(newDate);
                        }

                        // const newDate = `${selectedYear}-${value.padStart(
                        //   2,
                        //   "0"
                        // )}-${selectedDay.padStart(2, "0")}`;
                        // field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger id="month" name="month">
                        {" "}
                        {/* ✅ Tambahkan id & name */}
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Pilihan Hari */}
                    <Select
                      onValueChange={(value) => {
                        setSelectedDay(value);
                        updateDateOfBirth(selectedYear, selectedMonth, value);

                        // pengecekan sebelum mengubah dateOfBirth
                        if (value && selectedMonth && selectedDay) {
                          const newDate = `${value}-${selectedMonth.padStart(
                            2,
                            "0"
                          )}-${selectedDay.padStart(2, "0")}`;
                          field.onChange(newDate);
                        }

                        // const newDate = `${selectedYear}-${selectedMonth.padStart(
                        //   2,
                        //   "0"
                        // )}-${value.padStart(2, "0")}`;
                        // field.onChange(newDate);
                      }}
                    >
                      <SelectTrigger id="day" name="day">
                        {" "}
                        {/* ✅ Tambahkan id & name */}
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: days }, (_, i) =>
                          (i + 1).toString()
                        ).map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                      <SelectItem value="Albania">Albania</SelectItem>
                      <SelectItem value="Algeria">Algeria</SelectItem>
                      <SelectItem value="Andorra">Andorra</SelectItem>
                      <SelectItem value="Angola">Angola</SelectItem>
                      <SelectItem value="Argentina">Argentina</SelectItem>
                      <SelectItem value="Armenia">Armenia</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Austria">Austria</SelectItem>
                      <SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
                      <SelectItem value="Bahrain">Bahrain</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="Belarus">Belarus</SelectItem>
                      <SelectItem value="Belgium">Belgium</SelectItem>
                      <SelectItem value="Belize">Belize</SelectItem>
                      <SelectItem value="Benin">Benin</SelectItem>
                      <SelectItem value="Bhutan">Bhutan</SelectItem>
                      <SelectItem value="Bolivia">Bolivia</SelectItem>
                      <SelectItem value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </SelectItem>
                      <SelectItem value="Botswana">Botswana</SelectItem>
                      <SelectItem value="Brazil">Brazil</SelectItem>
                      <SelectItem value="Brunei">Brunei</SelectItem>
                      <SelectItem value="Bulgaria">Bulgaria</SelectItem>
                      <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                      <SelectItem value="Burundi">Burundi</SelectItem>
                      <SelectItem value="Cambodia">Cambodia</SelectItem>
                      <SelectItem value="Cameroon">Cameroon</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="Cape Verde">Cape Verde</SelectItem>
                      <SelectItem value="Central African Republic">
                        Central African Republic
                      </SelectItem>
                      <SelectItem value="Chad">Chad</SelectItem>
                      <SelectItem value="Chile">Chile</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="Congo">Congo</SelectItem>
                      <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                      <SelectItem value="Croatia">Croatia</SelectItem>
                      <SelectItem value="Cuba">Cuba</SelectItem>
                      <SelectItem value="Cyprus">Cyprus</SelectItem>
                      <SelectItem value="Czech Republic">
                        Czech Republic
                      </SelectItem>
                      <SelectItem value="Denmark">Denmark</SelectItem>
                      <SelectItem value="Djibouti">Djibouti</SelectItem>
                      <SelectItem value="Dominican Republic">
                        Dominican Republic
                      </SelectItem>
                      <SelectItem value="Ecuador">Ecuador</SelectItem>
                      <SelectItem value="Egypt">Egypt</SelectItem>
                      <SelectItem value="El Salvador">El Salvador</SelectItem>
                      <SelectItem value="Estonia">Estonia</SelectItem>
                      <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="Finland">Finland</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Gabon">Gabon</SelectItem>
                      <SelectItem value="Gambia">Gambia</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                      <SelectItem value="Greece">Greece</SelectItem>
                      <SelectItem value="Guatemala">Guatemala</SelectItem>
                      <SelectItem value="Haiti">Haiti</SelectItem>
                      <SelectItem value="Honduras">Honduras</SelectItem>
                      <SelectItem value="Hungary">Hungary</SelectItem>
                      <SelectItem value="Iceland">Iceland</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Indonesia">Indonesia</SelectItem>
                      <SelectItem value="Iran">Iran</SelectItem>
                      <SelectItem value="Iraq">Iraq</SelectItem>
                      <SelectItem value="Ireland">Ireland</SelectItem>
                      <SelectItem value="Israel">Israel</SelectItem>
                      <SelectItem value="Italy">Italy</SelectItem>
                      <SelectItem value="Jamaica">Jamaica</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="Jordan">Jordan</SelectItem>
                      <SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="North Korea">North Korea</SelectItem>
                      <SelectItem value="South Korea">South Korea</SelectItem>
                      <SelectItem value="Kuwait">Kuwait</SelectItem>
                      <SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
                      <SelectItem value="Laos">Laos</SelectItem>
                      <SelectItem value="Latvia">Latvia</SelectItem>
                      <SelectItem value="Lebanon">Lebanon</SelectItem>
                      <SelectItem value="Libya">Libya</SelectItem>
                      <SelectItem value="Lithuania">Lithuania</SelectItem>
                      <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                      <SelectItem value="Madagascar">Madagascar</SelectItem>
                      <SelectItem value="Malaysia">Malaysia</SelectItem>
                      <SelectItem value="Maldives">Maldives</SelectItem>
                      <SelectItem value="Mali">Mali</SelectItem>
                      <SelectItem value="Malta">Malta</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      <SelectItem value="Moldova">Moldova</SelectItem>
                      <SelectItem value="Monaco">Monaco</SelectItem>
                      <SelectItem value="Mongolia">Mongolia</SelectItem>
                      <SelectItem value="Montenegro">Montenegro</SelectItem>
                      <SelectItem value="Morocco">Morocco</SelectItem>
                      <SelectItem value="Mozambique">Mozambique</SelectItem>
                      <SelectItem value="Myanmar">Myanmar</SelectItem>
                      <SelectItem value="Namibia">Namibia</SelectItem>
                      <SelectItem value="Nepal">Nepal</SelectItem>
                      <SelectItem value="Netherlands">Netherlands</SelectItem>
                      <SelectItem value="New Zealand">New Zealand</SelectItem>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                      <SelectItem value="Norway">Norway</SelectItem>
                      <SelectItem value="Oman">Oman</SelectItem>
                      <SelectItem value="Pakistan">Pakistan</SelectItem>
                      <SelectItem value="Panama">Panama</SelectItem>
                      <SelectItem value="Paraguay">Paraguay</SelectItem>
                      <SelectItem value="Peru">Peru</SelectItem>
                      <SelectItem value="Philippines">Philippines</SelectItem>
                      <SelectItem value="Poland">Poland</SelectItem>
                      <SelectItem value="Portugal">Portugal</SelectItem>
                      <SelectItem value="Qatar">Qatar</SelectItem>
                      <SelectItem value="Romania">Romania</SelectItem>
                      <SelectItem value="Russia">Russia</SelectItem>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="Singapore">Singapore</SelectItem>
                      <SelectItem value="South Africa">South Africa</SelectItem>
                      <SelectItem value="Spain">Spain</SelectItem>
                      <SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
                      <SelectItem value="Sweden">Sweden</SelectItem>
                      <SelectItem value="Switzerland">Switzerland</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Turkey">Turkey</SelectItem>
                      <SelectItem value="Ukraine">Ukraine</SelectItem>
                      <SelectItem value="United Arab Emirates">
                        United Arab Emirates
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                      <SelectItem value="United States">
                        United States
                      </SelectItem>
                      <SelectItem value="Vietnam">Vietnam</SelectItem>
                      <SelectItem value="Yemen">Yemen</SelectItem>
                      <SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
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
