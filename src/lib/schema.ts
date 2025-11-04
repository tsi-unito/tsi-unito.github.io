import * as z from 'zod';

export const groupTitleSchema = z.union([
  z.string(),
  z.object({
    it: z.string(),
    en: z.string(),
  }),
  z.array(z.string()),
]);

export const yearsOfStudySchema = z.enum(["first", "second", "third", "fourth", "fifth"]);

export const groupSchema = z.object({
  title: groupTitleSchema,
  url: z.url(),
  abbreviations: z.array(z.string()).optional(), // Optional list of strings
  yearOfStudy: z.array(yearsOfStudySchema).optional(), // Enum for year of study
});

export const groupsArraySchema = z.array(groupSchema);

export type GroupInfo = z.infer<typeof groupSchema>;