/**
 * @generated SignedSource<<eeede925c7a3ca0afbd19bb9f15b62a5>>
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
  readonly getCurrentUser: {
    readonly user: {
      readonly " $fragmentSpreads": FragmentRefs<"HomeUser_currentUser">;
    } | null | undefined;
  };
};
export type HomeUserTestQuery = {
  response: HomeUserTestQuery$data;
  variables: HomeUserTestQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeUserTestQuery",
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
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "HomeUser_currentUser"
              }
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
    "name": "HomeUserTestQuery",
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
    "cacheID": "02a1de19f365fb65a4e745db92705663",
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
    "name": "HomeUserTestQuery",
    "operationKind": "query",
    "text": "query HomeUserTestQuery {\n  getCurrentUser {\n    user {\n      ...HomeUser_currentUser\n      id\n    }\n  }\n}\n\nfragment HomeUser_currentUser on User {\n  id\n  displayName\n}\n"
  }
};

(node as any).hash = "69252559d4126ea44493e63caaf966cf";

export default node;
