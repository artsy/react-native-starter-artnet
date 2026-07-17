/**
 * @generated SignedSource<<2237715ffd8e8c08c0ce719487ec1edf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type NewsFeedQuery$variables = Record<PropertyKey, never>;
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "input",
        "value": {
          "page": 1,
          "pageSize": 30
        }
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
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NewsImage",
            "kind": "LinkedField",
            "name": "featuredImage",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "getNewsArticles(input:{\"page\":1,\"pageSize\":30})"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewsFeedQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NewsFeedQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8e34af8c8e9cc8e774b620d58eaab32d",
    "id": null,
    "metadata": {},
    "name": "NewsFeedQuery",
    "operationKind": "query",
    "text": "query NewsFeedQuery {\n  getNewsArticles(input: {page: 1, pageSize: 30}) {\n    results {\n      id\n      title\n      author\n      categoryName\n      url\n      featuredImage {\n        url\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "af6c90a23cd93c5aaf390386e377312e";

export default node;
