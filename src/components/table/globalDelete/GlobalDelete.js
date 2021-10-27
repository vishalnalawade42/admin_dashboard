import { useContext } from "react";

import ACTION_TYPES from "../../../reducer/actions.js";
import {
  UpdateTableRowsContext,
  CheckedUserContext,
  TablePropertiesContext,
} from "../context/TableContextCreator";
import "../index.css";
export default function GlobalDelete() {
  const dispatch = useContext(UpdateTableRowsContext);
  const { checkedUser } = useContext(CheckedUserContext);
  const [checkedRowIds, setCheckedRowIds] = checkedUser;

  const { tableRowsUniqueIdentifier } = useContext(TablePropertiesContext);

  function handleMultiDelete() {
    dispatch({
      type: ACTION_TYPES.MULTI_DELETE,
      payload: checkedRowIds,
      uniqueIdentifier: tableRowsUniqueIdentifier,
    });
    setCheckedRowIds([]);
  }
  return (
    <div className="global-delete">
      <button
        type="button"
        className="btn btn-primary btn-sm  btn-space btn-delete"
        onClick={() => handleMultiDelete()}
      >
        Delete Selected
      </button>
    </div>
  );
}
