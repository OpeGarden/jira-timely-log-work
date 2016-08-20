

import {CollectionStore} from "../CollectionStore";
import {IssueStore} from "./IssueStore";

export class IssuesCollectionStore extends CollectionStore<IssueStore> {

}

export const issuesCollectionStore = new IssuesCollectionStore(() => new IssueStore());