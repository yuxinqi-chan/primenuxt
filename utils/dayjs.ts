import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import advancedFormat from "dayjs/plugin/advancedFormat";

import en from "dayjs/locale/en";
import zhCn from "dayjs/locale/zh-cn";
import zh from "dayjs/locale/zh";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);
const locales = {
  en: en,
  "zh-cn": zhCn,
  zh: zh,
};
export const dayjsLocale = (
  date?: dayjs.ConfigType,
  locale?: string,
  timezone?: string,
) => {
  let d = dayjs(date);
  if (locale && locales[locale as keyof typeof locales]) {
    d = d.locale(locales[locale as keyof typeof locales]);
  } else {
    d = d.locale(locales.en);
  }
  if (timezone) {
    d = d.tz(timezone);
  }
  return d;
};
export default dayjs;
