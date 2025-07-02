import { useState } from "react";
import { toast } from "sonner";
import * as v from "valibot";

import { useAppForm } from "@/hooks/use-app-form";

// Define reusable constants for enums if they are used elsewhere
export const PROFILE_VISIBILITY_PICKLIST = [
  "public",
  "friends",
  "private",
] as const;
export type ProfileVisibility = typeof PROFILE_VISIBILITY_PICKLIST[number];
export const NOTIFICATION_TYPE_PICKLIST = [
  "news",
  "messages",
  "mentions",
  "updates",
] as const;
export type NotificationType = typeof NOTIFICATION_TYPE_PICKLIST[number];
export const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
  { value: "in", label: "India" },
  { value: "br", label: "Brazil" },
  { value: "za", label: "South Africa" },
  { value: "ru", label: "Russia" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
  { value: "mx", label: "Mexico" },
  { value: "kr", label: "South Korea" },
  { value: "sg", label: "Singapore" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "nl", label: "Netherlands" },
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "fi", label: "Finland" },
  { value: "dk", label: "Denmark" },
  { value: "pl", label: "Poland" },
  { value: "cz", label: "Czech Republic" },
  { value: "hu", label: "Hungary" },
  { value: "ro", label: "Romania" },
  { value: "tr", label: "Turkey" },
  { value: "gr", label: "Greece" },
  { value: "pt", label: "Portugal" },
  { value: "ie", label: "Ireland" },
] as const;
export const NOTIFICATION_TYPE_OPTIONS = [
  { value: "news", label: "News" },
  { value: "messages", label: "Messages" },
  { value: "mentions", label: "Mentions" },
  { value: "updates", label: "Updates" },
] as const;

export const userProfileSchema = v.object({
  // Section 1: Basic Information
  fullName: v.pipe(v.string(), v.minLength(1, "Full name is required"), v.maxLength(50, "Full name cannot exceed 50 characters")),
  email: v.pipe(v.string(), v.minLength(1, "Email is required"), v.maxLength(100, "Email cannot exceed 100 characters"), v.email("Invalid email address")),
  country: v.pipe(v.string(), v.minLength(1, "Country selection is required"), v.maxLength(50, "Country cannot exceed 50 characters")),
  // Section 2: Profile Details
  profileVisibility: v.picklist(PROFILE_VISIBILITY_PICKLIST, "Profile visibility is required"),
  bio: v.pipe(v.string(), v.maxLength(500, "Bio cannot exceed 500 characters")),
  profileColor: v.pipe(v.string(), v.minLength(7, "Profile color is required"), v.maxLength(7, "Profile color must be a valid hex color code")),
  // Section 3: Notification Preferences
  enableEmailNotifications: v.boolean(),
  notificationTypes: v.array(v.picklist(NOTIFICATION_TYPE_PICKLIST, "Notification type is required")),
  notificationFrequency: v.pipe(v.number(), v.minValue(1, "Frequency must be at least 1 day"), v.maxValue(30, "Frequency cannot exceed 30 days"), v.integer("Frequency must be a whole number")),
  // Section 4: Financial (Example)
  donationAmount: v.pipe(v.string(), v.minLength(1, "Donation amount is required"), v.maxLength(10, "Donation amount cannot exceed 10 characters")),
  // Section 5: Agreement
  agreeToTerms: v.boolean(),
});

export type UserProfileFormValues = v.InferInput<typeof userProfileSchema>;

export const defaultValues: UserProfileFormValues = {
  fullName: "",
  email: "",
  country: "",
  profileVisibility: "public",
  bio: "",
  profileColor: "#000000",
  enableEmailNotifications: true,
  notificationTypes: [],
  notificationFrequency: 1,
  donationAmount: "0.00",
  agreeToTerms: false,
};

export function useExampleForm() {
  const [output, setOutput] = useState<string | null>(null);

  const form = useAppForm({
    defaultValues,
    onSubmit: async ({ value }) => {
    // Simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set the output to the formatted JSON string
      setOutput(JSON.stringify(value, null, 2));

      // Reset the form
      form.reset();

      // Show success toast
      toast.success("Form submitted successfully!");
    },
    onSubmitInvalid: () => {
    // Show error toast
      toast.error("Form submission failed. Please check the errors.");
    },
    validators: {
      onSubmit: userProfileSchema,
    },
  });

  function onClear() {
    setOutput(null);
  }

  function onCopy() {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  }

  return {
    form,
    output,
    onClear,
    onCopy,
  };
}
