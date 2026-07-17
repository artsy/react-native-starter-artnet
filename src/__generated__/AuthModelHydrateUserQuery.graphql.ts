/**
 * @generated SignedSource<<724560db52be909e4c928f553f24eb8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthModelHydrateUserQuery$variables = Record<PropertyKey, never>;
export type AuthModelHydrateUserQuery$data = {
  readonly getCurrentUser: {
    readonly user: {
      readonly email: string;
      readonly id: string;
    } | null | undefined;
  };
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
            "name": "email",
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
    "cacheID": "59d65034ccf5a70c66aa31b4319693f4",
    "id": null,
    "metadata": {},
    "name": "AuthModelHydrateUserQuery",
    "operationKind": "query",
    "text": "query AuthModelHydrateUserQuery {\n  getCurrentUser {\n    user {\n      id\n      email\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fe78c9d6436820b674984e078eea9659";

export default node;
