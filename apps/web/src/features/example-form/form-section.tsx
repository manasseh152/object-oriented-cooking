import type { FormEvent } from "react";

import type { Option } from "@/lib/option";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { COUNTRY_OPTIONS, defaultValues, NOTIFICATION_TYPE_OPTIONS } from "@/features/example-form/use-example-form";
import { withForm } from "@/hooks/use-app-form";

export const FormSection = withForm({
  defaultValues,
  render: function Render({ form }) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      form.handleSubmit();
    }

    function handleReset() {
      form.reset();
    }

    return (
      <div className="w-full lg:w-1/2 flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-bold mb-1">Form Example</h1>
          <p className="text-sm text-muted-foreground">Fill out the form below to see the resulting JSON output</p>
        </div>

        <div className="rounded-md border bg-card shadow-sm">
          <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
            <form.AppField
              name="fullName"
              children={field => (
                <Label>
                  <Label.Text>Full Name</Label.Text>
                  <field.Input />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="email"
              children={field => (
                <Label>
                  <Label.Text>Email</Label.Text>
                  <field.Input type="email" />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="country"
              children={field => (
                <Label>
                  <Label.Text>Country</Label.Text>
                  <field.Popover closeOnChange={true}>
                    <field.RadioGroup options={COUNTRY_OPTIONS as unknown as Option<string>[]}>
                      <field.Popover.Trigger asChild>
                        <field.RadioGroup.Trigger placeholder="Select country" />
                      </field.Popover.Trigger>
                      <field.Popover.Content matchTriggerWidth={true}>
                        <field.RadioGroup.Field />
                      </field.Popover.Content>
                    </field.RadioGroup>
                  </field.Popover>
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="profileVisibility"
              children={field => (
                <Label>
                  <Label.Text>Profile Visibility</Label.Text>
                  <field.RadioGroup options={[
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                    { value: "friends", label: "Friends" },
                  ]}
                  >
                    <field.RadioGroup.Field />
                  </field.RadioGroup>
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="bio"
              children={field => (
                <Label>
                  <Label.Text>Bio</Label.Text>
                  <field.Textarea />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="profileColor"
              children={field => (
                <Label>
                  <Label.Text>Profile Color</Label.Text>
                  <field.ColorPicker />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="enableEmailNotifications"
              children={field => (
                <Label className="flex-row">
                  <field.Checkbox />
                  <Label.Text>Enable Email Notifications</Label.Text>
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="notificationTypes"
              children={field => (
                <Label asChild>
                  <div>
                    <Label.Text>Notification Types</Label.Text>
                    <field.CheckboxGroup options={NOTIFICATION_TYPE_OPTIONS as unknown as Option<string>[]}>
                      <field.CheckboxGroup.Field />
                    </field.CheckboxGroup>
                    <field.ValidationError />
                  </div>
                </Label>
              )}
            />
            <form.AppField
              name="notificationFrequency"
              children={field => (
                <Label>
                  <Label.Text>Notification Frequency</Label.Text>
                  <Slider
                    name={field.name}
                    value={[field.state.value]}
                    onValueChange={values => field.handleChange(values[0])}
                    onBlur={field.handleBlur}
                    min={1}
                    max={30}
                    step={1}
                  />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="donationAmount"
              children={field => (
                <Label>
                  <Label.Text>Donation Amount</Label.Text>
                  <field.CurrencyInput />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="agreeToTerms"
              children={field => (
                <Label className="flex-row">
                  <field.Checkbox />
                  <Label.Text>I agree to the terms and conditions</Label.Text>
                  <field.ValidationError />
                </Label>
              )}
            />

            <div className="w-full flex flex-col gap-2">
              <form.AppForm>
                <form.SubmitButton className="w-full" />
                <form.ShowIf
                  selector={state => state.isDirty}
                  when={isDirty => isDirty}
                  children={(
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  )}
                />
                <form.Blocker />
              </form.AppForm>
            </div>
          </form>
        </div>
      </div>
    );
  },
});
