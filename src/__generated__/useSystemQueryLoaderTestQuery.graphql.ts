/**
 * @generated SignedSource<<9ef409aa782c85eb078fd54a0f0ee4bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useSystemQueryLoaderTestQuery$variables = Record<PropertyKey, never>;
export type useSystemQueryLoaderTestQuery$data = {
  readonly currentUser: {
    readonly displayName: string;
  } | null | undefined;
};
export type useSystemQueryLoaderTestQuery = {
  response: useSystemQueryLoaderTestQuery$data;
  variables: useSystemQueryLoaderTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSystemQueryLoaderTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useSystemQueryLoaderTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "92afcb21490d78cc5d78bcff7c69b8a9",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "currentUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "currentUser.displayName": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "currentUser.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "useSystemQueryLoaderTestQuery",
    "operationKind": "query",
    "text": "query useSystemQueryLoaderTestQuery {\n  currentUser {\n    displayName\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f44923f0d6dd6f0fdc24a6c922494c3b";

export default node;
