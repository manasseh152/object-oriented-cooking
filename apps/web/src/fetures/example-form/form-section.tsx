import type { FormEvent } from 'react';

import type { SelectOption } from '@/components/form-fields/select';
import type { NotificationType } from '@/fetures/example-form/use-example-form';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { COUNTRY_OPTIONS, defaultValues, NOTIFICATION_TYPE_OPTIONS } from '@/fetures/example-form/use-example-form';
import { withForm } from '@/hooks/use-app-form';

import type { Option } from '../../components/form/checkbox-group';

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
                  <field.TextField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="email"
              children={field => (
                <Label>
                  <Label.Text>Email</Label.Text>
                  <field.TextField field={field} type="email" />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="country"
              children={field => (
                <Label>
                  <Label.Text>Country</Label.Text>
                  <field.SelectField field={field} options={COUNTRY_OPTIONS as unknown as SelectOption<string>[]} placeholder="Select a country" />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="profileVisibility"
              children={field => (
                <Label>
                  <Label.Text>Profile Visibility</Label.Text>
                  <field.RadioGroupField field={field}>
                    <field.RadioGroupItemField field={field} value="public" label="Public" />
                    <field.RadioGroupItemField field={field} value="private" label="Private" />
                    <field.RadioGroupItemField field={field} value="friends" label="Friends" />
                  </field.RadioGroupField>
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="bio"
              children={field => (
                <Label>
                  <Label.Text>Bio</Label.Text>
                  <field.TextAreaField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />
            <form.AppField
              name="profileColor"
              children={field => (
                <Label>
                  <Label.Text>Profile Color</Label.Text>
                  <field.ColorPickerField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="enableEmailNotifications"
              children={field => (
                <Label className="flex-row">
                  <field.CheckboxField field={field} />
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
                    <field.CheckboxGroupField field={field} options={NOTIFICATION_TYPE_OPTIONS as unknown as Option<NotificationType>[]} />
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
                  <field.SliderField field={field} min={1} max={30} step={1} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="donationAmount"
              children={field => (
                <Label>
                  <Label.Text>Donation Amount</Label.Text>
                  <field.CurrencyField field={field} />
                  <field.ValidationError />
                </Label>
              )}
            />

            <form.AppField
              name="agreeToTerms"
              children={field => (
                <Label className="flex-row">
                  <field.CheckboxField field={field} />
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
                <form.DevHelper />
              </form.AppForm>
            </div>
          </form>
        </div>
      </div>
    );
  },
});
