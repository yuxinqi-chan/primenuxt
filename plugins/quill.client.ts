import Quill from "quill";
// @ts-ignore
import BlotFormatter2, { Action } from "@enzedonline/quill-blot-formatter2";

export default defineNuxtPlugin((nuxtApp) => {
  Quill.register("modules/blotFormatter2", BlotFormatter2);
  (Quill.import("formats/image") as any).sanitize = (url: string) => {
    return sanitize(url, ["http", "https", "data", "blob"]) ? url : "//:0";
  };

  function sanitize(url: string, protocols: string[]) {
    var anchor = document.createElement("a");
    anchor.href = url;

    var protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
    return protocols.indexOf(protocol) > -1;
  }
});
