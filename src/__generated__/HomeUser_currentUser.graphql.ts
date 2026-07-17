/**
 * @generated SignedSource<<c75ed0ba162ed2c1d5b39892032b88ed>>
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "16d367b37c4ffacf7ed0a5c535ff97e6";

export default node;
