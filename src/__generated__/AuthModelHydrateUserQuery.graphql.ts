/**
 * @generated SignedSource<<45b325aba81f9c87585d1ed57649c56f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthModelHydrateUserQuery$variables = Record<PropertyKey, never>;
export type AuthModelHydrateUserQuery$data = {
  readonly currentUser: {
    readonly email: string;
    readonly id: string;
  } | null | undefined;
};
export type AuthModelHydrateUserQuery = {
  response: AuthModelHydrateUserQuery$data;
  variables: AuthModelHydrateUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
        "name": "email",
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
    "name": "AuthModelHydrateUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuthModelHydrateUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6a8edd0f3c86c3de9a327766790511b4",
    "id": null,
    "metadata": {},
    "name": "AuthModelHydrateUserQuery",
    "operationKind": "query",
    "text": "query AuthModelHydrateUserQuery {\n  currentUser {\n    id\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "26a544ebaae8a8605b04b7ce62196e45";

export default node;
