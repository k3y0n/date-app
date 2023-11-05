import Bookmark from "./Bookmark";
import Qualities from "./Qualities";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggle,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        <Qualities qualities={...qualities} />
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td><Bookmark bookmark={bookmark} onClick ={()=>onToggle(_id)}/></td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
