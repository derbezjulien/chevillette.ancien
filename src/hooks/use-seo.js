import { useEffect } from "react";

function setMeta(doc, attr, key, content) {
  let el = doc.head.querySelector("meta[" + attr + '="' + key + '"]');
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = doc.createElement("meta");
    el.setAttribute(attr, key);
    doc.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function applySeo(doc, { title, description = "" }) {
  doc.title = title;
  setMeta(doc, "name", "description", description);
  setMeta(doc, "name", "robots", "noindex, nofollow");
}

export default function useSeo({ title, description }) {
  useEffect(() => {
    applySeo(document, { title, description });
  }, [title, description]);
}