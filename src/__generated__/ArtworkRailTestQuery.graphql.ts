/**
 * @generated SignedSource<<26a2841881d070a5ed2a3e60e21ce7c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkRailTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkRailTestQuery$data = {
  readonly getPublicArtworkListings: {
    readonly results: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkRail_listing">;
    }>;
  };
};
export type ArtworkRailTestQuery = {
  response: ArtworkRailTestQuery$data;
  variables: ArtworkRailTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {
      "page": 1,
      "pageSize": 1,
      "subscriptionId": ""
    }
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v1/*: any*/)
],
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkRailTestQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ArtworkRail_listing"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":1,\"subscriptionId\":\"\"})"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkRailTestQuery",
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
                        "selections": (v2/*: any*/),
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
                  (v1/*: any*/)
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
                "selections": (v2/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":1,\"subscriptionId\":\"\"})"
      }
    ]
  },
  "params": {
    "cacheID": "3d36eff61dec3300550de7ef916ad96b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "getPublicArtworkListings": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "SearchResults"
        },
        "getPublicArtworkListings.results": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtListingSummary"
        },
        "getPublicArtworkListings.results.artMarketInstitution": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtMarketInstitution"
        },
        "getPublicArtworkListings.results.artMarketInstitution.id": (v3/*: any*/),
        "getPublicArtworkListings.results.artMarketInstitution.name": (v4/*: any*/),
        "getPublicArtworkListings.results.featuredImage": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "getPublicArtworkListings.results.featuredImage.baseImageUrl": (v4/*: any*/),
        "getPublicArtworkListings.results.id": (v3/*: any*/),
        "getPublicArtworkListings.results.listingData": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ListingData"
        },
        "getPublicArtworkListings.results.listingData.artworks": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ListingDataArtworkSummary"
        },
        "getPublicArtworkListings.results.listingData.artworks.creationYearFrom": (v5/*: any*/),
        "getPublicArtworkListings.results.listingData.artworks.creationYearTo": (v5/*: any*/),
        "getPublicArtworkListings.results.listingData.artworks.creator": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreatorSummary"
        },
        "getPublicArtworkListings.results.listingData.artworks.creator.id": (v3/*: any*/),
        "getPublicArtworkListings.results.listingData.artworks.creator.name": (v4/*: any*/),
        "getPublicArtworkListings.results.listingData.artworks.mediumRaw": (v6/*: any*/),
        "getPublicArtworkListings.results.listingData.id": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "getPublicArtworkListings.results.listingData.title": (v6/*: any*/),
        "getPublicArtworkListings.results.saleName": (v6/*: any*/)
      }
    },
    "name": "ArtworkRailTestQuery",
    "operationKind": "query",
    "text": "query ArtworkRailTestQuery {\n  getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 1}) {\n    results {\n      ...ArtworkRail_listing\n      id\n    }\n  }\n}\n\nfragment ArtworkRail_listing on ArtListingSummary {\n  id\n  saleName\n  featuredImage {\n    baseImageUrl\n  }\n  listingData {\n    title\n    artworks {\n      creator {\n        name\n        id\n      }\n      mediumRaw\n      creationYearFrom\n      creationYearTo\n    }\n    id\n  }\n  artMarketInstitution {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "15fbad306b870724de8e9b6549b3876b";

export default node;
