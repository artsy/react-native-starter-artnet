/**
 * @generated SignedSource<<6de221d635de4ddceae111e69cd72018>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkRail_listing$data = {
  readonly artMarketInstitution: {
    readonly name: string;
  } | null | undefined;
  readonly featuredImage: {
    readonly baseImageUrl: string;
  } | null | undefined;
  readonly id: string;
  readonly listingData: {
    readonly artworks: ReadonlyArray<{
      readonly creationYearFrom: number | null | undefined;
      readonly creationYearTo: number | null | undefined;
      readonly creator: {
        readonly name: string;
      } | null | undefined;
      readonly mediumRaw: string | null | undefined;
    }>;
    readonly title: string | null | undefined;
  };
  readonly saleName: string | null | undefined;
  readonly " $fragmentType": "ArtworkRail_listing";
};
export type ArtworkRail_listing$key = {
  readonly " $data"?: ArtworkRail_listing$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkRail_listing",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "featuredImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "baseImageUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ListingData",
      "kind": "LinkedField",
      "name": "listingData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ListingDataArtworkSummary",
          "kind": "LinkedField",
          "name": "artworks",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CreatorSummary",
              "kind": "LinkedField",
              "name": "creator",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mediumRaw",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "creationYearFrom",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "creationYearTo",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtMarketInstitution",
      "kind": "LinkedField",
      "name": "artMarketInstitution",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "ArtListingSummary",
  "abstractKey": null
};
})();

(node as any).hash = "9db081412ce310b3a61009f01737b23f";

export default node;
