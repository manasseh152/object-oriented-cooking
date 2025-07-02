import { useTranslation } from "react-i18next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/config/language";
import { setLanguage } from "@/lib/i18n";

export function LanguageSelector() {
  const { t, i18n } = useTranslation("language-selector");

  return (
    <Select
      defaultValue={i18n.language}
      onValueChange={setLanguage}
    >
      <SelectTrigger className="w-[180px]" title={t("languageSelectorTitle")} aria-label={t("languageSelectorAriaLabel")} aria-description={t("languageSelectorAriaDescription")}>
        <SelectValue placeholder={t("selectPlaceholder")} />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map(language => (
          <SelectItem
            key={language.code}
            value={language.code}
            className="flex items-center gap-2"
          >
            <language.icon />
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
