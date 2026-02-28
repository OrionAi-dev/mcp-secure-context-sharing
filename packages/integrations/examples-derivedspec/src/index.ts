import type { DerivedSpec } from "@astrospec/runtime";

export const astrospecDerivedSpec: DerivedSpec = {
  // which base spec we are deriving from
  baseId: "astrospec",

  // JSON-Patch operations (as before)
  patches: [
    { op: "add", path: "/fields/astrospec", value: { type: "string", required: false } }
  ],

  // keep runtime validators happy (they expect provenance to exist for DerivedSpec)
  provenance: []
};

export default astrospecDerivedSpec;
