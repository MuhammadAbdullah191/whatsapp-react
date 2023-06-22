import ShowContacts from "../contacts/ShowContacts";
import ProfileHeader from "../profileHeader/ProfileHeader";
import SearchContact from "../searchContact/SearchContact";

function Profile() {
  return (
    <div className="border-end vh-100">
      <ProfileHeader />
      <SearchContact />
      <ShowContacts />
    </div>
  );
}

export default Profile;
