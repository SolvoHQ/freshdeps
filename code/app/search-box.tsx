"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const [eco, setEco] = useState("npm");
  const [pkg, setPkg] = useState("");

  function go(e: React.FormEvent) {
    e.preventDefault();
    const name = pkg.trim();
    if (!name) return;
    router.push(`/${eco}/${encodeURIComponent(name)}`);
  }

  return (
    <form className="searchform" onSubmit={go}>
      <select
        aria-label="ecosystem"
        value={eco}
        onChange={(e) => setEco(e.target.value)}
      >
        <option value="npm">npm</option>
        <option value="pypi">PyPI</option>
      </select>
      <input
        aria-label="package name"
        placeholder="package name  e.g. request, moment, urllib3"
        value={pkg}
        onChange={(e) => setPkg(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      <button type="submit">check →</button>
    </form>
  );
}
