import moment from "moment";

const en = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const ru = new Map([["other", "-й"]]);
const languagesSuffixes = new Map([
  ["ru-RU", ru],
  ["en-US", en],
]);

export function Formatter() {
  const asDateTime = function (value: number): string {
    return moment.unix(value).format("DD/MM/YYYY hh:mm");
  };
  const isTimeExpire = function (to:number): string {
    var now = moment(new Date()); //todays date
    return moment(now).isAfter(moment.unix(to));
  };
  const diffDateTime = function (value: number): string {
    var now = moment(new Date()); //todays date
    var end = moment.unix(value); // another date
    var duration = moment.duration(end.diff(now));
    var hours = parseInt(duration.asHours());
    var minutes = parseInt(duration.asMinutes()) % 60;
    var secundes = parseInt(duration.asMinutes()) % 60;
    return hours+':'+minutes;
  };
  const asDate = function (value: number): string {
    return moment.unix(value).format("DD/MM/YYYY");
  };
  const asNumerals = function (value: number | string, locale: string): string {
    if (typeof value === "string") {
      value = parseInt(value);
    }
    const pr = new Intl.PluralRules(locale, { type: "ordinal" });
    const suffixes = languagesSuffixes.get(locale);
    const rule = pr.select(value);
    const suffix = suffixes?.get(rule);
    return `${value}${suffix}`;
  }
  const asFloat = function (value: number | string): string {
    if (typeof value === "string") {
      value = parseFloat(value);
    }
    return `${value}`;
  }
  const asAmount = function (value: number | string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  const asUsdt = function (value: number | string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  const asToken = function (value: number, decimal=2): string {
    return parseFloat(value).toFixed(decimal);
  }
  return {
    asDateTime,
    isTimeExpire,
    diffDateTime,
    asDate,
    asNumerals,
    asFloat,
    asAmount,
    asToken
  }
}
