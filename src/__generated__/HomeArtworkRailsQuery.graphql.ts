/**
 * @generated SignedSource<<8ef424e06902b312dc9b09c349e5567e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeArtworkRailsQuery$variables = Record<PropertyKey, never>;
export type HomeArtworkRailsQuery$data = {
  readonly auctions: {
    readonly results: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
    }>;
  };
  readonly galleries: {
    readonly results: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
    }>;
  };
  readonly marketplace: {
    readonly results: ReadonlyArray<{
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
      "pageSize": 10,
      "subscriptionId": ""
    }
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ArtListingSummary",
    "kind": "LinkedField",
    "name": "results",
    "plural": true,
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ArtworkRail_listing"
      }
    ],
    "storageKey": null
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {
      "filters": {
        "listingDomain": {
          "keys": [
            "ARTNET_AUCTION"
          ]
        }
      },
      "page": 1,
      "pageSize": 10,
      "subscriptionId": ""
    }
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {
      "filters": {
        "listingDomain": {
          "keys": [
            "GALLERY"
          ]
        }
      },
      "page": 1,
      "pageSize": 10,
      "subscriptionId": ""
    }
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ArtListingSummary",
    "kind": "LinkedField",
    "name": "results",
    "plural": true,
    "selections": [
      (v4/*: any*/),
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
          (v4/*: any*/)
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
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeArtworkRailsQuery",
    "selections": [
      {
        "alias": "marketplace",
        "args": (v0/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "auctions",
        "args": (v2/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"ARTNET_AUCTION\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "galleries",
        "args": (v3/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"GALLERY\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
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
        "alias": "marketplace",
        "args": (v0/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "auctions",
        "args": (v2/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"ARTNET_AUCTION\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "galleries",
        "args": (v3/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"GALLERY\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      }
    ]
  },
  "params": {
    "cacheID": "9b6b506dd999eb014ccd5f375bd66afa",
    "id": null,
    "metadata": {},
    "name": "HomeArtworkRailsQuery",
    "operationKind": "query",
    "text": "query HomeArtworkRailsQuery {\n  marketplace: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n  auctions: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10, filters: {listingDomain: {keys: [\"ARTNET_AUCTION\"]}}}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n  galleries: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10, filters: {listingDomain: {keys: [\"GALLERY\"]}}}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n}\n\nfragment ArtworkRail_listing on ArtListingSummary {\n  id\n  featuredImage {\n    baseImageUrl\n  }\n  listingData {\n    title\n    id\n  }\n  artMarketInstitution {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "0281d96d628b200deb2a65d1c8bb1bdd";

export default node;
