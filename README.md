# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

<!-- ============================== -->

<FormField
control={form.control}
name="dateOfBirth"
render={({ field }) => (
<FormItem className="flex flex-col">
<FormLabel>Date of Birth: "YYYY-MM-DD"</FormLabel>
<FormControl>
<div className="flex items-center gap-2">
<FormField
control={form.control}
name="year"
render={({ field }) => (
<FormItem>
<FormControl>
<Select
onValueChange={(value) => {
field.onChange(value);
setSelectedYear(value);
}} >
<SelectTrigger>
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
</FormControl>
<FormMessage />
</FormItem>
)}
/>

                    {/* Pilihan Bulan */}
                    <FormField
                      control={form.control}
                      name="month"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedMonth(value);
                              }}
                            >
                              <SelectTrigger>
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pilihan Hari */}
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* ================================== */}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<!-- ============================== -->

{/_ Date of Birth (YYYY-MM-DD) _/}
<FormField
control={form.control}
name="dateOfBirth"
render={({ field }) => (
<FormItem className="flex flex-col">
<FormLabel htmlFor="dateOfBirth">
Date of Birth (YYYY-MM-DD)
</FormLabel>
<FormControl>

<div className="flex gap-2">
{/_ Pilihan Tahun _/}
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
