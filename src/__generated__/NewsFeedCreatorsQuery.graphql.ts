/**
 * @generated SignedSource<<006124d803207eadb3090d7914a523ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NewsFeedCreatorsQuery$variables = Record<PropertyKey, never>;
export type NewsFeedCreatorsQuery$data = {
  readonly getPublicArtworkListings: {
    readonly results: ReadonlyArray<{
      readonly listingData: {
        readonly artworks: ReadonlyArray<{
          readonly creator: {
            readonly id: string;
          } | null | undefined;
        }>;
      };
    }>;
  };
};
export type NewsFeedCreatorsQuery = {
  response: NewsFeedCreatorsQuery$data;
  variables: NewsFeedCreatorsQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v2 = {
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
      "selections": [
        (v1/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewsFeedCreatorsQuery",
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
                "alias": null,
                "args": null,
                "concreteType": "ListingData",
                "kind": "LinkedField",
                "name": "listingData",
                "plural": false,
                "selections": [
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
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NewsFeedCreatorsQuery",
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
                "alias": null,
                "args": null,
                "concreteType": "ListingData",
                "kind": "LinkedField",
                "name": "listingData",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "getPublicArtworkListings(input:{\"page\":1,\"pageSize\":40,\"subscriptionId\":\"\"})"
      }
    ]
  },
  "params": {
    "cacheID": "6873e15e679b52a5522c78ef097db579",
    "id": null,
    "metadata": {},
    "name": "NewsFeedCreatorsQuery",
    "operationKind": "query",
    "text": "query NewsFeedCreatorsQuery {\n  getPublicArtworkListings(input: {subscriptionId: \"\", page: 1, pageSize: 40}) {\n    results {\n      listingData {\n        artworks {\n          creator {\n            id\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "400c095490871f4e586547442e1f22a2";

export default node;
