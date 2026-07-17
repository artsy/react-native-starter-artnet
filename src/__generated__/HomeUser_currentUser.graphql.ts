/**
 * @generated SignedSource<<d152773b16f91484f7486599894ff523>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeUser_currentUser$data = {
  readonly displayName: string;
  readonly email: string;
  readonly id: string;
  readonly " $fragmentType": "HomeUser_currentUser";
};
export type HomeUser_currentUser$key = {
  readonly " $data"?: HomeUser_currentUser$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeUser_currentUser">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeUser_currentUser",
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
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1990910c08488573a0181db5afc04916";

export default node;
