/**
 * @generated SignedSource<<bb7204a0f7df4a30cfaf3f6e3b97167e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeQuery$variables = Record<PropertyKey, never>;
export type HomeQuery$data = {
  readonly currentUser: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeUser_currentUser">;
  } | null | undefined;
};
export type HomeQuery = {
  response: HomeQuery$data;
  variables: HomeQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeQuery",
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
    "name": "HomeQuery",
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
    "cacheID": "d0f776c5be00d5bbeb8c497799d21ece",
    "id": null,
    "metadata": {},
    "name": "HomeQuery",
    "operationKind": "query",
    "text": "query HomeQuery {\n  currentUser {\n    ...HomeUser_currentUser\n    id\n  }\n}\n\nfragment HomeUser_currentUser on User {\n  id\n  displayName\n  email\n}\n"
  }
};

(node as any).hash = "917d6eb43f4bc75c6e19c6f1c8296f3f";

export default node;
