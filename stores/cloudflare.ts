import { defineStore } from "pinia";

export const useCloudflareStore = defineStore({
  id: "cloudflareStore",
  state: () => {
    const event = useRequestEvent();
    const ip = event?.headers.get("CF-Connecting-IP");
    const cf = event?.context.cf;
    return {
      ip: ip,
      asn: cf?.asn,
      asOrganization: cf?.asOrganization,
      timezone: cf?.timezone,
      city: cf?.city,
      country: cf?.country,
      region: cf?.region,
      latitude: cf?.latitude,
      longitude: cf?.longitude,
      postalCode: cf?.postalCode,
      isEUCountry: cf?.isEUCountry,
      continent: cf?.continent,
      colo: cf?.colo,
      httpProtocol: cf?.httpProtocol,
      tlsVersion: cf?.tlsVersion,
    };
  },
  actions: {},
});
