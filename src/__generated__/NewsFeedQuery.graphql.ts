/**
 * @generated SignedSource<<e5ef3bee00751e96c1c72ee06bb3b35b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NewsFeedQuery$variables = {
  creatorKeys: ReadonlyArray<string>;
};
export type NewsFeedQuery$data = {
  readonly getNewsArticles: {
    readonly results: ReadonlyArray<{
      readonly author: string;
      readonly categoryName: string;
      readonly featuredImage: ReadonlyArray<{
        readonly url: any;
      } | null | undefined>;
      readonly id: string;
      readonly title: string;
      readonly url: any;
    }>;
  };
};
export type NewsFeedQuery = {
  response: NewsFeedQuery$data;
  variables: NewsFeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "creatorKeys"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "kind": "Variable",
                    "name": "keys",
                    "variableName": "creatorKeys"
                  }
                ],
                "kind": "ObjectValue",
                "name": "creator"
              }
            ],
            "kind": "ObjectValue",
            "name": "filters"
          },
          {
            "kind": "Literal",
            "name": "page",
            "value": 1
          },
          {
            "kind": "Literal",
            "name": "pageSize",
            "value": 30
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "GetNewsArticlesResponse",
    "kind": "LinkedField",
    "name": "getNewsArticles",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NewsArticle",
        "kind": "LinkedField",
        "name": "results",
        "plural": true,
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "author",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "categoryName",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NewsImage",
            "kind": "LinkedField",
            "name": "featuredImage",
            "plural": true,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NewsFeedQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NewsFeedQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "fb8799d9d1f9f5d854d6e3b73b2d0dfc",
    "id": null,
    "metadata": {},
    "name": "NewsFeedQuery",
    "operationKind": "query",
    "text": "query NewsFeedQuery(\n  $creatorKeys: [String!]!\n) {\n  getNewsArticles(input: {filters: {creator: {keys: $creatorKeys}}, page: 1, pageSize: 30}) {\n    results {\n      id\n      title\n      author\n      categoryName\n      url\n      featuredImage {\n        url\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e03539205b0219d88a6df8f49955aea0";

export default node;
