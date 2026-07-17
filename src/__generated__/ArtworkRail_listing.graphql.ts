/**
 * @generated SignedSource<<54ae0ecb5c883edea7a95e1827d0bac9>>
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
    readonly title: string | null | undefined;
  };
  readonly " $fragmentType": "ArtworkRail_listing";
};
export type ArtworkRail_listing$key = {
  readonly " $data"?: ArtworkRail_listing$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
};

const node: ReaderFragment = {
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
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtListingSummary",
  "abstractKey": null
};

(node as any).hash = "f27142ac0fcea3f0154768164e5c33c3";

export default node;
