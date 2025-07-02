import { createFormHook } from "@tanstack/react-form";

import { Blocker } from "@/components/fields/blocker";
import { CheckboxField } from "@/components/fields/checkbox";
import { CheckboxGroup } from "@/components/fields/checkbox-group";
import { ClearField } from "@/components/fields/clear-field";
import { ColorPickerField } from "@/components/fields/color-picker";
import { CurrencyInputField } from "@/components/fields/currency-input";
import { DatePickerField } from "@/components/fields/date-picker";
import { InputField } from "@/components/fields/input";
import { LabelField } from "@/components/fields/label";
import { PopoverField } from "@/components/fields/popover";
import { RadioGroup } from "@/components/fields/radio-group";
import { ShowIf } from "@/components/fields/show-if";
import { SubmitButton } from "@/components/fields/submit";
import { SwitchField } from "@/components/fields/switch";
import { TextareaField } from "@/components/fields/textarea";
import { TimePickerField } from "@/components/fields/time-picker";
import { UnsavedChangesIndicator } from "@/components/fields/unsaved-changes";
import { ValidationError } from "@/components/fields/validation-error";
import { fieldContext, formContext } from "@/hooks/use-form-context";

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    CheckboxGroup,
    Checkbox: CheckboxField,
    Clear: ClearField,
    ColorPicker: ColorPickerField,
    CurrencyInput: CurrencyInputField,
    DatePicker: DatePickerField,
    Input: InputField,
    Label: LabelField,
    Popover: PopoverField,
    RadioGroup,
    Switch: SwitchField,
    Textarea: TextareaField,
    TimePicker: TimePickerField,
    ValidationError,
  },
  formComponents: {
    Blocker,
    ShowIf,
    SubmitButton,
    UnsavedChangesIndicator,
  },
  fieldContext,
  formContext,
});
