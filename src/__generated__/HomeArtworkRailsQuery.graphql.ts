/**
 * @generated SignedSource<<d7d342d4cf1fd57ab96088724fcb3872>>
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
      "filters": {
        "listingDomain": {
          "keys": [
            "PdbTeaser",
            "Gallery",
            "ArtnetAuction"
          ]
        }
      },
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
            "ArtnetAuction"
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
            "Gallery"
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
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v4/*: any*/)
],
v6 = [
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
                "selections": (v5/*: any*/),
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
        "selections": (v5/*: any*/),
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
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"PdbTeaser\",\"Gallery\",\"ArtnetAuction\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "auctions",
        "args": (v2/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"ArtnetAuction\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "galleries",
        "args": (v3/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"Gallery\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
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
        "selections": (v6/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"PdbTeaser\",\"Gallery\",\"ArtnetAuction\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "auctions",
        "args": (v2/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"ArtnetAuction\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      },
      {
        "alias": "galleries",
        "args": (v3/*: any*/),
        "concreteType": "SearchResults",
        "kind": "LinkedField",
        "name": "getPublicArtworkListings",
        "plural": false,
        "selections": (v6/*: any*/),
        "storageKey": "getPublicArtworkListings(input:{\"filters\":{\"listingDomain\":{\"keys\":[\"Gallery\"]}},\"page\":1,\"pageSize\":10,\"subscriptionId\":\"\"})"
      }
    ]
  },
  "params": {
    "cacheID": "81390b995abb2e78e3363307c43fb1c3",
    "id": null,
    "metadata": {},
    "name": "HomeArtworkRailsQuery",
    "operationKind": "query",
    "text": "query HomeArtworkRailsQuery {\n  marketplace: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10, filters: {listingDomain: {keys: [\"PdbTeaser\", \"Gallery\", \"ArtnetAuction\"]}}}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n  auctions: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10, filters: {listingDomain: {keys: [\"ArtnetAuction\"]}}}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n  galleries: getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 10, filters: {listingDomain: {keys: [\"Gallery\"]}}}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n}\n\nfragment ArtworkRail_listing on ArtListingSummary {\n  id\n  saleName\n  featuredImage {\n    baseImageUrl\n  }\n  listingData {\n    title\n    artworks {\n      creator {\n        name\n        id\n      }\n      mediumRaw\n      creationYearFrom\n      creationYearTo\n    }\n    id\n  }\n  artMarketInstitution {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a9e26a1729cad5712554040816449126";

export default node;
