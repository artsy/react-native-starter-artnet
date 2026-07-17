import { getDataID } from "relay/getDataID"

describe("getDataID", () => {
  it("namespaces record ids by type so different types with the same id don't collide", () => {
    // The Artnet gateway returns the same id for a summary and its listing data.
    expect(getDataID({ id: "PT833959" }, "ArtListingSummary")).toBe(
      "ArtListingSummary:PT833959"
    )
    expect(getDataID({ id: "PT833959" }, "ListingData")).toBe(
      "ListingData:PT833959"
    )
  })

  it("returns undefined when there is no id (Relay generates a client id)", () => {
    expect(getDataID({}, "SomeType")).toBeUndefined()
    expect(getDataID({ id: null }, "SomeType")).toBeUndefined()
  })
})
