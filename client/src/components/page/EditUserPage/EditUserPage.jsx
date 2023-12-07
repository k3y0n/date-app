import EditForm from "../../ui/EditForm/EditForm";
import BackButton from "../../common/BackButton/BackButton";

const EditUserPage = () => {
  return (
    <>
      <div className="container mt-5">
        <BackButton />
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <EditForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserPage;
