export default function Checkbox({ row, onChange, value }) {

    return (
      <td key={row.id + "Checkbox"}>
        <input
          type="checkbox"
          id={row.id}
          checked={value}
          onChange={onChange}
        ></input>
      </td>
    );
  }
  