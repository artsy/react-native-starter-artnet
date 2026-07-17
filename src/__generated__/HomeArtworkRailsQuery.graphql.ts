/**
 * @generated SignedSource<<d3e819060a0760650d80479521727448>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListingDomain = "ARTNET_AUCTION" | "GALLERY" | "PDB" | "PDB_TEASER" | "UNSPECIFIED" | "%future added value";
export type HomeArtworkRailsQuery$variables = Record<PropertyKey, never>;
export type HomeArtworkRailsQuery$data = {
  readonly getPublicArtworkListings: {
    readonly results: ReadonlyArray<{
      readonly listingDomain: ListingDomain;
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
    }>;
  };
};
export type HomeArtworkRailsQuery = {
  response: HomeArtworkRailsQuery$data;
  variables: HomeArtworkRailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {
      "page": 1,
      "pageSize": 40,
      "subscriptionId": ""
    }
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "listingDomain",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeArtworkRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtListingSummary",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ArtworkRail_listing"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":40,\"subscriptionId\":\"\"})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeArtworkRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtListingSummary",
            "kind": "LinkedField",
            "name": "results",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
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
                  (v2/*: any*/)
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
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":40,\"subscriptionId\":\"\"})"
      }
    ]
  },
  "params": {
    "cacheID": "c5ed80ea9e26ffdeda68fae49841cf46",
    "id": null,
    "metadata": {},
    "name": "HomeArtworkRailsQuery",
    "operationKind": "query",
    "text": "query HomeArtworkRailsQuery {\n  getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 40}) {\n    results {\n      listingDomain\n      ...ArtworkRail_listing\n      id\n    }\n  }\n}\n\nfragment ArtworkRail_listing on ArtListingSummary {\n  id\n  featuredImage {\n    baseImageUrl\n  }\n  listingData {\n    title\n    id\n  }\n  artMarketInstitution {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb703681cc5b639928a43d5d179b55aa";

export default node;
