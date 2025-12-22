import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    // International Languages
    { code: "en", name: t("common.english"), flag: "🇺🇸" },
    { code: "es", name: t("common.spanish"), flag: "🇪🇸" },
    { code: "fr", name: t("common.french"), flag: "🇫🇷" },
    { code: "ja", name: t("common.japanese"), flag: "🇯🇵" },
    // Indian Languages
    { code: "hi", name: t("common.hindi"), flag: "🇮🇳" },
    { code: "bn", name: t("common.bengali"), flag: "🇮🇳" },
    { code: "ta", name: t("common.tamil"), flag: "🇮🇳" },
    { code: "te", name: t("common.telugu"), flag: "🇮🇳" },
    { code: "mr", name: t("common.marathi"), flag: "🇮🇳" },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-primary" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
