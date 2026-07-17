/**
 * @generated SignedSource<<1dee952f7728d6145e938cd5564dccca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useSystemQueryLoaderTestQuery$variables = Record<PropertyKey, never>;
export type useSystemQueryLoaderTestQuery$data = {
  readonly getCurrentUser: {
    readonly user: {
      readonly displayName: string;
    } | null | undefined;
  };
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
        "concreteType": "CurrentUserResult",
        "kind": "LinkedField",
        "name": "getCurrentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          }
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
        "concreteType": "CurrentUserResult",
        "kind": "LinkedField",
        "name": "getCurrentUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ed724087ba58e6943134e93985fd5929",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "getCurrentUser": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CurrentUserResult"
        },
        "getCurrentUser.user": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "getCurrentUser.user.displayName": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "getCurrentUser.user.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "useSystemQueryLoaderTestQuery",
    "operationKind": "query",
    "text": "query useSystemQueryLoaderTestQuery {\n  getCurrentUser {\n    user {\n      displayName\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "17a6afd0b3bd3d7040bc10e3bbdabb0e";

export default node;
