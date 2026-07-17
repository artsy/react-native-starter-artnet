/**
 * @generated SignedSource<<2d0a013f1d0ab5427346d86b1387dbfe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeUserTestQuery$variables = Record<PropertyKey, never>;
export type HomeUserTestQuery$data = {
  readonly currentUser: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeUser_currentUser">;
  } | null | undefined;
};
export type HomeUserTestQuery = {
  response: HomeUserTestQuery$data;
  variables: HomeUserTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeUserTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeUser_currentUser"
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
    "name": "HomeUserTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "currentUser",
        "plural": false,
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
            "name": "displayName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fe44d073b9f5b3a777ab9633320a8144",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "currentUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "User"
        },
        "currentUser.displayName": (v0/*: any*/),
        "currentUser.email": (v0/*: any*/),
        "currentUser.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "HomeUserTestQuery",
    "operationKind": "query",
    "text": "query HomeUserTestQuery {\n  currentUser {\n    ...HomeUser_currentUser\n    id\n  }\n}\n\nfragment HomeUser_currentUser on User {\n  id\n  displayName\n  email\n}\n"
  }
};
})();

(node as any).hash = "eaad3c68eaa33a5218d8951cd146a5e8";

export default node;
