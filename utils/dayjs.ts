import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import en from "dayjs/locale/en";
import zhCn from "dayjs/locale/zh-cn";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
const locales = {
  en: en,
  "zh-cn": zhCn,
};
export const dayjsLocale = (
  date?: dayjs.ConfigType,
  locale?: keyof typeof locales,
  timezone?: string,
) => {
  let d = dayjs(date);
  if (locale && locales[locale]) {
    d = d.locale(locales[locale]);
  } else {
    d = d.locale(locales.en);
  }
  if (timezone) {
    d = d.tz(timezone);
  }
  return d;
};
export default dayjs;
